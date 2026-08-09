'use client';

import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { DESK_BOUNDS, DESK_Y, GRIP_LIFT, type VRObject } from './vrObjects';

/**
 * Restoring the default raycast has to pass a real function: R3F's applyProps
 * skips `undefined`, so handing it back would leave the mesh permanently
 * unpickable after the first drag.
 */
const NO_RAYCAST = () => null;
const MESH_RAYCAST = THREE.Mesh.prototype.raycast;

export type InteractionHandlers = {
    onHover: (id: string | null) => void;
    onGrab: (id: string) => void;
    onRelease: () => void;
    onMove: (id: string, pos: [number, number, number]) => void;
};

type ObjProps = {
    obj: VRObject;
    selected: boolean;
    gripped: boolean;
    /** True while anything is held. Objects stop raycasting so the drag plane
     *  gets the moves — otherwise the held object intercepts its own drag. */
    dragging: boolean;
    /** The PIP feed mirrors the bench but must not steal pointer events. */
    interactive: boolean;
    latencyMs: number;
    handlers: InteractionHandlers;
};

function Selectable({ obj, selected, gripped, dragging, interactive, latencyMs, handlers }: ObjProps) {
    const group = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Where the operator has asked the object to be, stamped with the moment
    // they asked. The machine reads this buffer `latencyMs` in the past — the
    // same trick the landing-page demo uses, here in three dimensions.
    const buffer = useRef<{ t: number; p: THREE.Vector3 }[]>([]);
    const target = useRef(new THREE.Vector3(...obj.pos));

    // Latest position we have seen from page state, stamped on the frame that
    // noticed it. Done in the frame loop rather than in render: reading a clock
    // and writing refs while rendering is not allowed.
    const last = useRef(obj.pos.join(','));

    useFrame((_, delta) => {
        const g = group.current;
        if (!g) return;

        const now = performance.now();

        const key = obj.pos.join(',');
        if (last.current !== key) {
            last.current = key;
            target.current.set(...obj.pos);
            buffer.current.push({ t: now, p: target.current.clone() });
        }

        const at = now - latencyMs;
        const b = buffer.current;
        while (b.length > 2 && b[1].t < at - 500) b.shift();

        let want = target.current;
        for (let i = b.length - 1; i >= 0; i--) {
            if (b[i].t <= at) { want = b[i].p; break; }
        }

        // Servos, not teleportation.
        g.position.x = THREE.MathUtils.damp(g.position.x, want.x, 14, delta);
        g.position.y = THREE.MathUtils.damp(g.position.y, want.y, 14, delta);
        g.position.z = THREE.MathUtils.damp(g.position.z, want.z, 14, delta);

        const lift = gripped ? 1 : 0;
        g.rotation.z = THREE.MathUtils.damp(g.rotation.z, lift * 0.12, 8, delta);
    });

    const active = hovered || selected || gripped;
    const ring = gripped ? '#f59e0b' : selected ? '#00e5ff' : '#a855f7';

    // Ring hugs the object's own footprint — a fixed radius swamps the small parts.
    const halfHeight = (obj.shape === 'box' ? obj.args[1] : obj.args[2]) / 2;
    const ringInner = obj.shape === 'box'
        ? Math.max(obj.args[0], obj.args[2]) * 0.85
        : Math.max(obj.args[0], obj.args[1]) * 1.35;

    const enter = (e: ThreeEvent<PointerEvent>) => {
        if (!interactive) return;
        e.stopPropagation();
        setHovered(true);
        handlers.onHover(obj.id);
        document.body.style.cursor = 'grab';
    };
    const leave = () => {
        if (!interactive) return;
        setHovered(false);
        handlers.onHover(null);
        document.body.style.cursor = '';
    };
    const down = (e: ThreeEvent<PointerEvent>) => {
        if (!interactive) return;
        e.stopPropagation();
        handlers.onGrab(obj.id);
        document.body.style.cursor = 'grabbing';
    };

    return (
        <group ref={group} position={obj.pos}>
            <mesh
                castShadow
                // While a drag is running only the plane should see pointer moves.
                raycast={dragging ? NO_RAYCAST : MESH_RAYCAST}
                onPointerOver={enter}
                onPointerOut={leave}
                onPointerDown={down}
            >
                {obj.shape === 'box'
                    ? <boxGeometry args={obj.args} />
                    : <cylinderGeometry args={[obj.args[0], obj.args[1], obj.args[2], 24]} />}
                <meshStandardMaterial
                    color={obj.color}
                    emissive={active ? ring : '#000000'}
                    emissiveIntensity={gripped ? 0.9 : hovered || selected ? 0.5 : 0}
                    roughness={0.4}
                    metalness={0.5}
                />
            </mesh>

            {/* Selection footprint on the bench */}
            {active && (
                <mesh position={[0, -halfHeight - 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[ringInner, ringInner * 1.22, 32]} />
                    <meshBasicMaterial color={ring} transparent opacity={gripped ? 0.9 : 0.55} side={THREE.DoubleSide} />
                </mesh>
            )}

            {/* Tether to the bench while held — you can see how far off the surface it is */}
            {gripped && (
                <mesh position={[0, -GRIP_LIFT / 2, 0]}>
                    <cylinderGeometry args={[0.002, 0.002, GRIP_LIFT, 6]} />
                    <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
                </mesh>
            )}
        </group>
    );
}

type LayerProps = {
    objects: VRObject[];
    selectedId: string | null;
    grippedId: string | null;
    interactive: boolean;
    latencyMs: number;
    handlers: InteractionHandlers;
};

/**
 * The bench objects plus the invisible plane that turns pointer movement into
 * a position on the desk while something is held.
 */
export default function VRInteractive({ objects, selectedId, grippedId, interactive, latencyMs, handlers }: LayerProps) {
    const dragPlane = grippedId !== null && interactive;

    const move = (e: ThreeEvent<PointerEvent>) => {
        if (!grippedId) return;
        e.stopPropagation();
        const p = e.point;
        handlers.onMove(grippedId, [
            THREE.MathUtils.clamp(p.x, -DESK_BOUNDS.x, DESK_BOUNDS.x),
            DESK_Y + GRIP_LIFT,
            // e.point is world space; the workstation group is offset +0.8 in z.
            THREE.MathUtils.clamp(p.z - 0.8, -DESK_BOUNDS.z, DESK_BOUNDS.z),
        ]);
    };

    return (
        <>
            {objects.map(o => (
                <Selectable
                    key={o.id}
                    obj={o}
                    selected={selectedId === o.id}
                    gripped={grippedId === o.id}
                    dragging={grippedId !== null}
                    interactive={interactive}
                    latencyMs={latencyMs}
                    handlers={handlers}
                />
            ))}

            {dragPlane && (
                <mesh
                    position={[0, DESK_Y + GRIP_LIFT, 0.8]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    onPointerMove={move}
                    onPointerUp={() => { handlers.onRelease(); document.body.style.cursor = ''; }}
                >
                    <planeGeometry args={[12, 12]} />
                    {/* Invisible but still raycastable — visible={false} would skip the raycast. */}
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>
            )}
        </>
    );
}

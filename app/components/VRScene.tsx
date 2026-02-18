'use client';

import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface VRSceneProps {
    mode: 'fpv' | 'third-person';
}

export default function VRScene({ mode }: VRSceneProps) {
    const robotRef = useRef<THREE.Group>(null);

    // Animate robot idle movement
    useFrame((state) => {
        if (robotRef.current) {
            robotRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 + 0.1;
        }
    });

    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00e5ff" />
            <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ef4444" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Grid
                args={[100, 100]}
                cellSize={1}
                cellThickness={1}
                cellColor="#1e2d45"
                sectionSize={5}
                sectionThickness={1.5}
                sectionColor="#00e5ff"
                fadeDistance={25}
                fadeStrength={1}
                followCamera={false}
                infiniteGrid={true}
                position={[0, -0.5, 0]}
            />

            {/* Robot Representation */}
            <group ref={robotRef} position={[0, 0, 0]}>
                {/* Body */}
                <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[1, 1.5, 0.8]} />
                    <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} />
                </mesh>
                {/* Head */}
                <mesh position={[0, 2, 0]}>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
                </mesh>
                {/* Eye/Sensor */}
                <mesh position={[0, 2, 0.35]}>
                    <ringGeometry args={[0.1, 0.15, 32]} />
                    <meshBasicMaterial color="#00e5ff" side={THREE.DoubleSide} />
                </mesh>
                {/* Arms */}
                <mesh position={[-0.8, 1, 0]}>
                    <capsuleGeometry args={[0.2, 1.2, 4, 8]} />
                    <meshStandardMaterial color="#475569" />
                </mesh>
                <mesh position={[0.8, 1, 0]}>
                    <capsuleGeometry args={[0.2, 1.2, 4, 8]} />
                    <meshStandardMaterial color="#475569" />
                </mesh>
            </group>

            {/* Environment/Fog */}
            <fog attach="fog" args={['#0a0e17', 5, 30]} />

            {/* Camera & Controls */}
            {mode === 'fpv' ? (
                // FPV: Camera inside the robot's head, looking forward
                <>
                    <PerspectiveCamera makeDefault position={[0, 2, 0.2]} fov={90} />
                    <OrbitControls
                        target={[0, 2, 5]} // Look forward
                        enableZoom={false}
                        enablePan={false}
                        maxPolarAngle={Math.PI / 1.5} // Limit looking down
                        minPolarAngle={Math.PI / 3} // Limit looking up
                        rotateSpeed={0.5}
                    />
                </>
            ) : (
                // 3rd Person: External view
                <>
                    <PerspectiveCamera makeDefault position={[4, 4, 6]} fov={60} />
                    <OrbitControls
                        target={[0, 1, 0]}
                        maxPolarAngle={Math.PI / 2 - 0.1} // Check floor
                        minDistance={2}
                        maxDistance={15}
                    />
                </>
            )}
        </>
    );
}

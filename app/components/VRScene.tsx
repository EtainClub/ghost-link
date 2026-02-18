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
                {/* Floating Chassis */}
                <mesh position={[0, 1.2, 0]}>
                    <boxGeometry args={[0.8, 1, 0.6]} />
                    <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.9} />
                </mesh>

                {/* Glowing Core */}
                <mesh position={[0, 1.2, 0.31]}>
                    <boxGeometry args={[0.4, 0.6, 0.05]} />
                    <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} toneMapped={false} />
                </mesh>

                {/* Head Unit */}
                <group position={[0, 1.8, 0]}>
                    <mesh>
                        <boxGeometry args={[0.5, 0.4, 0.5]} />
                        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
                    </mesh>
                    {/* Visor */}
                    <mesh position={[0, 0, 0.26]}>
                        <boxGeometry args={[0.4, 0.15, 0.05]} />
                        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.5} />
                    </mesh>
                    {/* Antenna */}
                    <mesh position={[0.2, 0.3, 0]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.6]} />
                        <meshStandardMaterial color="#64748b" metalness={1} />
                    </mesh>
                </group>

                {/* Left Robot Arm */}
                <group position={[-0.6, 1.4, 0]}>
                    {/* Shoulder */}
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#334155" metalness={0.8} />
                    </mesh>
                    {/* Upper Arm */}
                    <mesh position={[-0.1, -0.4, 0]} rotation={[0, 0, 0.2]}>
                        <boxGeometry args={[0.12, 0.8, 0.12]} />
                        <meshStandardMaterial color="#475569" metalness={0.7} />
                    </mesh>
                    {/* Forearm */}
                    <mesh position={[-0.2, -1, 0.2]} rotation={[0.4, 0, 0.2]}>
                        <boxGeometry args={[0.1, 0.7, 0.1]} />
                        <meshStandardMaterial color="#64748b" metalness={0.8} />
                    </mesh>
                    {/* Robot Hand (Claw) */}
                    <group position={[-0.25, -1.4, 0.3]} rotation={[0.4, 0, 0.2]}>
                        <mesh>
                            <boxGeometry args={[0.12, 0.15, 0.05]} />
                            <meshStandardMaterial color="#334155" />
                        </mesh>
                        {/* Fingers */}
                        <mesh position={[0, -0.1, 0.05]} rotation={[0.2, 0, 0]}>
                            <boxGeometry args={[0.03, 0.3, 0.03]} />
                            <meshStandardMaterial color="#94a3b8" metalness={1} />
                        </mesh>
                        <mesh position={[-0.04, -0.1, 0.05]} rotation={[0.2, 0, 0.1]}>
                            <boxGeometry args={[0.03, 0.3, 0.03]} />
                            <meshStandardMaterial color="#94a3b8" metalness={1} />
                        </mesh>
                        <mesh position={[0.04, -0.1, 0.05]} rotation={[0.2, 0, -0.1]}>
                            <boxGeometry args={[0.03, 0.3, 0.03]} />
                            <meshStandardMaterial color="#94a3b8" metalness={1} />
                        </mesh>
                    </group>
                </group>

                {/* Right Robot Arm */}
                <group position={[0.6, 1.4, 0]}>
                    {/* Shoulder */}
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#334155" metalness={0.8} />
                    </mesh>
                    {/* Upper Arm */}
                    <mesh position={[0.1, -0.4, 0]} rotation={[0, 0, -0.2]}>
                        <boxGeometry args={[0.12, 0.8, 0.12]} />
                        <meshStandardMaterial color="#475569" metalness={0.7} />
                    </mesh>
                    {/* Forearm */}
                    <mesh position={[0.2, -1, 0.2]} rotation={[0.4, 0, -0.2]}>
                        <boxGeometry args={[0.1, 0.7, 0.1]} />
                        <meshStandardMaterial color="#64748b" metalness={0.8} />
                    </mesh>
                    {/* Robot Hand (Claw) */}
                    <group position={[0.25, -1.4, 0.3]} rotation={[0.4, 0, -0.2]}>
                        <mesh>
                            <boxGeometry args={[0.12, 0.15, 0.05]} />
                            <meshStandardMaterial color="#334155" />
                        </mesh>
                        {/* Fingers */}
                        <mesh position={[0, -0.1, 0.05]} rotation={[0.2, 0, 0]}>
                            <boxGeometry args={[0.03, 0.3, 0.03]} />
                            <meshStandardMaterial color="#94a3b8" metalness={1} />
                        </mesh>
                        <mesh position={[-0.04, -0.1, 0.05]} rotation={[0.2, 0, 0.1]}>
                            <boxGeometry args={[0.03, 0.3, 0.03]} />
                            <meshStandardMaterial color="#94a3b8" metalness={1} />
                        </mesh>
                        <mesh position={[0.04, -0.1, 0.05]} rotation={[0.2, 0, -0.1]}>
                            <boxGeometry args={[0.03, 0.3, 0.03]} />
                            <meshStandardMaterial color="#94a3b8" metalness={1} />
                        </mesh>
                    </group>
                </group>
            </group>

            {/* Environment/Fog */}
            <fog attach="fog" args={['#0a0e17', 5, 30]} />

            {/* Camera & Controls */}
            {mode === 'fpv' ? (
                // FPV: Camera looking at the work bench
                <>
                    <PerspectiveCamera makeDefault position={[0, 1.8, 0.4]} rotation={[-0.5, 0, 0]} fov={75} />
                    <OrbitControls
                        target={[0, 0.8, 0.5]} // Look at the circuit board
                        enableZoom={true}
                        enablePan={true}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 4}
                        minDistance={0.5}
                        maxDistance={2}
                    />
                    <spotLight position={[0, 4, 1]} intensity={20} angle={0.4} penumbra={0.5} castShadow color="#ffffff" />
                </>
            ) : (
                // 3rd Person: External view
                <>
                    <PerspectiveCamera makeDefault position={[3, 3, 4]} fov={60} />
                    <OrbitControls
                        target={[0, 1, 0]}
                        maxPolarAngle={Math.PI / 2 - 0.1}
                        minDistance={2}
                        maxDistance={10}
                    />
                </>
            )}

            {/* Workstation Environment (Visible in both, but focus of FPV) */}
            <group position={[0, 0, 0.8]}>
                {/* Desk Surface */}
                <mesh position={[0, 0.8, 0]} receiveShadow>
                    <boxGeometry args={[4, 0.1, 2]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.2} />
                </mesh>

                {/* Circuit Board */}
                <group position={[0, 0.86, 0]} rotation={[-0.1, 0, 0]}>
                    {/* PCB Board */}
                    <mesh receiveShadow>
                        <boxGeometry args={[0.6, 0.02, 0.4]} />
                        <meshStandardMaterial color="#059669" roughness={0.3} metalness={0.5} />
                    </mesh>
                    {/* Chips/Components */}
                    <mesh position={[0, 0.02, 0]} castShadow>
                        <boxGeometry args={[0.1, 0.02, 0.1]} />
                        <meshStandardMaterial color="#1e293b" />
                    </mesh>
                    <mesh position={[0.15, 0.02, -0.1]} castShadow>
                        <boxGeometry args={[0.05, 0.03, 0.15]} />
                        <meshStandardMaterial color="#000000" />
                    </mesh>
                    {/* Traces/Details (Simulated) */}
                    <gridHelper args={[0.6, 20, 0x10b981, 0x10b981]} position={[0, 0.011, 0]} rotation={[0, 0, 0]} />
                </group>

                {/* Desk Lamp Glow */}
                <pointLight position={[0, 1.5, 0]} distance={2} intensity={2} color="#fbbf24" />
            </group>
        </>
    );
}

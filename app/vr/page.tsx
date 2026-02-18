'use client';
import Link from 'next/link';
import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import VRScene from '../components/VRScene';

// Simulated System Logs
const initialLogs = [
    { status: 'OK', msg: 'Neural Link: Stable' },
    { status: 'OK', msg: 'Haptic Feedback: Synced' },
    { status: 'INFO', msg: 'LIDAR: Mapping area...' },
];

export default function VRPage() {
    const [latency, setLatency] = useState(8.4);
    const [signal, setSignal] = useState(99);
    const [battery, setBattery] = useState(87);
    const [objectiveProgress, setObjectiveProgress] = useState(65);
    const [isEmergencyStop, setIsEmergencyStop] = useState(false);
    const [logs, setLogs] = useState(initialLogs);
    const [lhHaptic, setLhHaptic] = useState([40, 60, 30, 80]);
    const [rhHaptic, setRhHaptic] = useState([20, 40, 60, 30]);

    // Dual View State: false = Main is FPV, PIP is 3rd Person. true = Swapped.
    const [swapViews, setSwapViews] = useState(false);

    // Simulated Data Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(l => Math.max(2, parseFloat((l + (Math.random() - 0.5)).toFixed(1))));
            setSignal(s => Math.min(100, Math.max(80, s + Math.floor(Math.random() * 3) - 1)));
            setBattery(b => Math.max(0, parseFloat((b - 0.005).toFixed(2))));

            // Randomize haptics
            setLhHaptic(prev => prev.map(v => Math.max(10, Math.min(100, v + (Math.random() * 40 - 20)))));
            setRhHaptic(prev => prev.map(v => Math.max(10, Math.min(100, v + (Math.random() * 40 - 20)))));

        }, 800);
        return () => clearInterval(interval);
    }, []);

    const handleEmergencyStop = () => {
        setIsEmergencyStop(true);
        addLog('WARN', 'EMERGENCY STOP TRIGGERED');
        setTimeout(() => setIsEmergencyStop(false), 4000);
    };

    const addLog = (status: string, msg: string) => {
        setLogs(prev => [{ status, msg }, ...prev.slice(0, 4)]);
    };

    const mainMode = swapViews ? 'third-person' : 'fpv';
    const pipMode = swapViews ? 'fpv' : 'third-person';

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#101322] font-mono text-white select-none">

            {/* --- Main Viewport (3D Canvas) --- */}
            <div className="absolute inset-0">
                <Canvas shadows dpr={[1, 2]}>
                    <Suspense fallback={null}>
                        <VRScene mode={mainMode} />
                    </Suspense>
                </Canvas>

                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
                    backgroundSize: '100% 2px, 3px 100%',
                }} /> {/* CRT Effect */}

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
            </div>

            {/* --- Top Header HUD --- */}
            <div className="absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-start pointer-events-none">

                {/* Left: Latency & Signal */}
                <div className="flex gap-4 pointer-events-auto">
                    {/* Latency Card */}
                    <div className="backdrop-blur-md bg-[#1337ec]/10 border border-[#1337ec]/30 p-3 rounded flex flex-col min-w-[120px]">
                        <div className="flex justify-between items-center text-[10px] text-[#00e5ff] font-bold uppercase tracking-wider mb-1">
                            Latency
                        </div>
                        <div className="text-xl font-bold font-sans">{latency}<span className="text-xs ml-1 opacity-70">ms</span></div>
                        <div className="w-full bg-[#00e5ff]/20 h-1 mt-1 rounded-sm overflow-hidden">
                            <div className="bg-[#00e5ff] h-full transition-all duration-300" style={{ width: `${Math.min(100, (latency / 20) * 100)}%` }} />
                        </div>
                    </div>

                    {/* Signal Card */}
                    <div className="backdrop-blur-md bg-[#1337ec]/10 border border-[#1337ec]/30 p-3 rounded flex flex-col min-w-[120px]">
                        <div className="flex justify-between items-center text-[10px] text-[#10b981] font-bold uppercase tracking-wider mb-1">
                            Signal
                        </div>
                        <div className="text-xl font-bold font-sans">{signal}<span className="text-xs ml-1 opacity-70">%</span></div>
                        <div className="w-full bg-[#10b981]/20 h-1 mt-1 rounded-sm overflow-hidden">
                            <div className="bg-[#10b981] h-full transition-all duration-300" style={{ width: `${signal}%` }} />
                        </div>
                    </div>
                </div>

                {/* Center: Objective */}
                <div className="flex flex-col items-center pointer-events-auto">
                    <div className="backdrop-blur-md bg-[#1337ec]/10 border-x border-b border-[#1337ec]/30 px-8 py-3 rounded-b-lg text-center">
                        <div className="text-[10px] text-[#00e5ff] font-bold uppercase tracking-[0.2em] mb-1">Active Mission</div>
                        <div className="text-lg font-bold tracking-tight font-sans text-white text-shadow-glow">OBJECTIVE: SECURE SAMPLE 492-X</div>
                        <div className="flex items-center gap-4 mt-2 justify-center">
                            <div className="w-48 bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#00e5ff] h-full transition-all duration-700" style={{ width: `${objectiveProgress}%` }} />
                            </div>
                            <span className="text-xs font-bold text-[#00e5ff]">{objectiveProgress}%</span>
                        </div>
                    </div>
                </div>

                {/* Right: Battery & Settings */}
                <div className="flex gap-4 pointer-events-auto">
                    <div className="backdrop-blur-md bg-[#1337ec]/10 border-r-2 border-r-[#f59e0b] border border-[#1337ec]/30 p-3 rounded flex flex-col min-w-[120px]">
                        <div className="flex justify-between items-center text-[10px] text-[#f59e0b] font-bold uppercase tracking-wider mb-1">
                            Battery
                        </div>
                        <div className="text-xl font-bold font-sans text-white">{Math.round(battery)}<span className="text-xs ml-1 opacity-70">%</span></div>
                        <div className="w-full bg-[#f59e0b]/20 h-1 mt-1 rounded-sm overflow-hidden">
                            <div className="bg-[#f59e0b] h-full transition-all duration-1000" style={{ width: `${battery}%` }} />
                        </div>
                    </div>
                    <Link href="/dashboard">
                        <button className="h-full px-4 bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] hover:bg-[#00e5ff]/20 transition-colors rounded">
                            <span className="text-xl">✕</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* --- Center Reticle & HUD --- */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                {/* Dynamic Horizon Line */}
                <div className="absolute w-[600px] h-[1px] bg-[#00e5ff]/30 flex justify-between items-center opacity-50">
                    <div className="w-8 h-[1px] bg-[#00e5ff]" />
                    <div className="w-8 h-[1px] bg-[#00e5ff]" />
                </div>

                {/* Crosshair */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute inset-0 border border-[#00e5ff]/20 rounded-full border-dashed animate-spin-slow" style={{ animationDuration: '20s' }} />
                    <div className="absolute w-4 h-4 border border-[#00e5ff] bg-[#00e5ff]/20 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full" />
                    </div>
                    {/* Compass Markers */}
                    <div className="absolute -top-8 text-[10px] font-bold text-[#00e5ff]">N 012°</div>
                    <div className="absolute -bottom-8 text-[10px] font-bold text-[#00e5ff]">ALT 1.2M</div>
                </div>
            </div>

            {/* --- Side Panels: Haptics --- */}

            {/* Left Haptic */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 pointer-events-none">
                <div className="backdrop-blur-md bg-[#1337ec]/5 border-l-4 border-l-[#00e5ff] p-4 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[#00e5ff] uppercase mb-4 [writing-mode:vertical-lr] rotate-180">LH HAPTIC</span>
                    <div className="flex gap-1 h-48 items-end">
                        {lhHaptic.map((v, i) => (
                            <div key={i} className="w-2 bg-[#00e5ff] transition-all duration-300"
                                style={{ height: `${v}%`, opacity: 0.3 + (v / 200) }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Haptic */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 pointer-events-none">
                <div className="backdrop-blur-md bg-[#1337ec]/5 border-r-4 border-r-[#00e5ff] p-4 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[#00e5ff] uppercase mb-4 [writing-mode:vertical-lr] rotate-180">RH HAPTIC</span>
                    <div className="flex gap-1 h-48 items-end">
                        {rhHaptic.map((v, i) => (
                            <div key={i} className="w-2 bg-[#00e5ff] transition-all duration-300"
                                style={{ height: `${v}%`, opacity: 0.3 + (v / 200) }} />
                        ))}
                    </div>
                </div>
            </div>


            {/* --- Bottom Stats & Controls --- */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-30 flex justify-between items-end pointer-events-none">

                {/* Left: PIP View (Secondary Camera) - ENLARGED */}
                <div className="pointer-events-auto relative group flex flex-col gap-2">
                    <div className="text-[11px] font-bold text-[#00e5ff] uppercase tracking-wider flex items-center gap-2 bg-black/60 px-2 py-1 rounded w-fit backdrop-blur-sm border border-[#00e5ff]/20">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                        {swapViews ? 'MAIN FEED: FPV' : 'REMOTE OPS VIEW'}
                    </div>

                    {/* Enlarged PIP Window (approx 400px width) */}
                    <div
                        onClick={() => setSwapViews(!swapViews)}
                        className="w-[400px] h-[300px] bg-black/80 border-2 border-[#1e2d45] hover:border-[#00e5ff] rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] relative"
                    >
                        {/* 3D Canvas for PIP */}
                        <div className="absolute inset-0">
                            <Canvas shadows dpr={[1, 2]}>
                                <Suspense fallback={null}>
                                    <VRScene mode={pipMode} />
                                </Suspense>
                            </Canvas>
                        </div>

                        {/* PIP Overlay UI */}
                        <div className="absolute top-0 right-0 p-2 pointer-events-none">
                            <div className="text-[9px] font-bold bg-[#00e5ff]/20 text-[#00e5ff] px-1.5 py-0.5 rounded border border-[#00e5ff]/30">
                                CAM-{swapViews ? '01' : '02'}
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                        <div className="absolute inset-0 bg-[#00e5ff]/5 pointer-events-none group-hover:bg-transparent transition-colors" />
                    </div>

                    <div className="flex items-center gap-2 opacity-50 text-[10px] text-[#00e5ff]">
                        <span className="text-lg">⟲</span>
                        <span>CLICK SCREEN TO SWAP FEEDS</span>
                    </div>
                </div>

                {/* Right: Controls & Logs */}
                <div className="flex gap-4 pointer-events-auto items-end">

                    {/* System Logs */}
                    <div className="backdrop-blur-md bg-black/40 border border-[#00e5ff]/20 p-3 w-96 h-40 flex flex-col gap-1 overflow-hidden rounded-t-xl">
                        <div className="text-[10px] font-bold text-[#00e5ff] uppercase border-b border-[#00e5ff]/20 pb-1 mb-1">System Logs</div>
                        <div className="text-[10px] font-mono space-y-1 opacity-90 overflow-y-auto">
                            {logs.map((log, i) => (
                                <div key={i} className="flex gap-2">
                                    <span className={log.status === 'OK' ? 'text-[#10b981]' : log.status === 'WARN' ? 'text-[#f59e0b]' : 'text-[#00e5ff]'}>
                                        [{log.status}]
                                    </span>
                                    <span className="text-white/80">{log.msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleEmergencyStop}
                            className={`${isEmergencyStop ? 'bg-[#ef4444]' : 'bg-[#ef4444]/80'} text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:brightness-110 flex items-center gap-3 rounded shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all active:scale-95`}
                        >
                            <span className="text-xl">⚠</span>
                            {isEmergencyStop ? 'STOPPING...' : 'EMERGENCY STOP'}
                        </button>

                        <button
                            onClick={() => setSwapViews(!swapViews)}
                            className="backdrop-blur-md bg-white/5 border border-white/10 text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-3 rounded"
                        >
                            <span className="text-xl">⟲</span>
                            Swap View
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Emergency Stop Overlay --- */}
            {isEmergencyStop && (
                <div className="absolute inset-0 z-50 pointer-events-none border-[12px] border-[#ef4444] animate-pulse bg-[#ef4444]/10 flex items-center justify-center">
                    <div className="bg-black/80 border border-[#ef4444] p-8 rounded-lg text-center backdrop-blur-xl">
                        <div className="text-4xl font-extrabold text-[#ef4444] mb-2 animate-bounce">EMERGENCY STOP</div>
                        <div className="text-white font-mono">SYSTEMS HALTED. MANUAL OVERRIDE REQUIRED.</div>
                    </div>
                </div>
            )}

        </div>
    );
}

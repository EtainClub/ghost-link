'use client';
import Link from 'next/link';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import VRScene from '../components/VRScene';
import VRTour from '../components/VRTour';
import type { InteractionHandlers } from '../components/VRInteractive';
import { DESK_Y, GRIP_LIFT, objectsFor, type TaskId, type VRObject } from '../components/vrObjects';

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

    // Task State: 'soldering' or 'domestic'
    const [activeTask, setActiveTask] = useState<TaskId>('soldering');

    // Bench state lives here so the HUD and both camera feeds agree.
    const [objects, setObjects] = useState<VRObject[]>(() => objectsFor('soldering'));
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [grippedId, setGrippedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Simulated Data Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(l => Math.max(2, parseFloat((l + (Math.random() - 0.5)).toFixed(1))));
            setSignal(s => Math.min(100, Math.max(80, s + Math.floor(Math.random() * 3) - 1)));
            setBattery(b => Math.max(0, parseFloat((b - 0.005).toFixed(2))));

            // Haptics report what the hands are doing. Holding something reads
            // as steady pressure; an empty gripper just twitches on noise.
            const load = grippedId ? 62 : 0;
            const jitter = grippedId ? 14 : 40;
            setLhHaptic(prev => prev.map(v => Math.max(6, Math.min(100, v + (Math.random() * jitter - jitter / 2) + (load - v) * 0.35))));
            setRhHaptic(prev => prev.map(v => Math.max(6, Math.min(100, v + (Math.random() * jitter - jitter / 2) + (load - v) * 0.35))));

        }, 800);
        return () => clearInterval(interval);
        // Restarting the tick when the grip changes is cheap and keeps the
        // haptic load honest without stashing state in a ref.
    }, [grippedId]);

    const handleEmergencyStop = () => {
        setIsEmergencyStop(true);
        addLog('WARN', 'EMERGENCY STOP TRIGGERED');
        setTimeout(() => setIsEmergencyStop(false), 4000);
    };

    const switchTask = (task: TaskId) => {
        setActiveTask(task);
        setObjects(objectsFor(task));
        setSelectedId(null);
        setGrippedId(null);
        setObjectiveProgress(0); // Reset progress
        addLog('INFO', `TASK SWAPPED: ${task.toUpperCase()}`);
    };

    const addLog = (status: string, msg: string) => {
        setLogs(prev => [{ status, msg }, ...prev.slice(0, 4)]);
    };

    /* --- Bench interaction ------------------------------------------------ */

    const handlers: InteractionHandlers = useMemo(() => ({
        onHover: setHoveredId,
        onGrab: (id) => {
            if (isEmergencyStop) return; // halted means halted
            setSelectedId(id);
            setGrippedId(id);
            setObjects(prev => prev.map(o => (o.id === id ? { ...o, pos: [o.pos[0], DESK_Y + GRIP_LIFT, o.pos[2]] } : o)));
            addLog('OK', `GRIP CLOSED · ${id}`);
        },
        onRelease: () => {
            setGrippedId(prev => {
                if (!prev) return null;
                setObjects(objs => objs.map(o => {
                    if (o.id !== prev) return o;
                    const restY = o.shape === 'box' ? DESK_Y + o.args[1] / 2 : DESK_Y + o.args[2] / 2;
                    return { ...o, pos: [o.pos[0], restY, o.pos[2]] };
                }));
                addLog('OK', `RELEASED · ${prev}`);
                return null;
            });
        },
        onMove: (id, pos) => {
            setObjects(prev => prev.map(o => (o.id === id ? { ...o, pos } : o)));
        },
    }), [isEmergencyStop]);

    // An emergency stop drops whatever the machine is holding.
    useEffect(() => {
        if (isEmergencyStop && grippedId) handlers.onRelease();
    }, [isEmergencyStop, grippedId, handlers]);

    // Letting go anywhere ends the grip, including outside the canvas.
    useEffect(() => {
        if (!grippedId) return;
        const up = () => { handlers.onRelease(); document.body.style.cursor = ''; };
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
        return () => {
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', up);
        };
    }, [grippedId, handlers]);

    const selected = objects.find(o => o.id === selectedId) ?? null;
    const hovered = objects.find(o => o.id === hoveredId) ?? null;
    // Hovering previews whatever is under the pointer; the selection is what
    // you fall back to once you look away.
    const readout = hovered ?? selected;

    const mainMode = swapViews ? 'third-person' : 'fpv';
    const pipMode = swapViews ? 'fpv' : 'third-person';

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#101322] font-mono text-white select-none">

            {/* --- Main Viewport (3D Canvas) --- */}
            <div className="absolute inset-0">
                <Canvas shadows dpr={[1, 2]}>
                    <Suspense fallback={null}>
                        <VRScene
                            mode={mainMode}
                            task={activeTask}
                            objects={objects}
                            selectedId={selectedId}
                            grippedId={grippedId}
                            interactive={!isEmergencyStop}
                            latencyMs={latency}
                            handlers={handlers}
                        />
                    </Suspense>
                </Canvas>

                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
                    backgroundSize: '100% 2px, 3px 100%',
                }} /> {/* CRT Effect */}

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
            </div>

            {/* --- Target readout: what the hands are on --- */}
            {/* Right-hand band is the only column free between the haptics and
                the log panel; the left one is taken by the PIP feed. */}
            <div className="vr-target absolute right-6 z-20 pointer-events-none" style={{ top: '400px', width: '280px' }}>
                <div
                    className="backdrop-blur-md border rounded"
                    style={{
                        padding: '12px 14px',
                        background: 'rgba(8,12,20,0.72)',
                        borderColor: grippedId ? 'rgba(245,158,11,0.5)' : readout ? 'rgba(0,229,255,0.35)' : 'rgba(30,45,69,0.8)',
                        transition: 'border-color 0.2s',
                    }}
                >
                    <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: grippedId ? '#f59e0b' : '#00e5ff' }}>
                            {grippedId ? '● Holding' : readout ? 'Target' : 'No target'}
                        </span>
                        {readout && <span className="text-[9px] text-white/30">{readout.id}</span>}
                    </div>

                    {readout ? (
                        <>
                            <p className="text-[13px] font-bold font-sans text-white" style={{ marginBottom: '6px', lineHeight: 1.3 }}>
                                {readout.label}
                            </p>
                            <div className="flex gap-4 text-[10px]" style={{ marginBottom: '6px' }}>
                                <span className="text-white/40">MASS <span className="text-white/80">{readout.mass}</span></span>
                            </div>
                            <p className="text-[10px] text-white/40" style={{ marginBottom: '8px' }}>{readout.material}</p>
                            <p className="vr-target-note text-[10px] leading-relaxed" style={{ color: '#8899aa' }}>{readout.note}</p>
                        </>
                    ) : (
                        <p className="text-[10px] leading-relaxed text-white/40">
                            Point at something on the bench. Press and hold to close the gripper,
                            drag to move it, let go to set it down.
                        </p>
                    )}
                </div>
            </div>

            {/* --- Top Header HUD --- */}
            <div className="vr-top absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-start pointer-events-none">

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
                <div className="vr-objective flex flex-col items-center pointer-events-auto">
                    <div className="backdrop-blur-md bg-[#1337ec]/10 border-x border-b border-[#1337ec]/30 px-8 py-3 rounded-b-lg text-center relative group">
                        {/* Dropdown / Task Selector Trigger */}
                        <div className="text-[10px] text-[#00e5ff] font-bold uppercase tracking-[0.2em] mb-1 cursor-pointer hover:text-white transition-colors"
                            title="Click to change task (Simulated)">
                            Active Mission ▾
                        </div>
                        <div className="text-lg font-bold tracking-tight font-sans text-white text-shadow-glow">
                            {activeTask === 'soldering' ? 'OBJECTIVE: SECURE SAMPLE 492-X' : 'OBJECTIVE: DOMESTIC SANITATION'}
                        </div>

                        {/* Task Switching Menu (Hover) */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-black/90 border border-[#00e5ff]/30 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto flex flex-col z-50">
                            <button onClick={() => switchTask('soldering')} className={`px-4 py-2 text-xs text-left hover:bg-[#00e5ff]/20 ${activeTask === 'soldering' ? 'text-[#00e5ff] font-bold' : 'text-gray-400'}`}>
                                ⚡ PRECISION SOLDERING
                            </button>
                            <button onClick={() => switchTask('domestic')} className={`px-4 py-2 text-xs text-left hover:bg-[#00e5ff]/20 ${activeTask === 'domestic' ? 'text-[#00e5ff] font-bold' : 'text-gray-400'}`}>
                                🏠 DOMESTIC SORTING
                            </button>
                        </div>

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
            <div className="vr-reticle absolute inset-0 pointer-events-none flex items-center justify-center z-10">
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
            <div className="vr-haptic vr-haptic-l absolute left-6 z-20 flex flex-col gap-4 pointer-events-none">
                <div className="backdrop-blur-md bg-[#1337ec]/5 border-l-4 border-l-[#00e5ff] p-4 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[#00e5ff] uppercase mb-4 [writing-mode:vertical-lr] rotate-180">LH HAPTIC</span>
                    <div className="vr-bars flex gap-1 h-48 items-end">
                        {lhHaptic.map((v, i) => (
                            <div key={i} className="w-2 bg-[#00e5ff] transition-all duration-300"
                                style={{ height: `${v}%`, opacity: 0.3 + (v / 200) }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Haptic */}
            <div className="vr-haptic vr-haptic-r absolute right-6 z-20 flex flex-col gap-4 pointer-events-none">
                <div className="backdrop-blur-md bg-[#1337ec]/5 border-r-4 border-r-[#00e5ff] p-4 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[#00e5ff] uppercase mb-4 [writing-mode:vertical-lr] rotate-180">RH HAPTIC</span>
                    <div className="vr-bars flex gap-1 h-48 items-end">
                        {rhHaptic.map((v, i) => (
                            <div key={i} className="w-2 bg-[#00e5ff] transition-all duration-300"
                                style={{ height: `${v}%`, opacity: 0.3 + (v / 200) }} />
                        ))}
                    </div>
                </div>
            </div>


            {/* --- Bottom Stats & Controls --- */}
            <div className="vr-bottom absolute bottom-0 left-0 w-full p-6 z-30 flex justify-between items-end pointer-events-none">

                {/* Left: PIP View (Secondary Camera) - ENLARGED */}
                <div className="pointer-events-auto relative group flex flex-col gap-2">
                    <div className="text-[11px] font-bold text-[#00e5ff] uppercase tracking-wider flex items-center gap-2 bg-black/60 px-2 py-1 rounded w-fit backdrop-blur-sm border border-[#00e5ff]/20">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                        {swapViews ? 'MAIN FEED: FPV' : 'REMOTE OPS VIEW'}
                    </div>

                    {/* Enlarged PIP Window (approx 400px width) */}
                    <div
                        onClick={() => setSwapViews(!swapViews)}
                        className="vr-pip w-[400px] h-[300px] bg-black/80 border-2 border-[#1e2d45] hover:border-[#00e5ff] rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] relative"
                    >
                        {/* 3D Canvas for PIP */}
                        <div className="absolute inset-0">
                            <Canvas shadows dpr={[1, 2]}>
                                <Suspense fallback={null}>
                                    <VRScene
                                        mode={pipMode}
                                        task={activeTask}
                                        objects={objects}
                                        selectedId={selectedId}
                                        grippedId={grippedId}
                                        interactive={false}
                                        latencyMs={latency}
                                        handlers={handlers}
                                    />
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

                    <div className="vr-swaphint flex items-center gap-2 opacity-50 text-[10px] text-[#00e5ff]">
                        <span className="text-lg">⟲</span>
                        <span>CLICK SCREEN TO SWAP FEEDS</span>
                    </div>
                </div>

                {/* Right: Controls & Logs */}
                <div className="vr-controls flex gap-4 pointer-events-auto items-end">

                    {/* System Logs */}
                    <div className="vr-logs backdrop-blur-md bg-black/40 border border-[#00e5ff]/20 p-3 w-96 h-40 flex flex-col gap-1 overflow-hidden rounded-t-xl">
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
                    <div className="vr-actions flex flex-col gap-2">
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

            {/* First-visit orientation — the HUD is only impressive if it is legible */}
            <VRTour />

            {/* Tailwind's spacing utilities are dead here (see docs/CONCEPT-IMPROVEMENT.md
                §1.6a), so the phone layout is plain CSS. */}
            <style jsx global>{`
                @media (min-width: 901px) {
                    /* Vertically centred haptic columns collide with the PIP feed
                       now that the panels have real padding. Anchor them in the
                       clear band between the top HUD and the PIP. */
                    .vr-haptic {
                        top: 150px;
                    }
                    .vr-haptic .vr-bars {
                        height: 130px;
                    }
                }
                @media (max-width: 900px) {
                    .vr-top {
                        flex-wrap: wrap;
                        gap: 8px;
                        padding: 8px !important;
                    }
                    .vr-top > div {
                        flex: 1 1 auto;
                    }
                    .vr-objective {
                        order: 3;
                        width: 100%;
                    }
                    .vr-objective > div {
                        padding: 8px 12px !important;
                        border-radius: 8px;
                    }
                    .vr-reticle {
                        transform: scale(0.62);
                    }
                    .vr-haptic {
                        top: 150px;
                        bottom: auto;
                    }
                    .vr-haptic-l { left: 8px !important; }
                    .vr-haptic-r { right: 8px !important; }
                    .vr-haptic .vr-bars { height: 64px; }
                    .vr-haptic > div { padding: 8px !important; }

                    .vr-bottom {
                        flex-direction: column;
                        align-items: stretch !important;
                        gap: 10px;
                        padding: 10px !important;
                    }
                    .vr-controls {
                        flex-direction: column;
                        align-items: stretch !important;
                        gap: 10px;
                    }
                    .vr-pip {
                        width: 100% !important;
                        height: 168px !important;
                    }
                    .vr-logs {
                        width: 100% !important;
                        height: 92px !important;
                    }
                    .vr-actions {
                        flex-direction: row;
                    }
                    .vr-actions button {
                        flex: 1;
                        justify-content: center;
                        padding: 14px 8px !important;
                        font-size: 0.7rem;
                    }
                    .vr-swaphint { display: none; }

                    /* Sits between the two haptic columns, under the objective. */
                    .vr-target {
                        top: 150px !important;
                        left: 96px;
                        right: 96px !important;
                        width: auto !important;
                    }
                    .vr-target .vr-target-note { display: none; }
                }

                /* Short phones cannot fit the haptic columns and the controls.
                   The emergency stop wins. */
                @media (max-width: 900px) and (max-height: 720px) {
                    .vr-haptic { display: none; }
                }
            `}</style>

        </div>
    );
}

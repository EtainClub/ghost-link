'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const systemLogs = [
    { status: 'OK', msg: 'Navigation synced' },
    { status: 'OK', msg: 'Haptic modules online' },
    { status: 'INFO', msg: 'Sample detected at 4m' },
    { status: 'WARN', msg: 'Visual interference 2%' },
];

export default function VRPage() {
    const [latency, setLatency] = useState(8.4);
    const [battery, setBattery] = useState(42);
    const [progress, setProgress] = useState(65);
    const [lhHaptic] = useState([60, 80, 45, 90, 70, 55]);
    const [rhHaptic] = useState([30, 50, 20, 40, 35, 25]);
    const [emergencyStop, setEmergencyStop] = useState(false);
    const [fpvMode, setFpvMode] = useState(false);
    const [logs, setLogs] = useState(systemLogs);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setLatency(l => parseFloat((l + (Math.random() - 0.5) * 0.5).toFixed(1)));
            setBattery(b => Math.max(0, b - 0.01));
            setProgress(p => Math.min(100, p + 0.05));
        }, 1000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    const handleEmergencyStop = () => {
        setEmergencyStop(true);
        setLogs(prev => [{ status: 'WARN', msg: 'EMERGENCY STOP ACTIVATED' }, ...prev.slice(0, 3)]);
        setTimeout(() => setEmergencyStop(false), 3000);
    };

    const getStatusColor = (status: string) => {
        if (status === 'OK') return '#10b981';
        if (status === 'INFO') return '#00e5ff';
        if (status === 'WARN') return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div style={{
            position: 'fixed', inset: 0,
            background: '#000',
            overflow: 'hidden',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#00e5ff',
        }}>
            {/* Background - Industrial facility simulation */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, #0a1628 0%, #0d2040 30%, #071020 100%)',
            }}>
                {/* Perspective grid floor */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} viewBox="0 0 1200 800">
                    {/* Ceiling lines */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <line key={`c${i}`} x1={600} y1={200} x2={i * 160} y2={0} stroke="#00e5ff" strokeWidth="0.5" />
                    ))}
                    {/* Floor lines */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <line key={`f${i}`} x1={600} y1={500} x2={i * 160} y2={800} stroke="#00e5ff" strokeWidth="0.5" />
                    ))}
                    {/* Horizontal lines */}
                    {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
                        <line key={`h${i}`} x1={600 - 600 * t} y1={200 + 300 * t} x2={600 + 600 * t} y2={200 + 300 * t} stroke="#00e5ff" strokeWidth="0.5" />
                    ))}
                    {/* Robot silhouette */}
                    <g transform="translate(500, 280)" opacity="0.6">
                        <rect x="40" y="0" width="80" height="60" rx="8" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
                        <rect x="50" y="60" width="60" height="80" rx="4" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
                        <line x1="50" y1="80" x2="20" y2="130" stroke="#00e5ff" strokeWidth="1.5" />
                        <line x1="110" y1="80" x2="140" y2="130" stroke="#00e5ff" strokeWidth="1.5" />
                        <line x1="60" y1="140" x2="55" y2="190" stroke="#00e5ff" strokeWidth="1.5" />
                        <line x1="100" y1="140" x2="105" y2="190" stroke="#00e5ff" strokeWidth="1.5" />
                        <circle cx="80" cy="30" r="20" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
                        <circle cx="72" cy="28" r="5" fill="#00e5ff" opacity="0.8" />
                        <circle cx="88" cy="28" r="5" fill="#00e5ff" opacity="0.8" />
                    </g>
                </svg>

                {/* Scan line effect */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.015) 2px, rgba(0,229,255,0.015) 4px)',
                    pointerEvents: 'none',
                }} />

                {/* Vignette */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
                    pointerEvents: 'none',
                }} />
            </div>

            {/* Top Bar */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 20px',
                background: 'rgba(0,0,0,0.6)',
                borderBottom: '1px solid rgba(0,229,255,0.2)',
                zIndex: 10,
            }}>
                <Link href="/marketplace" style={{ textDecoration: 'none' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '6px',
                        background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#00e5ff', fontSize: '1rem',
                    }}>←</div>
                </Link>

                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(0,229,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Ghost Link Operations</p>
                    <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.05em' }}>GHOST LINK: SECURE SAMPLE 492-X</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '4px' }}>
                        <div style={{ flex: 1, height: '4px', background: 'rgba(0,229,255,0.2)', borderRadius: '2px', overflow: 'hidden', width: '200px' }}>
                            <div style={{ height: '100%', width: `${progress}%`, background: '#00e5ff', borderRadius: '2px', transition: 'width 0.5s' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#00e5ff' }}>{Math.round(progress)}%</span>
                    </div>
                </div>

                <div style={{
                    width: '36px', height: '36px', borderRadius: '6px',
                    background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#00e5ff', fontSize: '1rem',
                }}>👤</div>
            </div>

            {/* Left Panel - Latency & Signal */}
            <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,229,255,0.3)',
                    borderRadius: '6px', padding: '14px 18px', minWidth: '120px',
                }}>
                    <p style={{ fontSize: '0.6rem', color: 'rgba(0,229,255,0.6)', letterSpacing: '0.1em', marginBottom: '4px' }}>LATENCY</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00e5ff' }}>{latency}</p>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(0,229,255,0.6)' }}>ms</p>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(0,229,255,0.2)', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${(latency / 20) * 100}%`, height: '100%', background: '#10b981', borderRadius: '2px' }} />
                    </div>
                </div>

                <div style={{
                    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,229,255,0.3)',
                    borderRadius: '6px', padding: '14px 18px',
                }}>
                    <p style={{ fontSize: '0.6rem', color: 'rgba(0,229,255,0.6)', letterSpacing: '0.1em', marginBottom: '4px' }}>SIGNAL</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00e5ff' }}>99</p>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(0,229,255,0.6)' }}>%</p>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(0,229,255,0.2)', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                        <div style={{ width: '99%', height: '100%', background: '#10b981', borderRadius: '2px' }} />
                    </div>
                </div>

                {/* LH Haptic */}
                <div style={{
                    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,229,255,0.3)',
                    borderRadius: '6px', padding: '14px 18px',
                }}>
                    <p style={{ fontSize: '0.6rem', color: '#00e5ff', letterSpacing: '0.1em', marginBottom: '8px' }}>LH HAPTIC</p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '50px' }}>
                        {lhHaptic.map((h, i) => (
                            <div key={i} style={{ flex: 1, background: `rgba(0,229,255,${0.3 + (h / 100) * 0.7})`, borderRadius: '2px', height: `${h}%`, transition: 'height 0.3s' }} />
                        ))}
                    </div>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(0,229,255,0.6)', marginTop: '6px' }}>78% FEEDBACK</p>
                </div>

                {/* LIDAR */}
                <div style={{
                    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,229,255,0.3)',
                    borderRadius: '6px', padding: '14px 18px',
                }}>
                    <p style={{ fontSize: '0.6rem', color: '#10b981', letterSpacing: '0.1em', marginBottom: '8px' }}>● LIDAR SCAN 360°</p>
                    <svg width="80" height="60" viewBox="0 0 80 60">
                        <ellipse cx="40" cy="40" rx="35" ry="15" fill="none" stroke="rgba(0,229,255,0.2)" strokeWidth="1" />
                        <ellipse cx="40" cy="40" rx="20" ry="8" fill="none" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
                        <ellipse cx="40" cy="40" rx="8" ry="3" fill="none" stroke="rgba(0,229,255,0.5)" strokeWidth="1" />
                        <circle cx="40" cy="40" r="2" fill="#00e5ff" />
                        <line x1="40" y1="40" x2="70" y2="30" stroke="#00e5ff" strokeWidth="1" opacity="0.8" />
                    </svg>
                    <p style={{ fontSize: '0.62rem', color: 'rgba(0,229,255,0.5)', marginTop: '4px' }}>ZOOM 1.5X</p>
                </div>
            </div>

            {/* Right Panel - Battery & Controls */}
            <div style={{ position: 'absolute', top: '80px', right: '20px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(239,68,68,0.4)',
                    borderRadius: '6px', padding: '14px 18px', minWidth: '120px',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <p style={{ fontSize: '0.6rem', color: '#ef4444', letterSpacing: '0.1em' }}>BATTERY</p>
                        <span style={{ fontSize: '0.7rem' }}>🔋</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ef4444' }}>{Math.round(battery)}</p>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(239,68,68,0.6)' }}>%</p>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(239,68,68,0.2)', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${battery}%`, height: '100%', background: '#ef4444', borderRadius: '2px' }} />
                    </div>
                </div>

                <div style={{
                    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,229,255,0.3)',
                    borderRadius: '6px', padding: '14px 18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                }}>
                    <span style={{ fontSize: '1.5rem' }}>⚙️</span>
                </div>

                {/* RH Haptic */}
                <div style={{
                    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,229,255,0.3)',
                    borderRadius: '6px', padding: '14px 18px',
                }}>
                    <p style={{ fontSize: '0.6rem', color: '#00e5ff', letterSpacing: '0.1em', marginBottom: '8px' }}>RH HAPTIC</p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '50px' }}>
                        {rhHaptic.map((h, i) => (
                            <div key={i} style={{ flex: 1, background: `rgba(0,229,255,${0.2 + (h / 100) * 0.6})`, borderRadius: '2px', height: `${h}%` }} />
                        ))}
                    </div>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(0,229,255,0.6)', marginTop: '6px' }}>34% FEEDBACK</p>
                </div>
            </div>

            {/* Center Crosshair */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10, pointerEvents: 'none',
            }}>
                <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,229,255,0.6)' }} />
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,229,255,0.6)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', borderRadius: '50%', border: '1px solid #00e5ff' }} />
                </div>
                {/* Compass */}
                <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: 'rgba(0,229,255,0.7)' }}>N 012°</div>
                <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: 'rgba(0,229,255,0.7)' }}>ALT 1.2M</div>
            </div>

            {/* Bottom Panel */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                padding: '16px 20px',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
                zIndex: 10,
            }}>
                {/* System Logs */}
                <div style={{
                    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,229,255,0.2)',
                    borderRadius: '6px', padding: '12px 16px', minWidth: '320px',
                }}>
                    <p style={{ fontSize: '0.6rem', color: '#00e5ff', letterSpacing: '0.1em', marginBottom: '8px' }}>SYSTEM LOGS</p>
                    {logs.map((log, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.65rem', color: getStatusColor(log.status), fontWeight: 700, minWidth: '40px' }}>[{log.status}]</span>
                            <span style={{ fontSize: '0.65rem', color: 'rgba(0,229,255,0.7)' }}>{log.msg}</span>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px' }}>
                    <button
                        onClick={handleEmergencyStop}
                        style={{
                            background: emergencyStop ? '#7f1d1d' : '#ef4444',
                            color: '#fff',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            letterSpacing: '0.08em',
                            padding: '14px 20px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            justifyContent: 'center',
                            boxShadow: emergencyStop ? 'none' : '0 0 20px rgba(239,68,68,0.4)',
                            transition: 'all 0.2s',
                        }}>
                        ⊕ {emergencyStop ? 'STOPPED' : 'EMERGENCY STOP'}
                    </button>
                    <button
                        onClick={() => setFpvMode(f => !f)}
                        style={{
                            background: fpvMode ? 'rgba(0,229,255,0.2)' : 'rgba(0,0,0,0.6)',
                            color: '#00e5ff',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            letterSpacing: '0.05em',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            border: '1px solid rgba(0,229,255,0.3)',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            justifyContent: 'center',
                        }}>
                        📷 {fpvMode ? 'FPV: ON' : 'TOGGLE FPV'}
                    </button>
                    <Link href="/marketplace" style={{ textDecoration: 'none' }}>
                        <button style={{
                            width: '100%',
                            background: 'rgba(0,0,0,0.6)',
                            color: '#8899aa',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            padding: '8px 20px',
                            borderRadius: '4px',
                            border: '1px solid #1e2d45',
                            cursor: 'pointer',
                        }}>
                            ← Disconnect
                        </button>
                    </Link>
                </div>
            </div>

            {/* Emergency Stop Overlay */}
            {emergencyStop && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 20,
                    border: '4px solid #ef4444',
                    pointerEvents: 'none',
                    boxShadow: 'inset 0 0 60px rgba(239,68,68,0.3)',
                    animation: 'pulse-glow 0.5s infinite',
                }} />
            )}
        </div>
    );
}

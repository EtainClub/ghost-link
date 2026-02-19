'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

const workHistory = [
    { date: '2026-02-18', time: '08:45 AM', robot: 'Atlas-X7', icon: '🤖', task: 'Hazmat Cleanup', taskColor: '#ef4444', efficiency: 98.5, earnings: 450 },
    { date: '2026-02-17', time: '14:20 PM', robot: 'Spot-V4', icon: '🐕', task: 'Site Survey', taskColor: '#f59e0b', efficiency: 92.0, earnings: 120 },
    { date: '2026-02-16', time: '09:15 AM', robot: 'Arm-C2', icon: '🦾', task: 'Precision Weld', taskColor: '#a855f7', efficiency: 99.1, earnings: 800 },
    { date: '2026-02-15', time: '16:45 PM', robot: 'Drone-X1', icon: '🚁', task: 'Aerial Map', taskColor: '#3b82f6', efficiency: 95.4, earnings: 210 },
    { date: '2026-02-15', time: '11:00 AM', robot: 'Lift-G2', icon: '🏗️', task: 'Cargo Load', taskColor: '#f59e0b', efficiency: 88.7, earnings: 320 },
];

const proficiencyData = [
    { label: 'PREC', value: 96 },
    { label: 'SPEED', value: 88 },
    { label: 'ENDUR', value: 82 },
    { label: 'PROB', value: 92 },
    { label: 'TECH', value: 90 },
    { label: 'NAV', value: 99 },
];

function RadarChart() {
    const size = 180;
    const center = size / 2;
    const maxRadius = 70;
    const labels = proficiencyData;
    const n = labels.length;

    const getPoint = (index: number, radius: number) => {
        const angle = (index * 2 * Math.PI) / n - Math.PI / 2;
        return {
            x: center + radius * Math.cos(angle),
            y: center + radius * Math.sin(angle),
        };
    };

    const dataPoints = labels.map((d, i) => getPoint(i, (d.value / 100) * maxRadius));
    const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

    const gridLevels = [0.25, 0.5, 0.75, 1.0];

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Grid */}
            {gridLevels.map((level, li) => {
                const pts = Array.from({ length: n }, (_, i) => getPoint(i, level * maxRadius));
                const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
                return <path key={li} d={path} fill="none" stroke="#1e2d45" strokeWidth="1" />;
            })}

            {/* Axes */}
            {labels.map((_, i) => {
                const outer = getPoint(i, maxRadius);
                return <line key={i} x1={center} y1={center} x2={outer.x} y2={outer.y} stroke="#1e2d45" strokeWidth="1" />;
            })}

            {/* Data */}
            <path d={dataPath} fill="rgba(0,229,255,0.15)" stroke="#00e5ff" strokeWidth="2" />

            {/* Labels */}
            {labels.map((d, i) => {
                const pt = getPoint(i, maxRadius + 14);
                return (
                    <text key={i} x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="middle"
                        fill="#8899aa" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="700">
                        {d.label}
                    </text>
                );
            })}
        </svg>
    );
}

export default function DashboardPage() {
    const [earnings, setEarnings] = useState(45230);

    useEffect(() => {
        const interval = setInterval(() => {
            setEarnings(e => e + Math.floor(Math.random() * 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: '60px' }}>
                {/* Header */}
                <section style={{ background: '#0d1420', borderBottom: '1px solid #1e2d45', padding: '20px 16px' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                                    <h1 style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.8rem)', fontWeight: 900, letterSpacing: '-0.01em' }}>
                                        GHOST LINK OPERATOR DASHBOARD
                                    </h1>
                                    <span className="badge badge-cyan">UNIT-734</span>
                                </div>
                                <p style={{ fontSize: '0.82rem', color: '#8899aa' }}>
                                    Welcome back, Operator. Neural link latency: <span style={{ color: '#10b981' }}>12ms</span>.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    🔄 Sync
                                </button>
                                <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444' }}>
                                    ⏻ Offline
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Cards */}
                <section style={{ padding: '16px', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" style={{ marginBottom: '20px' }}>
                        {/* Earnings */}
                        <div className="card" style={{ padding: '16px' }}>
                            <p style={{ fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Total Earnings</p>
                            <p className="mono" style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: 800, color: '#e2e8f0' }}>{earnings.toLocaleString()}</p>
                            <p style={{ fontSize: '0.72rem', color: '#00e5ff', fontWeight: 600 }}>ROBO</p>
                            <p style={{ fontSize: '0.72rem', color: '#4a5568', marginTop: '2px' }}>≈ ${(earnings * 0.274).toFixed(2)} USD</p>
                            <div style={{ marginTop: '10px', padding: '4px 8px', background: 'rgba(16,185,129,0.1)', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 600 }}>↑ +450 (24h)</span>
                            </div>
                        </div>

                        {/* Rank */}
                        <div className="card" style={{ padding: '16px' }}>
                            <p style={{ fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Operator Rank</p>
                            <p style={{ fontSize: 'clamp(0.78rem, 2.5vw, 1.1rem)', fontWeight: 800, marginBottom: '4px', lineHeight: 1.2 }}>MASTER TECH</p>
                            <p style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600, marginBottom: '10px' }}>Top 5% Global</p>
                            <p style={{ fontSize: '0.62rem', color: '#4a5568', marginBottom: '5px' }}>TO ELITE · 84%</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '84%' }} />
                            </div>
                        </div>

                        {/* Tasks */}
                        <div className="card" style={{ padding: '16px' }}>
                            <p style={{ fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Tasks Done</p>
                            <p className="mono" style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: 800 }}>1,248</p>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                <div>
                                    <p style={{ fontSize: '0.6rem', color: '#4a5568' }}>SUCCESS</p>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>98.2%</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.6rem', color: '#4a5568' }}>AVG TIME</p>
                                    <p className="mono" style={{ fontSize: '0.85rem', fontWeight: 700 }}>14m 30s</p>
                                </div>
                            </div>
                        </div>

                        {/* Network */}
                        <div className="card" style={{ padding: '16px' }}>
                            <p style={{ fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Network</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', flexShrink: 0 }} />
                                <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)', fontWeight: 800 }}>UPLINK STABLE</p>
                            </div>
                            <p style={{ fontSize: '0.62rem', color: '#4a5568', marginBottom: '5px' }}>SIGNAL STRENGTH</p>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '20px' }}>
                                {[3, 5, 7, 9, 11, 13, 15, 17].map((h, i) => (
                                    <div key={i} style={{ width: '6px', height: `${h}px`, borderRadius: '2px', background: i < 7 ? '#10b981' : '#1e2d45' }} />
                                ))}
                            </div>
                            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>99.8%</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
                        {/* Work History */}
                        <div className="card" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                                <h2 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    ⏱ Work History Log
                                </h2>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>Filter</button>
                                    <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>Export CSV</button>
                                </div>
                            </div>

                            {/* Scrollable table wrapper for mobile */}
                            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #1e2d45' }}>
                                            {['DATE / TIME', 'ROBOT UNIT', 'TASK TYPE', 'EFFICIENCY', 'EARNINGS'].map(h => (
                                                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.08em', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workHistory.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid #1e2d45' }}>
                                                <td style={{ padding: '12px 10px' }}>
                                                    <p className="mono" style={{ fontSize: '0.75rem', color: '#e2e8f0', whiteSpace: 'nowrap' }}>{row.date}</p>
                                                    <p style={{ fontSize: '0.68rem', color: '#4a5568' }}>{row.time}</p>
                                                </td>
                                                <td style={{ padding: '12px 10px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <span style={{ fontSize: '1.1rem' }}>{row.icon}</span>
                                                        <span style={{ fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{row.robot}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '12px 10px' }}>
                                                    <span style={{
                                                        padding: '3px 8px', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 600, whiteSpace: 'nowrap',
                                                        background: `${row.taskColor}20`, color: row.taskColor, border: `1px solid ${row.taskColor}40`,
                                                    }}>{row.task}</span>
                                                </td>
                                                <td style={{ padding: '12px 10px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <div style={{ width: '60px', height: '4px', background: '#1e2d45', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
                                                            <div style={{ width: `${row.efficiency}%`, height: '100%', background: row.efficiency > 95 ? '#10b981' : row.efficiency > 88 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                                                        </div>
                                                        <span className="mono" style={{ fontSize: '0.75rem', color: row.efficiency > 95 ? '#10b981' : '#f59e0b', fontWeight: 700, whiteSpace: 'nowrap' }}>{row.efficiency}%</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '12px 10px' }}>
                                                    <span className="mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10b981', whiteSpace: 'nowrap' }}>+{row.earnings} ROBO</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                <button style={{ background: 'none', border: 'none', color: '#00e5ff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
                                    VIEW FULL HISTORY →
                                </button>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Proficiency Matrix */}
                            <div className="card" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                    <h3 style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>⊙ Proficiency Matrix</h3>
                                    <span className="badge badge-cyan">OVERALL: 96%</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
                                    <RadarChart />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                    {[
                                        { label: 'Precision', value: '96%' },
                                        { label: 'Speed', value: '88%' },
                                        { label: 'Navigation', value: '99%' },
                                        { label: 'Problem Solv.', value: '92%' },
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '0.72rem', color: '#4a5568' }}>{item.label}</span>
                                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#e2e8f0' }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Last Active Unit */}
                            <div className="card" style={{ padding: '18px', overflow: 'hidden', position: 'relative' }}>
                                <p style={{ fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Last Active Unit</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Atlas-X7</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Online &amp; Ready</span>
                                </div>
                                <div style={{
                                    width: '100%', height: '90px',
                                    background: 'linear-gradient(135deg, #0d1420, #1a2535)',
                                    borderRadius: '6px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '3rem',
                                    border: '1px solid #1e2d45',
                                    marginBottom: '12px',
                                }}>🤖</div>
                                <Link href="/vr" style={{ textDecoration: 'none' }}>
                                    <button className="btn-secondary" style={{ width: '100%' }}>📡 Reconnect</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

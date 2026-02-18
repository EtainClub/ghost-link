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

            <main style={{ flex: 1, paddingTop: '80px' }}>
                {/* Header */}
                <section style={{ background: '#0d1420', borderBottom: '1px solid #1e2d45', padding: '32px 24px' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <h1 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.01em' }}>
                                        GHOST LINK OPERATOR DASHBOARD
                                    </h1>
                                    <span className="badge badge-cyan">UNIT-734</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#8899aa' }}>
                                    Welcome back, Operator. Your neural link latency is optimal at <span style={{ color: '#10b981' }}>12ms</span>.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn-secondary" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    🔄 Sync Data
                                </button>
                                <button className="btn-secondary" style={{ padding: '10px 20px', color: '#ef4444', borderColor: '#ef4444' }}>
                                    ⏻ Go Offline
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Cards */}
                <section style={{ padding: '32px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                        {/* Earnings */}
                        <div className="card" style={{ padding: '24px' }}>
                            <p style={{ fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Total Earnings</p>
                            <p className="mono" style={{ fontSize: '2rem', fontWeight: 800, color: '#e2e8f0' }}>{earnings.toLocaleString()}</p>
                            <p style={{ fontSize: '0.75rem', color: '#00e5ff', fontWeight: 600 }}>ROBO</p>
                            <p style={{ fontSize: '0.78rem', color: '#4a5568', marginTop: '4px' }}>≈ ${(earnings * 0.274).toFixed(2)} USD</p>
                            <div style={{ marginTop: '12px', padding: '6px 10px', background: 'rgba(16,185,129,0.1)', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>↑ +450 (24h)</span>
                            </div>
                        </div>

                        {/* Rank */}
                        <div className="card" style={{ padding: '24px' }}>
                            <p style={{ fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Operator Rank</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '4px' }}>MASTER TECHNICIAN</p>
                            <p style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginBottom: '12px' }}>Top 5% Global</p>
                            <p style={{ fontSize: '0.65rem', color: '#4a5568', marginBottom: '6px' }}>PROGRESS TO ELITE · 84%</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '84%' }} />
                            </div>
                        </div>

                        {/* Tasks */}
                        <div className="card" style={{ padding: '24px' }}>
                            <p style={{ fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Tasks Completed</p>
                            <p className="mono" style={{ fontSize: '2rem', fontWeight: 800 }}>1,248</p>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
                                <div>
                                    <p style={{ fontSize: '0.62rem', color: '#4a5568' }}>SUCCESS RATE</p>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>98.2%</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.62rem', color: '#4a5568' }}>AVG TIME</p>
                                    <p className="mono" style={{ fontSize: '0.9rem', fontWeight: 700 }}>14m 30s</p>
                                </div>
                            </div>
                        </div>

                        {/* Network */}
                        <div className="card" style={{ padding: '24px' }}>
                            <p style={{ fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Network Status</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                                <p style={{ fontSize: '1rem', fontWeight: 800 }}>UPLINK STABLE</p>
                            </div>
                            <p style={{ fontSize: '0.65rem', color: '#4a5568', marginBottom: '6px' }}>SIGNAL STRENGTH</p>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '20px' }}>
                                {[3, 5, 7, 9, 11, 13, 15, 17].map((h, i) => (
                                    <div key={i} style={{ width: '6px', height: `${h}px`, borderRadius: '2px', background: i < 7 ? '#10b981' : '#1e2d45' }} />
                                ))}
                            </div>
                            <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981', marginTop: '6px' }}>99.8%</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
                        {/* Work History */}
                        <div className="card" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h2 style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    ⏱ Work History Log
                                </h2>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.72rem' }}>Filter</button>
                                    <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.72rem' }}>Export CSV</button>
                                </div>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #1e2d45' }}>
                                        {['DATE / TIME', 'ROBOT UNIT', 'TASK TYPE', 'EFFICIENCY', 'EARNINGS'].map(h => (
                                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.08em', fontWeight: 700 }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {workHistory.map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #1e2d45' }}>
                                            <td style={{ padding: '14px 12px' }}>
                                                <p className="mono" style={{ fontSize: '0.78rem', color: '#e2e8f0' }}>{row.date}</p>
                                                <p style={{ fontSize: '0.7rem', color: '#4a5568' }}>{row.time}</p>
                                            </td>
                                            <td style={{ padding: '14px 12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontSize: '1.2rem' }}>{row.icon}</span>
                                                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{row.robot}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 12px' }}>
                                                <span style={{
                                                    padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontWeight: 600,
                                                    background: `${row.taskColor}20`, color: row.taskColor, border: `1px solid ${row.taskColor}40`,
                                                }}>{row.task}</span>
                                            </td>
                                            <td style={{ padding: '14px 12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ width: '80px', height: '4px', background: '#1e2d45', borderRadius: '2px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${row.efficiency}%`, height: '100%', background: row.efficiency > 95 ? '#10b981' : row.efficiency > 88 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                                                    </div>
                                                    <span className="mono" style={{ fontSize: '0.78rem', color: row.efficiency > 95 ? '#10b981' : '#f59e0b', fontWeight: 700 }}>{row.efficiency}%</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 12px' }}>
                                                <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>+{row.earnings} ROBO</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button style={{ background: 'none', border: 'none', color: '#00e5ff', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600 }}>
                                    VIEW FULL HISTORY →
                                </button>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Proficiency Matrix */}
                            <div className="card" style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>⊙ Proficiency Matrix</h3>
                                    <span className="badge badge-cyan">OVERALL: 96%</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
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
                                            <span style={{ fontSize: '0.75rem', color: '#4a5568' }}>{item.label}</span>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e2e8f0' }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Last Active Unit */}
                            <div className="card" style={{ padding: '20px', overflow: 'hidden', position: 'relative' }}>
                                <p style={{ fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Last Active Unit</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Atlas-X7</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Online & Ready</span>
                                </div>
                                <div style={{
                                    width: '100%', height: '100px',
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

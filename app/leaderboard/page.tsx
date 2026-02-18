'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const operators = [
    { rank: 1, name: 'Cipher_99', location: '', badge: 'Elite Operator', spec: 'Fine Motor Control', specColor: '#a855f7', tasks: 14203, avgTime: '4m 23s', quality: 99.8, qualityTier: 'S-Tier Quality', earnings: 2400, change: '+18% this week', avatar: '👩‍💻' },
    { rank: 2, name: 'Kyl0_Ren', location: 'Tokyo, JP', badge: '', spec: 'Navigation', specColor: '#3b82f6', tasks: 13800, avgTime: '2m 10s', quality: 98.5, qualityTier: 'A-Tier Quality', earnings: 2100, change: '+12% this week', avatar: '🧑‍🚀' },
    { rank: 3, name: 'Neura_Link', location: 'Berlin, DE', badge: '', spec: 'Inspection', specColor: '#10b981', tasks: 12500, avgTime: '6m 05s', quality: 95.0, qualityTier: 'A-Tier Quality', earnings: 1950, change: '+8% this week', avatar: '👩‍🔬' },
    { rank: 4, name: 'Robo_Cop22', location: '', badge: '', spec: 'Assembly', specColor: '#f59e0b', tasks: 11200, avgTime: '5m 40s', quality: 92.0, qualityTier: 'B-Tier Quality', earnings: 1800, change: '', avatar: '🤖' },
    { rank: 5, name: 'Sarah_Connor', location: '', badge: '', spec: 'Logistics', specColor: '#ec4899', tasks: 9800, avgTime: '3m 55s', quality: 88.0, qualityTier: 'B-Tier Quality', earnings: 1500, change: '', avatar: '👩‍🦱' },
    { rank: 6, name: 'Tech_Ninja', location: '', badge: '', spec: 'Navigation', specColor: '#3b82f6', tasks: 8745, avgTime: '4m 12s', quality: 87.5, qualityTier: 'B-Tier Quality', earnings: 1420, change: '', avatar: '🥷' },
    { rank: 7, name: 'Byte_Walker', location: '', badge: '', spec: 'Fine Motor Control', specColor: '#a855f7', tasks: 8100, avgTime: '7m 30s', quality: 78.0, qualityTier: 'C-Tier Quality', earnings: 1100, change: '', avatar: '🧑‍💻' },
    { rank: 8, name: 'GhostOp_77', location: '', badge: '', spec: 'Hazmat', specColor: '#ef4444', tasks: 7650, avgTime: '8m 00s', quality: 85.0, qualityTier: 'B-Tier Quality', earnings: 980, change: '', avatar: '👷' },
];

const categories = ['All Operators', 'Fine Motor', 'Navigation', 'Inspection', 'Logistics'];
const timeframes = ['24h', '7d', '30d'];

export default function LeaderboardPage() {
    const [activeCategory, setActiveCategory] = useState('All Operators');
    const [activeTime, setActiveTime] = useState('24h');

    const getRankStyle = (rank: number) => {
        if (rank === 1) return { background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#000' };
        if (rank === 2) return { background: 'linear-gradient(135deg, #94a3b8, #64748b)', color: '#000' };
        if (rank === 3) return { background: 'linear-gradient(135deg, #b45309, #92400e)', color: '#fff' };
        return { background: '#1e2d45', color: '#8899aa' };
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: '80px' }}>
                {/* Header */}
                <section style={{ background: '#0d1420', borderBottom: '1px solid #1e2d45', padding: '40px 24px' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span className="badge badge-green" style={{ fontSize: '0.62rem' }}>● LIVE METRICS</span>
                                    <span style={{ fontSize: '0.75rem', color: '#4a5568' }}>System Operational</span>
                                </div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                                    GLOBAL OPERATOR <span style={{ color: '#00e5ff' }}>LEADERBOARD</span>
                                </h1>
                                <p style={{ fontSize: '0.85rem', color: '#8899aa', maxWidth: '480px', lineHeight: 1.6 }}>
                                    Real-time ranking of top tele-operators contributing to the Global Neural Network. Higher rank = Higher earnings multiplier.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn-secondary" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    ↓ Export CSV
                                </button>
                                <button className="btn-primary" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    + Connect Robot
                                </button>
                            </div>
                        </div>

                        {/* Global Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '32px' }}>
                            {[
                                { label: 'TOTAL HUMAN-HOURS', value: '2,405,892', change: '+12.4%', progress: 75 },
                                { label: 'AI TRAINING PROGRESS', value: '87.4%', change: '+5.2%', sub: 'Epoch 4.2 · Phase 3/4', progress: 87 },
                                { label: 'ACTIVE ROBOTS', value: '4,102', sub: '/ 5,000 Capacity', note: 'Network load at 82%', progress: 82 },
                            ].map((stat, i) => (
                                <div key={i} className="card" style={{ padding: '24px' }}>
                                    <p style={{ fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{stat.label}</p>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
                                        <p className="mono" style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stat.value}</p>
                                        {stat.change && <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>↑ {stat.change}</span>}
                                    </div>
                                    {stat.sub && <p style={{ fontSize: '0.72rem', color: '#4a5568', marginBottom: '8px' }}>{stat.sub}</p>}
                                    {stat.note && <p style={{ fontSize: '0.72rem', color: '#10b981', marginBottom: '8px' }}>● {stat.note}</p>}
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${stat.progress}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Leaderboard Table */}
                <section style={{ padding: '32px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {categories.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                                    padding: '8px 16px', fontSize: '0.78rem', fontWeight: 600,
                                    borderRadius: '4px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                                    background: activeCategory === cat ? '#00e5ff' : 'transparent',
                                    color: activeCategory === cat ? '#000' : '#8899aa',
                                    borderColor: activeCategory === cat ? '#00e5ff' : '#1e2d45',
                                }}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {timeframes.map(t => (
                                <button key={t} onClick={() => setActiveTime(t)} style={{
                                    padding: '6px 14px', fontSize: '0.75rem', fontWeight: 600,
                                    borderRadius: '4px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                                    background: activeTime === t ? '#1e2d45' : 'transparent',
                                    color: activeTime === t ? '#e2e8f0' : '#4a5568',
                                    borderColor: '#1e2d45',
                                }}>
                                    {t}
                                </button>
                            ))}
                            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>⚙</button>
                        </div>
                    </div>

                    <div className="card" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #1e2d45', background: '#0d1420' }}>
                                    {['#', 'OPERATOR', 'SPECIALIZATION', 'TASKS COMPLETED', 'DATA QUALITY', 'EARNINGS (CREDITS)'].map(h => (
                                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.08em', fontWeight: 700 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {operators.map((op, i) => (
                                    <tr key={i} style={{
                                        borderBottom: '1px solid #1e2d45',
                                        background: op.rank <= 3 ? `rgba(0,229,255,0.02)` : 'transparent',
                                        transition: 'background 0.2s',
                                    }}
                                        onMouseEnter={e => (e.currentTarget.style.background = '#1a2535')}
                                        onMouseLeave={e => (e.currentTarget.style.background = op.rank <= 3 ? 'rgba(0,229,255,0.02)' : 'transparent')}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.82rem', fontWeight: 800,
                                                ...getRankStyle(op.rank),
                                            }}>
                                                {op.rank}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{
                                                    width: '40px', height: '40px', borderRadius: '50%',
                                                    background: '#1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '1.2rem', border: op.rank <= 3 ? '2px solid #00e5ff' : '2px solid #1e2d45',
                                                }}>
                                                    {op.avatar}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{op.name}</p>
                                                    {op.badge && <p style={{ fontSize: '0.68rem', color: '#00e5ff' }}>⊙ {op.badge}</p>}
                                                    {op.location && <p style={{ fontSize: '0.68rem', color: '#4a5568' }}>{op.location}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: '3px', fontSize: '0.72rem', fontWeight: 600,
                                                background: `${op.specColor}20`, color: op.specColor, border: `1px solid ${op.specColor}40`,
                                            }}>{op.spec}</span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <p className="mono" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{op.tasks.toLocaleString()}</p>
                                            <p style={{ fontSize: '0.68rem', color: '#4a5568' }}>Avg. {op.avgTime} / task</p>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                <div style={{ width: '60px', height: '4px', background: '#1e2d45', borderRadius: '2px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${op.quality}%`, height: '100%', background: op.quality > 95 ? '#10b981' : op.quality > 85 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                                                </div>
                                                <span className="mono" style={{ fontSize: '0.78rem', fontWeight: 700, color: op.quality > 95 ? '#10b981' : op.quality > 85 ? '#f59e0b' : '#ef4444' }}>{op.quality}%</span>
                                            </div>
                                            <p style={{ fontSize: '0.68rem', color: '#4a5568' }}>{op.qualityTier}</p>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <p className="mono" style={{ fontSize: '0.95rem', fontWeight: 800 }}>{op.earnings.toLocaleString()} <span style={{ fontSize: '0.7rem', color: '#4a5568' }}>CR</span></p>
                                            {op.change && <p style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>{op.change}</p>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #1e2d45' }}>
                            <button style={{ background: 'none', border: 'none', color: '#00e5ff', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                                Show More Operators ↓
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const recentActivity = [
    { type: 'Mission Reward', date: 'Today, 10:42 AM', amount: +125.00, icon: '↓', color: '#10b981' },
    { type: 'Mission Reward', date: 'Yesterday, 04:15 PM', amount: +98.50, icon: '↓', color: '#10b981' },
    { type: 'Withdrawal', date: 'Oct 24, 09:00 AM', amount: -2500.00, icon: '↑', color: '#ef4444' },
    { type: 'Stake Deposit', date: 'Oct 22, 11:30 AM', amount: -1000.00, icon: '↑', color: '#a855f7' },
    { type: 'Referral Bonus', date: 'Oct 20, 02:00 PM', amount: +50.00, icon: '↓', color: '#10b981' },
];

const hardwareUpgrades = [
    { name: 'Optic Sensor V2', desc: 'Enhances visual fidelity by 40%', status: 'ACTIVE', staked: 2500, maxStake: 2500, color: '#10b981' },
    { name: 'Haptic Gloves Mk.III', desc: 'Reduces latency for delicate tasks', status: 'LOCKED', staked: 1200, maxStake: 5000, color: '#f59e0b' },
    { name: 'Low-Latency Link', desc: 'Sub-20ms connection guarantee', status: 'LOCKED', staked: 0, maxStake: 8000, color: '#4a5568' },
    { name: 'Neural Sync Module', desc: 'Level 5 Clearance Required', status: 'HIDDEN', staked: 0, maxStake: 0, color: '#4a5568' },
];

export default function WalletPage() {
    const [claiming, setClaiming] = useState(false);

    const handleClaim = () => {
        setClaiming(true);
        setTimeout(() => setClaiming(false), 2000);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: '80px' }}>
                {/* Header */}
                <section style={{ background: '#0d1420', borderBottom: '1px solid #1e2d45', padding: '32px 24px' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <span style={{ color: '#00e5ff', fontSize: '0.7rem' }}>💎</span>
                                    <span style={{ fontSize: '0.7rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Finance Module</span>
                                </div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '6px' }}>Rewards & Wallet</h1>
                                <p style={{ fontSize: '0.85rem', color: '#8899aa', maxWidth: '420px' }}>
                                    Manage your earnings from remote labor sessions and stake tokens to upgrade your rig&apos;s capabilities.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn-secondary" style={{ padding: '10px 20px' }}>⏱ Export CSV</button>
                                <button className="btn-secondary" style={{ padding: '10px 20px' }}>↔ Bridge</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ padding: '32px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', marginBottom: '24px' }}>
                        {/* Main Balance Card */}
                        <div className="card" style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div>
                                    <p style={{ fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Total Balance</p>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                                        <p className="mono" style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.02em' }}>12,450.00</p>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#00e5ff' }}>LABR</span>
                                    </div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px', padding: '4px 10px', background: 'rgba(16,185,129,0.1)', borderRadius: '4px' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>↑ +12.5% vs last week</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Pending Rewards</p>
                                    <p className="mono" style={{ fontSize: '1.5rem', fontWeight: 800 }}>450.00 <span style={{ color: '#00e5ff', fontSize: '0.9rem' }}>LABR</span></p>
                                    <p style={{ fontSize: '0.72rem', color: '#4a5568', marginTop: '4px' }}>Available in 4h 20m</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn-primary" onClick={handleClaim} style={{ flex: 1, padding: '14px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    {claiming ? '✓ Claimed!' : '⚡ Claim Rewards'}
                                </button>
                                <button className="btn-secondary" style={{ padding: '14px 24px', fontSize: '0.9rem' }}>+ Deposit</button>
                            </div>
                        </div>

                        {/* Right Stats */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Staked Assets */}
                            <div className="card" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '1.2rem' }}>🔷</span>
                                        <p style={{ fontSize: '0.8rem', color: '#4a5568' }}>Staked Assets</p>
                                    </div>
                                    <span className="badge badge-green" style={{ fontSize: '0.6rem' }}>ACTIVE</span>
                                </div>
                                <p className="mono" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>5,000 <span style={{ color: '#00e5ff', fontSize: '0.9rem' }}>LABR</span></p>
                                <div className="progress-bar" style={{ marginBottom: '6px' }}>
                                    <div style={{ height: '100%', width: '45%', background: 'linear-gradient(90deg, #a855f7, #7c3aed)', borderRadius: '3px' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#4a5568' }}>
                                    <span>Next Tier: 10k</span>
                                    <span>45%</span>
                                </div>
                            </div>

                            {/* Daily Yield */}
                            <div className="card" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>📈</span>
                                    <p style={{ fontSize: '0.8rem', color: '#4a5568' }}>Est. Daily Yield</p>
                                </div>
                                <p className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '4px' }}>~32.5 <span style={{ color: '#00e5ff', fontSize: '0.9rem' }}>LABR</span></p>
                                <p style={{ fontSize: '0.72rem', color: '#4a5568' }}>Based on current hardware tier</p>
                            </div>
                        </div>
                    </div>

                    {/* Hardware Staking + Activity */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
                        {/* Hardware Staking */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h2 style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    ⚙ Hardware Staking
                                </h2>
                                <button style={{ background: 'none', border: 'none', color: '#00e5ff', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>View All Upgrades</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {hardwareUpgrades.map((hw, i) => (
                                    <div key={i} className="card" style={{ padding: '20px', opacity: hw.status === 'HIDDEN' ? 0.5 : 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                            <p style={{ fontWeight: 700, fontSize: '0.88rem' }}>{hw.name}</p>
                                            <span className={`badge ${hw.status === 'ACTIVE' ? 'badge-green' : 'badge-orange'}`} style={{ fontSize: '0.6rem' }}>
                                                {hw.status}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: '#4a5568', marginBottom: '12px' }}>{hw.desc}</p>
                                        {hw.status !== 'HIDDEN' ? (
                                            <>
                                                <p style={{ fontSize: '0.62rem', color: '#4a5568', marginBottom: '4px' }}>
                                                    {hw.status === 'ACTIVE' ? 'Staked Amount' : 'Progress'}
                                                </p>
                                                <div className="progress-bar" style={{ marginBottom: '6px' }}>
                                                    <div style={{ height: '100%', width: `${(hw.staked / hw.maxStake) * 100}%`, background: hw.color, borderRadius: '3px' }} />
                                                </div>
                                                <p className="mono" style={{ fontSize: '0.72rem', color: '#8899aa', marginBottom: '12px' }}>
                                                    {hw.staked.toLocaleString()} / {hw.maxStake.toLocaleString()} LABR
                                                </p>
                                                {hw.status === 'LOCKED' && (
                                                    <button className="btn-secondary" style={{ width: '100%', fontSize: '0.75rem', padding: '8px' }}>Stake to Unlock</button>
                                                )}
                                            </>
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '12px 0' }}>
                                                <p style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🔒</p>
                                                <p style={{ fontSize: '0.72rem', color: '#4a5568' }}>Level 5 Clearance Required</p>
                                                <p style={{ fontSize: '0.68rem', color: '#4a5568' }}>Complete 15 more missions to reveal</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                📋 Recent Activity
                            </h2>
                            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e2d45', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.62rem', color: '#4a5568', fontWeight: 700, letterSpacing: '0.08em' }}>TYPE / DATE</span>
                                    <span style={{ fontSize: '0.62rem', color: '#4a5568', fontWeight: 700, letterSpacing: '0.08em' }}>AMOUNT</span>
                                </div>
                                {recentActivity.map((act, i) => (
                                    <div key={i} style={{ padding: '14px 16px', borderBottom: i < recentActivity.length - 1 ? '1px solid #1e2d45' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `${act.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: act.color }}>
                                                {act.icon}
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '0.82rem', fontWeight: 600 }}>{act.type}</p>
                                                <p style={{ fontSize: '0.68rem', color: '#4a5568' }}>{act.date}</p>
                                            </div>
                                        </div>
                                        <p className="mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: act.color }}>
                                            {act.amount > 0 ? '+' : ''}{act.amount.toFixed(2)} <span style={{ fontSize: '0.65rem', color: '#4a5568' }}>LABR</span>
                                        </p>
                                    </div>
                                ))}
                                <div style={{ padding: '14px 16px', textAlign: 'center', borderTop: '1px solid #1e2d45' }}>
                                    <button style={{ background: 'none', border: 'none', color: '#00e5ff', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>View Full History</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

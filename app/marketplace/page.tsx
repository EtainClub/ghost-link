'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalNetworkMap from '../components/GlobalNetworkMap';
import { useState } from 'react';

const allJobs = [
    { id: '#ARB-0822', tag: 'HIGH YIELD', tagColor: 'badge-orange', title: 'Micro-Assembly', desc: 'Precision electronics integration for orbital hardware components.', reward: 150, unit: 'CRED/HR', skill: 4, robot: 'DEXTERITY-X1', latency: '12ms', signal: 5, duration: '4h 30m', category: 'Precision', change: '+2.4%', changePos: true },
    { id: '#ARB-5189', tag: 'HAZARDOUS', tagColor: 'badge-red', title: 'Hazmat Cleanup', desc: 'Containment protocol for Level 4 chemical processing facility.', reward: 80, unit: 'CRED/HR', skill: 5, robot: 'TANK-TREAD V4', latency: '24ms', signal: 4, duration: '1h 15m', category: 'Hazmat', change: '+5.1%', changePos: true, locked: true },
    { id: '#ARB-2291', tag: 'NEW', tagColor: 'badge-cyan', title: 'Domestic Sorting', desc: 'Automated logistics management for last-mile delivery operations.', reward: 45, unit: 'CRED/HR', skill: 2, robot: 'HELPER-BOT G2', latency: '45ms', signal: 3, duration: '2h 00m', category: 'Logistics', change: '-9.0%', changePos: false },
    { id: '#ARB-1104', tag: 'ACTIVE', tagColor: 'badge-green', title: 'Heavy Logistics', desc: 'Warehouse pallet management and cargo loading operations.', reward: 35, unit: 'CRED/HR', skill: 3, robot: 'ATLAS-LIFT', latency: '18ms', signal: 5, duration: '6h 00m', category: 'Logistics', change: '+1.2%', changePos: true },
    { id: '#ARB-3340', tag: 'FEATURED', tagColor: 'badge-purple', title: 'Surgical Assist', desc: 'Remote-assisted microsurgery support for rural medical facilities.', reward: 220, unit: 'CRED/HR', skill: 5, robot: 'MEDARM-PRO', latency: '8ms', signal: 5, duration: '3h 00m', category: 'Precision', change: '+8.2%', changePos: true, locked: true },
    { id: '#ARB-4421', tag: 'ACTIVE', tagColor: 'badge-green', title: 'Site Inspection', desc: 'Structural integrity survey for high-rise construction projects.', reward: 60, unit: 'CRED/HR', skill: 3, robot: 'SPOT-V4', latency: '30ms', signal: 4, duration: '5h 30m', category: 'Navigation', change: '+0.5%', changePos: true },
    { id: '#ARB-5512', tag: 'NEW', tagColor: 'badge-cyan', title: 'Elderly Care Assist', desc: 'Companion and mobility assistance for senior care facilities.', reward: 55, unit: 'CRED/HR', skill: 2, robot: 'CARE-BOT V2', latency: '35ms', signal: 4, duration: '8h 00m', category: 'Logistics', change: '+3.1%', changePos: true },
    { id: '#ARB-6678', tag: 'HIGH YIELD', tagColor: 'badge-orange', title: 'Precision Welding', desc: 'Automated arc welding for aerospace component manufacturing.', reward: 180, unit: 'CRED/HR', skill: 4, robot: 'ARM-C2', latency: '15ms', signal: 5, duration: '4h 00m', category: 'Precision', change: '+4.7%', changePos: true },
];

const categories = ['All Robots', 'Precision', 'Logistics', 'Hazmat', 'Navigation'];

function SignalBars({ count, max = 5 }: { count: number; max?: number }) {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
            {Array.from({ length: max }).map((_, i) => (
                <div key={i} style={{
                    width: '3px',
                    height: `${((i + 1) / max) * 100}%`,
                    borderRadius: '1px',
                    background: i < count ? '#10b981' : '#1e2d45',
                }} />
            ))}
        </div>
    );
}

export default function MarketplacePage() {
    const [activeCategory, setActiveCategory] = useState('All Robots');
    const [jackInJob, setJackInJob] = useState<string | null>(null);

    const filtered = activeCategory === 'All Robots'
        ? allJobs
        : allJobs.filter(j => j.category === activeCategory);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: '60px' }}>
                {/* Header */}
                <section style={{ background: '#0d1420', borderBottom: '1px solid #1e2d45', padding: '32px 16px' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div className="grid lg:grid-cols-12 gap-8 items-center">
                            {/* Left Content */}
                            <div className="lg:col-span-7">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span className="badge badge-green" style={{ fontSize: '0.62rem' }}>● LIVE PROTOCOL · 54,205 UNITS ACTIVE</span>
                                </div>
                                <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: 1.1 }}>
                                    MONETIZE YOUR<br /><span style={{ color: '#00e5ff' }}>INTELLIGENCE</span>
                                </h1>
                                <p style={{ fontSize: '0.95rem', color: '#8899aa', maxWidth: '540px', lineHeight: 1.6 }}>
                                    Remotely control high-fidelity robotic avatars. Connect to the Ghost Link network and earn real-time crypto yields for complex physical tasks.
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
                                    <Link href="/dashboard">
                                        <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>⚡ Start Earning Now</button>
                                    </Link>
                                    <Link href="/vr">
                                        <button className="btn-secondary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>View Demo →</button>
                                    </Link>
                                </div>

                                {/* Stats Ticker */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    {[
                                        { label: 'TOTAL YIELD PAID', value: '$42.8M' },
                                        { label: 'AVG HOURLY RATE', value: '45.2 CRED', highlight: true },
                                        { label: 'GLOBAL UPTIME', value: '99.98%' },
                                        { label: 'NETWORK LOAD', value: 'LOW', green: true },
                                    ].map((s, i) => (
                                        <div key={i}>
                                            <p style={{ fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>{s.label}</p>
                                            <p className="mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: s.highlight ? '#00e5ff' : s.green ? '#10b981' : '#e2e8f0' }}>{s.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Content - Featured Robot */}
                            <div className="lg:col-span-5 relative h-full min-h-[280px] lg:min-h-[400px] flex items-center justify-center">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl opacity-20 transform translate-y-10"></div>

                                {/* Robot Card */}
                                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#131316] group" style={{ maxHeight: '360px' }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

                                    {/* Image */}
                                    <img
                                        alt="Atlas-X Gen 4"
                                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoblqyZFQw45rhOXOLUMyJ-hOwvQnMTX_egnX4V1Ztm3insRgFveqTgQU3eo5eRtEWnstAvPzEWPvzf81IWPC1VUgIZRqg7Hc3qOJA-k2W7WbvbSd1knAYEVeZt2hDuiJb9dy-dvNpuzGv2oTFUBZu_xTxR2ZUvdKLpUtskIo-KRLX4lKHErxx263s5N4-IvJ1_ylmLFvQN5FKzSDBQvKodse_ELmvjHT5xbP_YiCkrFuv9HKdRBDYQsy_U3zU6cyBeDIEHsEB8gM"
                                    />

                                    {/* HUD Elements */}
                                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                                        <span className="mono" style={{ background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.2)' }}>● ONLINE</span>
                                        <span className="mono" style={{ background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}>BAT: 94%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Job Market */}
                <section style={{ padding: '32px 16px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ width: '4px', height: '20px', background: '#00e5ff', borderRadius: '2px', display: 'inline-block' }} />
                            Live Job Market
                        </h2>
                        <p style={{ fontSize: '0.78rem', color: '#4a5568', marginTop: '4px' }}>Real-time control opportunities available for immediate connection.</p>
                    </div>

                    {/* Filters - scrollable on mobile */}
                    <div style={{ overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', minWidth: 'max-content' }}>
                            <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem', flexShrink: 0 }}>⚙ Filters</button>
                            {categories.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                                    padding: '6px 14px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    borderRadius: '4px',
                                    border: '1px solid',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: activeCategory === cat ? '#00e5ff' : 'transparent',
                                    color: activeCategory === cat ? '#000' : '#8899aa',
                                    borderColor: activeCategory === cat ? '#00e5ff' : '#1e2d45',
                                    flexShrink: 0,
                                }}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((job, i) => (
                            <div key={i} className="card" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '1.5rem' }}>
                                            {job.category === 'Precision' ? '🦾' : job.category === 'Hazmat' ? '☣️' : job.category === 'Navigation' ? '🚁' : '📦'}
                                        </span>
                                        <div>
                                            <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{job.title}</p>
                                            <p style={{ fontSize: '0.7rem', color: '#4a5568' }}>{job.robot} · <span className={`badge ${job.tagColor}`} style={{ fontSize: '0.6rem' }}>{job.tag}</span></p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p className="mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00e5ff' }}>{job.reward}.0</p>
                                        <p style={{ fontSize: '0.65rem', color: '#4a5568' }}>CRED/HR</p>
                                        <p style={{ fontSize: '0.7rem', color: job.changePos ? '#10b981' : '#ef4444' }}>{job.changePos ? '↑' : '↓'} {job.change}</p>
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '14px', lineHeight: 1.5 }}>{job.desc}</p>

                                <div style={{ display: 'flex', gap: '20px', marginBottom: '14px' }}>
                                    <div>
                                        <p style={{ fontSize: '0.62rem', color: '#4a5568', marginBottom: '2px' }}>LATENCY</p>
                                        <p className="mono" style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600 }}>{job.latency}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.62rem', color: '#4a5568', marginBottom: '2px' }}>SIGNAL</p>
                                        <SignalBars count={job.signal} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.62rem', color: '#4a5568', marginBottom: '2px' }}>EST. DUR.</p>
                                        <p className="mono" style={{ fontSize: '0.82rem', color: '#8899aa' }}>{job.duration}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {job.locked ? (
                                        <button className="btn-secondary" style={{ flex: 1, opacity: 0.6 }}>🔒 Requires Cert</button>
                                    ) : (
                                        <Link href="/vr" style={{ textDecoration: 'none', flex: 1 }}>
                                            <button className="btn-jack" onClick={() => setJackInJob(job.id)}>⚡ Jack In</button>
                                        </Link>
                                    )}
                                    <button className="btn-secondary" style={{ padding: '10px 14px' }}>🔖</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <button className="btn-secondary" style={{ padding: '12px 32px' }}>View Full Marketplace ↓</button>
                    </div>
                </section>
            </main>

            {/* Global Node Map */}
            <GlobalNetworkMap />

            <Footer />
        </div>
    );
}

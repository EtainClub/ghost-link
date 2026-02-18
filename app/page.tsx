'use client';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

const stats = [
  { label: 'Total Yield Paid', value: '$42.8M', sub: '+2.4% (30d)' },
  { label: 'Avg Hourly Rate', value: '45.2 CRED', sub: '≈ $12.40 USD', highlight: true },
  { label: 'Global Uptime', value: '99.98%', sub: 'Tier-1 Protocol' },
  { label: 'Network Load', value: 'LOW', sub: 'Optimal / Stable', green: true },
];

const features = [
  {
    icon: '🤖',
    title: 'Tactile Telepresence',
    desc: 'High-fidelity haptic feedback lets you feel every surface, texture, and resistance through your robotic avatar in real time.',
  },
  {
    icon: '⚡',
    title: 'Edge-Sync Protocol',
    desc: 'Sub-20ms latency relay network ensures your commands reach the robot before you even finish thinking them.',
  },
  {
    icon: '💎',
    title: 'Yield Optimization',
    desc: 'Smart task routing matches your skill profile to the highest-paying jobs available across the global fleet.',
  },
];

const liveJobs = [
  { id: '#ARB-0822', tag: 'HIGH YIELD', tagColor: 'badge-orange', title: 'Micro-Assembly', desc: 'Precision electronics integration for orbital hardware.', reward: '150 CRED/HR', skill: 4, robot: 'DEXTERITY-X1', latency: '12ms', signal: 5 },
  { id: '#ARB-5189', tag: 'ACTIVE', tagColor: 'badge-green', title: 'Hazmat Cleanup', desc: 'Containment protocol for Level 4 chemical processing.', reward: '80 CRED/HR', skill: 5, robot: 'TANK-TREAD V4', latency: '24ms', signal: 4, locked: true },
  { id: '#ARB-2291', tag: 'NEW', tagColor: 'badge-cyan', title: 'Domestic Sorting', desc: 'Automated logistics management for last-mile delivery.', reward: '45 CRED/HR', skill: 2, robot: 'HELPER-BOT G2', latency: '45ms', signal: 3 },
];



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

export default function HomePage() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(c => (c + 1) % 1000);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="grid-bg" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '80px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <div style={{ marginBottom: '20px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
              ● PROTOCOL V2.4 LIVE
            </span>
          </div>

          <h1 className="hero-title" style={{ marginBottom: '16px', color: '#fff' }}>
            THE FUTURE OF LABOR:<br />
            <span style={{ color: '#00e5ff' }} className="text-glow-cyan">HUMAN PRECISION,</span><br />
            <span style={{ color: '#a855f7' }}>ROBOTIC SCALE</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#8899aa', maxWidth: '520px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            The world&apos;s first decentralized labor protocol. Remotely control high-fidelity robotic avatars and earn real-time crypto yields from anywhere on Earth.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/marketplace" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '0.9rem' }}>
                ⚡ Start Earning Now
              </button>
            </Link>
            <Link href="/vr" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ padding: '14px 32px', fontSize: '0.9rem' }}>
                View Demo →
              </button>
            </Link>
          </div>

          <p style={{ marginTop: '24px', fontSize: '0.7rem', color: '#4a5568', letterSpacing: '0.1em' }}>
            NEURAL LICENSED · ESTABLISHED 2025
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#0d1420', borderTop: '1px solid #1e2d45', borderBottom: '1px solid #1e2d45', padding: '28px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{stat.label}</p>
              <p className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: stat.highlight ? '#00e5ff' : stat.green ? '#10b981' : '#e2e8f0', marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '0.72rem', color: '#4a5568' }}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Engineered for Precision
        </h2>
        <div style={{ width: '40px', height: '3px', background: '#00e5ff', marginBottom: '40px', borderRadius: '2px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ padding: '28px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px', color: '#00e5ff' }}>{f.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#8899aa', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Marketplace Preview */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Live Marketplace</h2>
            <div style={{ width: '40px', height: '3px', background: '#00e5ff', borderRadius: '2px' }} />
            <p style={{ fontSize: '0.8rem', color: '#4a5568', marginTop: '8px' }}>Current high-demand tasks on the Ghost Link Network.</p>
          </div>
          <Link href="/marketplace" style={{ textDecoration: 'none', fontSize: '0.8rem', color: '#00e5ff', fontWeight: 600 }}>
            VIEW ALL 1,429 JOBS →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {liveJobs.map((job, i) => (
            <div key={i} className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className={`badge ${job.tagColor}`}>{job.tag}</span>
                <span className="mono" style={{ fontSize: '0.7rem', color: '#4a5568' }}>{job.id}</span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>{job.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '16px', lineHeight: 1.5 }}>{job.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <p style={{ fontSize: '0.65rem', color: '#4a5568', marginBottom: '2px' }}>REWARDS</p>
                  <p className="mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00e5ff' }}>{job.reward}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.65rem', color: '#4a5568', marginBottom: '2px' }}>SKILL LEVEL</p>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} style={{ width: '12px', height: '4px', borderRadius: '2px', background: j < job.skill ? '#a855f7' : '#1e2d45' }} />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.72rem', color: '#4a5568' }}>
                <span>LATENCY: <span className="mono" style={{ color: '#10b981' }}>{job.latency}</span></span>
                <span>SIGNAL: <SignalBars count={job.signal} /></span>
              </div>
              {job.locked ? (
                <button className="btn-secondary" style={{ width: '100%', opacity: 0.6 }}>🔒 Requires Cert</button>
              ) : (
                <Link href="/marketplace" style={{ textDecoration: 'none' }}>
                  <button className="btn-jack">⚡ Jack In</button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Global Node Map */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px' }}>Global Node Density</h2>
        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#4a5568', marginBottom: '32px' }}>
          Real-time visualization of the Ghost Link Relay Network and active robotic nodes across 142 cities.
        </p>

        <div style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          background: '#0a101a',
          borderRadius: '12px',
          border: '1px solid #1e2d45',
          overflow: 'hidden',
          boxShadow: '0 0 40px rgba(0,0,0,0.5)',
        }}>
          {/* Grid Background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(#1e2d45 1px, transparent 1px), linear-gradient(90deg, #1e2d45 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.1,
          }} />

          {/* Map Visualization */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>

            {/* Live Badge */}
            <div style={{
              position: 'absolute', top: '20px', left: '20px', zIndex: 10,
            }}>
              <span className="badge badge-green" style={{
                fontSize: '0.7rem', padding: '6px 12px',
                background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)'
              }}>
                ● LIVE: {(4104 + (counter % 12)).toLocaleString()} ACTIVE NODES
              </span>
            </div>

            {/* Legend Box */}
            <div style={{
              position: 'absolute', bottom: '20px', right: '20px', zIndex: 10,
              background: 'rgba(8, 12, 20, 0.9)', border: '1px solid #1e2d45',
              borderRadius: '6px', padding: '12px 16px',
              display: 'flex', flexDirection: 'column', gap: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              minWidth: '220px',
              backdropFilter: 'blur(4px)'
            }}>
              {[
                { label: 'RELAY 84 · TOKYO: ONLINE', color: '#00e5ff' },
                { label: 'RELAY 60 · LONDON: ONLINE', color: '#00e5ff' },
                { label: 'RELAY 12 · NYC: CONGESTED', color: '#f59e0b' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                  <span className="mono" style={{ fontSize: '0.65rem', color: '#8899aa', letterSpacing: '0.05em' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* SVG Illustration */}
            <svg width="100%" height="100%" viewBox="0 0 1000 400" >
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 229, 255, 0.15)" />
                  <stop offset="100%" stopColor="rgba(0, 229, 255, 0)" />
                </radialGradient>
                <filter id="blur-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                </filter>
              </defs>

              {/* Coverage Zones (Blobs) */}
              <g filter="url(#blur-glow)">
                {/* North America */}
                <circle cx="250" cy="180" r="80" fill="#00e5ff" opacity="0.1" />
                <ellipse cx="280" cy="220" rx="60" ry="80" fill="#00e5ff" opacity="0.1" />

                {/* Europe */}
                <circle cx="500" cy="150" r="60" fill="#00e5ff" opacity="0.1" />

                {/* Asia */}
                <ellipse cx="780" cy="180" rx="120" ry="80" fill="#00e5ff" opacity="0.1" />

                {/* Australia */}
                <circle cx="850" cy="320" r="40" fill="#00e5ff" opacity="0.1" />
              </g>

              {/* Nodes and Connections */}
              {[
                { x: 260, y: 190, name: 'New York' },
                { x: 490, y: 160, name: 'London' },
                { x: 540, y: 280, name: 'Nairobi', color: '#f59e0b' },
                { x: 740, y: 180, name: 'Seoul' },
                { x: 860, y: 330, name: 'Sydney' },
              ].map((node, i) => (
                <g key={i}>
                  {/* Connection Lines (Fake) */}
                  {i < 4 && (
                    <line x1={node.x} y1={node.y} x2={[490, 540, 740, 860][i]} y2={[160, 280, 180, 330][i]}
                      stroke="rgba(0,229,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                  )}

                  {/* Node */}
                  <circle cx={node.x} cy={node.y} r="4" fill={node.color || '#00e5ff'} className="node-pulse" />
                  <circle cx={node.x} cy={node.y} r="12" fill="none" stroke={node.color || '#00e5ff'} strokeWidth="1" opacity="0.3" />

                  {/* Label tag */}
                  <g transform={`translate(${node.x - 30}, ${node.y + 15})`}>
                    <rect width="60" height="20" rx="4" fill="rgba(8, 12, 20, 0.8)" stroke={node.color ? `${node.color}40` : '#1e2d45'} strokeWidth="1" />
                    <text x="30" y="14" fill="#e2e8f0" fontSize="10" fontWeight="600" textAnchor="middle" style={{ fontFamily: 'var(--font-geist-mono)' }}>{node.name}</text>
                  </g>
                </g>
              ))}
            </svg>
          </div>

          <style jsx>{`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.7); }
              70% { transform: scale(1); opacity: 0.7; box-shadow: 0 0 0 10px rgba(0, 229, 255, 0); }
              100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(0, 229, 255, 0); }
            }
            .node-pulse {
              animation: pulse 2s infinite;
              transform-origin: center;
              transform-box: fill-box;
            }
          `}</style>
        </div>
      </section>

      <Footer />
    </div>
  );
}

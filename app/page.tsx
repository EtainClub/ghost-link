'use client';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import GlobalNetworkMap from './components/GlobalNetworkMap';

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
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gray-900/40 z-10" /> {/* Reduced opacity for better visibility */}
          <div
            className="w-full h-full bg-cover bg-center animate-cinematic-pan opacity-100"
            style={{
              backgroundImage: `url('/hero-bg.png')`
            }}
          />
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/60 to-transparent z-10" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-4xl mx-auto mt-10">

          <div className="mb-8 animate-fade-in-up">
            <span className="tracking-[0.3em] text-[0.8rem] font-bold text-cyan-400 opacity-80 border-b border-cyan-500/30 pb-2">
              GHOST LINK
            </span>
          </div>

          <h1 className="hero-title mb-8 text-white animate-fade-in-up delay-100 drop-shadow-2xl flex flex-col gap-2">
            <span className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              HUMAN-ROBOT<br />LABOR PLATFORM
            </span>
            <span className="text-xl md:text-2xl font-light tracking-widest text-[#a855f7] mt-2 uppercase opacity-90">
              Human Intelligence, Physical Labor
            </span>
          </h1>

          <div className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-24 leading-relaxed animate-fade-in-up delay-200 font-light">
            <p className="mb-4">
              Ghost Link is an open-source experiment to design the <strong className="text-white font-bold">UI/UX of the inevitable</strong>.
            </p>
            <p className="text-base text-gray-400">
              We know that one day, millions of humans will remotely pilot robots from their living rooms—doing hazardous, skilled, or logistical work via high-fidelity neural links.
            </p>
            <p className="mt-4 font-mono text-cyan-400 text-sm tracking-wide opacity-80">
              &quot;Uber for Androids.&quot; &quot;DoorDash for Drones.&quot;
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center animate-fade-in-up delay-300">
            <Link href="/marketplace" style={{ textDecoration: 'none' }}>
              <button className="btn-primary py-4 px-8 text-base shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]">
                ⚡ Start Earning Now
              </button>
            </Link>
            <Link href="/vr" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary py-4 px-8 text-base backdrop-blur-sm bg-white/5 border-white/20 hover:bg-white/10">
                View Demo →
              </button>
            </Link>
          </div>

          <p className="mt-12 text-xs text-gray-500 tracking-[0.2em] animate-fade-in-up delay-300">
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
      {/* Global Network Map Section */}
      <GlobalNetworkMap />


      <Footer />
    </div>
  );
}

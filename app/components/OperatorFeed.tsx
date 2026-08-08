'use client';
import { useEffect, useState } from 'react';

/**
 * The job cards are spec sheets. This is the same data with the person left in.
 * All operators are invented — see the SPECULATIVE PROTOTYPE banner.
 */
const operators = [
    {
        id: '#ARB-0822',
        name: 'MARIA R.',
        age: 34,
        home: 'Quezon City',
        robot: 'DEXTERITY-X1',
        site: 'Osaka',
        quote: 'My daughter is asleep in the next room. I am assembling a satellite bracket in Osaka.',
        earned: 412,
        uptime: '4h 12m',
        latency: '12ms',
        tone: '#00e5ff',
    },
    {
        id: '#ARB-4421',
        name: 'DAVID O.',
        age: 51,
        home: 'Lagos',
        robot: 'SPOT-V4',
        site: 'Reykjavík',
        quote: 'Twenty years I climbed scaffolding. My knees are done. The machine climbs now, I still survey.',
        earned: 188,
        uptime: '6h 40m',
        latency: '38ms',
        tone: '#a855f7',
    },
    {
        id: '#ARB-5189',
        name: 'PRIYA N.',
        age: 29,
        home: 'Chennai',
        robot: 'TANK-TREAD V4',
        site: 'Level-4 containment, undisclosed',
        quote: 'The chemical spill is two metres from my hands. My hands are eight thousand kilometres away.',
        earned: 640,
        uptime: '1h 15m',
        latency: '24ms',
        tone: '#f59e0b',
    },
];

function useTicker(base: number, step: number) {
    const [n, setN] = useState(base);
    useEffect(() => {
        const t = setInterval(() => setN(v => v + step), 4000);
        return () => clearInterval(t);
    }, [step]);
    return n;
}

function OperatorCard({ op }: { op: (typeof operators)[number] }) {
    const earned = useTicker(op.earned, 1);

    return (
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div
                        aria-hidden
                        style={{
                            width: '38px', height: '38px', flexShrink: 0, borderRadius: '6px',
                            border: `1px solid ${op.tone}`, background: `${op.tone}18`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1rem',
                        }}
                    >
                        👻
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontWeight: 700, fontSize: '0.92rem', letterSpacing: '0.02em' }}>
                            {op.name} <span style={{ color: '#4a5568', fontWeight: 400 }}>· {op.age}</span>
                        </p>
                        <p style={{ fontSize: '0.72rem', color: '#8899aa' }}>{op.home}</p>
                    </div>
                </div>
                <span className="mono" style={{ fontSize: '0.65rem', color: '#4a5568', flexShrink: 0 }}>{op.id}</span>
            </div>

            {/* the body, and where it is */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.7rem', color: '#4a5568' }}>
                <span className="mono" style={{ color: '#8899aa' }}>{op.home}</span>
                <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${op.tone}, transparent)` }} />
                <span className="mono" style={{ color: op.tone }}>{op.latency}</span>
                <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${op.tone})` }} />
                <span className="mono" style={{ color: '#8899aa', textAlign: 'right' }}>{op.robot}</span>
            </div>
            <p style={{ fontSize: '0.68rem', color: '#4a5568', marginTop: '-8px', textAlign: 'right' }}>
                operating in {op.site}
            </p>

            <blockquote style={{ fontSize: '0.88rem', color: '#c7d2de', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `2px solid ${op.tone}`, paddingLeft: '14px' }}>
                “{op.quote}”
            </blockquote>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1e2d45', paddingTop: '12px', marginTop: 'auto' }}>
                <div>
                    <p style={{ fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>Earned today</p>
                    <p className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#00e5ff' }}>{earned} CRED</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>Link held</p>
                    <p className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>{op.uptime}</p>
                </div>
            </div>
        </div>
    );
}

export default function OperatorFeed() {
    return (
        <section style={{ padding: '60px 16px 0', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span className="signal-dot" style={{ background: '#10b981' }} />
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Now piloting
                    </h2>
                </div>
                <div style={{ width: '40px', height: '3px', background: '#10b981', borderRadius: '2px' }} />
                <p style={{ fontSize: '0.8rem', color: '#4a5568', marginTop: '10px' }}>
                    Three of the 31,204 people currently renting out their hands.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {operators.map(op => <OperatorCard key={op.id} op={op} />)}
            </div>
        </section>
    );
}

'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const facts = [
    { label: 'The company', value: 'Does not exist.' },
    { label: 'The token', value: 'Does not exist.' },
    { label: 'The robots', value: 'Do not exist. Yet.' },
    { label: 'The interface', value: 'You are looking at it.' },
];

export default function SimFrame() {
    // `open` can only become true from a click, so the portal never runs during SSR.
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <>
            {/* Top strip — the frame around the fiction */}
            <button
                onClick={() => setOpen(true)}
                aria-label="What is Ghost Link?"
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    width: '100%', height: 'var(--simframe-h)',
                    background: 'repeating-linear-gradient(135deg, rgba(168,85,247,0.10) 0 10px, rgba(0,229,255,0.06) 10px 20px)',
                    borderBottom: '1px solid rgba(168,85,247,0.25)',
                    color: '#c4b5fd', cursor: 'pointer', border: 'none',
                    fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden',
                }}
            >
                <span aria-hidden style={{ color: '#a855f7' }}>▸</span>
                <span className="hidden sm:inline">Speculative prototype · Year 2041 · All data simulated</span>
                <span className="sm:hidden">Year 2041 · Simulated</span>
                <span style={{
                    color: '#00e5ff', borderBottom: '1px dotted rgba(0,229,255,0.5)', paddingBottom: '1px',
                }}>
                    What is this?
                </span>
            </button>

            {/* Portalled to <body>: the navbar's backdrop-filter would otherwise
                become the containing block and clip this fixed overlay. */}
            {open && createPortal(
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 200,
                        background: 'rgba(3, 6, 12, 0.88)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
                        overflowY: 'auto',
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="What is Ghost Link"
                        className="card"
                        style={{ maxWidth: '640px', width: '100%', padding: '32px', borderColor: 'rgba(168,85,247,0.35)', margin: 'auto' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                            <span className="badge badge-purple">Design Fiction</span>
                            <button
                                onClick={() => setOpen(false)}
                                aria-label="Close"
                                style={{ background: 'none', border: 'none', color: '#4a5568', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}
                            >
                                ✕
                            </button>
                        </div>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.2 }}>
                            This is the dashboard for a job<br />that doesn&apos;t exist yet.
                        </h2>

                        <p style={{ fontSize: '0.9rem', color: '#8899aa', lineHeight: 1.7, marginBottom: '24px' }}>
                            One day millions of people will pilot robot bodies from their living rooms — doing
                            hazardous, skilled, or logistical work through a link. The hardware isn&apos;t here.
                            The economy isn&apos;t here. <strong style={{ color: '#e2e8f0' }}>So we&apos;re building the interface first</strong>,
                            in the open, so that when it arrives we set the standard instead of inheriting one.
                        </p>

                        <div style={{ display: 'grid', gap: '1px', background: '#1e2d45', border: '1px solid #1e2d45', borderRadius: '6px', overflow: 'hidden', marginBottom: '24px' }}>
                            {facts.map(f => (
                                <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '10px 14px', background: '#0d1420' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.label}</span>
                                    <span className="mono" style={{ fontSize: '0.75rem', color: '#00e5ff', textAlign: 'right' }}>{f.value}</span>
                                </div>
                            ))}
                        </div>

                        <p style={{ fontSize: '0.8rem', color: '#4a5568', lineHeight: 1.6, marginBottom: '24px' }}>
                            Every number on this site is invented. No wallet connects to anything. Nothing here
                            takes your money, because there is nothing here to buy. Treat it as a set — and help
                            us design what happens on it.
                        </p>

                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <a href="https://github.com/EtainClub/ghost-link" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <button className="btn-primary">Fork this future</button>
                            </a>
                            <button className="btn-secondary" onClick={() => setOpen(false)}>Keep exploring</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

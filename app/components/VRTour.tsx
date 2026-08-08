'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ghostlink.vrtour';

/**
 * The VR page is the strongest asset on the site and the least legible one.
 * Four sentences turn "busy sci-fi HUD" into "I understand what I am looking at".
 * `spot` is a viewport-relative box the overlay cuts a hole around.
 */
const steps: { title: string; body: string; spot: React.CSSProperties | null }[] = [
    {
        title: 'This is not a video.',
        body: 'You are looking through a machine that is somewhere else. Everything on this screen is a readout from a body you do not own.',
        spot: null,
    },
    {
        title: 'These bars are touch.',
        body: 'Four sensors per hand, redrawn constantly. When the gripper closes on something, this is how you find out what it feels like.',
        spot: { top: '27%', left: '0.5%', width: '11%', height: '46%' },
    },
    {
        title: 'That number is distance.',
        body: 'Latency is the gap between deciding and doing. At 12ms you can solder. At 300ms you break what you touch — the whole protocol exists to keep that number small.',
        spot: { top: '2%', left: '1%', width: '30%', height: '16%' },
    },
    {
        title: 'The red button really stops it.',
        body: 'A person on the other end may be standing next to two hundred kilos of actuator. Emergency stop is the one control that must never be pretty, hidden, or slow.',
        spot: { bottom: '4%', right: '2%', width: '30%', height: '22%' },
    },
];

export default function VRTour() {
    const [step, setStep] = useState<number | null>(null);

    useEffect(() => {
        let done = null;
        try { done = window.localStorage.getItem(STORAGE_KEY); } catch { /* private mode */ }
        if (!done) setStep(0);
    }, []);

    const close = () => {
        try { window.localStorage.setItem(STORAGE_KEY, 'seen'); } catch { /* private mode */ }
        setStep(null);
    };

    const next = () => {
        if (step === null) return;
        if (step + 1 >= steps.length) { close(); return; }
        setStep(step + 1);
    };

    useEffect(() => {
        if (step === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    if (step === null) return null;

    const s = steps[step];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center"
            style={{ background: 'rgba(3,6,12,0.72)', backdropFilter: 'blur(2px)' }}
            onClick={next}
        >
            {/* highlight the thing being talked about */}
            {s.spot && (
                <div
                    aria-hidden
                    style={{
                        position: 'absolute', ...s.spot,
                        border: '1px solid rgba(0,229,255,0.8)',
                        borderRadius: '10px',
                        boxShadow: '0 0 0 9999px rgba(3,6,12,0.55), 0 0 30px rgba(0,229,255,0.4) inset',
                        pointerEvents: 'none',
                    }}
                />
            )}

            <div
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={s.title}
                style={{
                    position: 'relative', zIndex: 2,
                    width: '100%', maxWidth: '520px',
                    margin: '0 16px 8vh',
                    padding: '26px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,229,255,0.3)',
                    background: 'rgba(8,12,20,0.97)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                }}
            >
                <div style={{ display: 'flex', gap: '6px', marginBottom: '18px' }}>
                    {steps.map((_, i) => (
                        <span
                            key={i}
                            style={{
                                height: '2px', flex: 1, borderRadius: '1px',
                                background: i <= step ? '#00e5ff' : '#1e2d45',
                                transition: 'background 0.3s',
                            }}
                        />
                    ))}
                </div>

                <p className="mono" style={{ fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.2em', marginBottom: '10px' }}>
                    ORIENTATION {step + 1} / {steps.length}
                </p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.01em', fontFamily: "'Inter', sans-serif" }}>
                    {s.title}
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#8899aa', lineHeight: 1.7, marginBottom: '22px', fontFamily: "'Inter', sans-serif" }}>
                    {s.body}
                </p>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button className="btn-primary" onClick={next} style={{ padding: '10px 22px' }}>
                        {step + 1 === steps.length ? 'Take control' : 'Next'}
                    </button>
                    <button
                        onClick={close}
                        style={{ background: 'none', border: 'none', color: '#4a5568', cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '0.05em' }}
                    >
                        Skip orientation
                    </button>
                </div>
            </div>
        </div>
    );
}

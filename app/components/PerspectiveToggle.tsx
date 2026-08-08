'use client';
import { useState } from 'react';

type View = 'utopia' | 'dystopia';

const readings = [
    {
        metric: '45.2 CRED / hr',
        label: 'Average rate',
        utopia: 'Maria earns 6.2× her local wage without leaving the city her family lives in.',
        dystopia: '22% of what the on-site worker in Rotterdam was paid. He was let go last year.',
    },
    {
        metric: '99.98% uptime',
        label: 'Network availability',
        utopia: 'Nobody has to die in the hazardous places anymore. Send the machine instead.',
        dystopia: 'A person is now an endpoint with a 24-hour shift rotation and a latency SLA.',
    },
    {
        metric: '12 ms',
        label: 'Relay latency',
        utopia: 'Distance stopped deciding who gets the work.',
        dystopia: 'What vanished was never the border. It was the wage floor.',
    },
    {
        metric: '1.4 PB / day',
        label: 'Training data captured',
        utopia: 'Every hour a human works, the machines get better at not needing one.',
        dystopia: 'Every hour you work, you are paid to train your replacement.',
    },
];

const theme = {
    utopia: { accent: '#10b981', dim: 'rgba(16,185,129,0.10)', edge: 'rgba(16,185,129,0.30)', icon: '🌱', word: 'Utopia' },
    dystopia: { accent: '#ef4444', dim: 'rgba(239,68,68,0.10)', edge: 'rgba(239,68,68,0.30)', icon: '🕳', word: 'Dystopia' },
} as const;

/**
 * The repo asks people to *debate* this future. This is the debate, as a control:
 * identical invented numbers, two honest readings of them.
 */
export default function PerspectiveToggle() {
    const [view, setView] = useState<View>('utopia');
    const t = theme[view];

    return (
        <section style={{ padding: '60px 16px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
                <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                        The same numbers, two futures
                    </h2>
                    <div style={{ width: '40px', height: '3px', background: t.accent, borderRadius: '2px', transition: 'background 0.35s' }} />
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', marginTop: '10px', maxWidth: '520px', lineHeight: 1.6 }}>
                        Nothing below changes when you flip the switch. Only what it means.
                    </p>
                </div>

                {/* The switch */}
                <div
                    role="group"
                    aria-label="Interpretation"
                    style={{ display: 'flex', border: '1px solid #1e2d45', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}
                >
                    {(['utopia', 'dystopia'] as const).map(v => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            aria-pressed={view === v}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '10px 20px', cursor: 'pointer', border: 'none',
                                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                                background: view === v ? theme[v].dim : 'transparent',
                                color: view === v ? theme[v].accent : '#4a5568',
                                boxShadow: view === v ? `inset 0 -2px 0 ${theme[v].accent}` : 'none',
                                transition: 'all 0.25s',
                            }}
                        >
                            <span aria-hidden>{theme[v].icon}</span> {theme[v].word}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1px', background: '#1e2d45', border: `1px solid ${t.edge}`, borderRadius: '8px', overflow: 'hidden', transition: 'border-color 0.35s' }}>
                {readings.map(r => (
                    <div
                        key={r.metric}
                        className="reading-row"
                        style={{ background: '#0d1420', padding: '20px 22px', display: 'flex', gap: '24px', alignItems: 'center' }}
                    >
                        <div style={{ minWidth: '150px', flexShrink: 0 }}>
                            <p className="mono" style={{ fontSize: '1rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '2px' }}>{r.metric}</p>
                            <p style={{ fontSize: '0.62rem', color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.label}</p>
                        </div>
                        {/* key on view so the text re-mounts and fades in on every flip */}
                        <p
                            key={view}
                            className="animate-fade-in-up"
                            style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#c7d2de', borderLeft: `2px solid ${t.accent}`, paddingLeft: '18px' }}
                        >
                            {view === 'utopia' ? r.utopia : r.dystopia}
                        </p>
                    </div>
                ))}
            </div>

            <p style={{ fontSize: '0.85rem', color: '#8899aa', marginTop: '22px', lineHeight: 1.7, maxWidth: '640px' }}>
                Both readings are already in this repository. Which one the interface encourages is a
                design decision — made by whoever shows up to make it.{' '}
                <a
                    href="https://github.com/EtainClub/ghost-link/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#00e5ff', textDecoration: 'none', borderBottom: '1px dotted rgba(0,229,255,0.5)' }}
                >
                    Argue with us →
                </a>
            </p>

            <style jsx>{`
                @media (max-width: 640px) {
                    .reading-row {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 12px !important;
                    }
                    .reading-row p {
                        padding-left: 14px;
                    }
                }
            `}</style>
        </section>
    );
}

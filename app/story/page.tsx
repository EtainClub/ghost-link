'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Beat = {
    time: string;
    place: string;
    title: string;
    body: string;
    hud?: { label: string; value: string; tone?: string }[];
    tone: string;
};

/**
 * One invented day. The rest of the site explains the system; this page is
 * supposed to make you feel what a shift inside it costs and pays.
 */
const beats: Beat[] = [
    {
        time: '06:40',
        place: 'Quezon City — her bedroom',
        title: 'The alarm is not for a commute',
        body: 'Maria wakes before her daughter. The rig is already on the desk: a headset, two haptic gloves with a worn seam on the right thumb, and a router she pays extra for. The commute is four steps.',
        tone: '#8899aa',
    },
    {
        time: '07:02',
        place: 'Link established — Osaka, Bay Facility 4',
        title: 'She opens her eyes somewhere else',
        body: 'The handshake takes eleven seconds. Then a room she has never physically entered resolves around her: fluorescent light, a conveyor, a tray of satellite brackets waiting for hands that can feel.',
        hud: [
            { label: 'LATENCY', value: '12ms', tone: '#10b981' },
            { label: 'HAPTIC SYNC', value: '99.8%', tone: '#00e5ff' },
            { label: 'RATE', value: '150 CRED/HR', tone: '#00e5ff' },
        ],
        tone: '#00e5ff',
    },
    {
        time: '09:30',
        place: 'Reassigned — Prudhoe Bay, Alaska',
        title: 'The routing engine moves her 6,000 km',
        body: 'A pipeline sensor disagrees with itself and the local model refuses to guess. She is the highest-rated match with acceptable latency. She accepts before she has finished reading the brief — the queue does not wait, and neither does the rate.',
        hud: [
            { label: 'LATENCY', value: '58ms', tone: '#f59e0b' },
            { label: 'AMBIENT', value: '−31°C', tone: '#8899aa' },
            { label: 'RATE', value: '210 CRED/HR', tone: '#00e5ff' },
        ],
        tone: '#f59e0b',
    },
    {
        time: '12:00',
        place: 'Quezon City — her kitchen',
        title: 'She takes the headset off and her hands are still cold',
        body: 'They are not cold. The gloves ran a thermal profile for two hours and her nervous system believed it. She eats lunch with her daughter, who asks where she went this morning. Maria says Alaska. Her daughter says okay.',
        tone: '#a855f7',
    },
    {
        time: '15:14',
        place: 'Osaka — back on the line',
        title: 'A bracket cracks under 0.4 N too much grip',
        body: 'The packet loss was 40 milliseconds long. The consequence is physical, and it is in the record with her name on it. Proficiency drops 0.03. The interface shows the number before it shows the incident.',
        hud: [
            { label: 'PROFICIENCY', value: '−0.03', tone: '#ef4444' },
            { label: 'INCIDENT', value: 'LOGGED', tone: '#ef4444' },
            { label: 'RANK', value: '#412 → #438', tone: '#f59e0b' },
        ],
        tone: '#ef4444',
    },
    {
        time: '18:50',
        place: 'Osaka — end of shift window',
        title: 'Everything she did today becomes training data',
        body: 'Every grip, hesitation and correction is labelled and fed upstream. The task she rescued this morning will need a human three percent less often next quarter. She is paid for the hour and, invisibly, for the obsolescence.',
        hud: [
            { label: 'CAPTURED', value: '4.2 TB', tone: '#a855f7' },
            { label: 'AUTONOMY GAIN', value: '+0.4%', tone: '#a855f7' },
        ],
        tone: '#a855f7',
    },
    {
        time: '21:00',
        place: 'Quezon City — logged out',
        title: '612 CRED. Her hands shake for about ten minutes.',
        body: 'It is more than her mother earned in a week, in a city she never had to leave. It is also less than the man in Rotterdam earned for the same work, in a year when he still had it. Both of those sentences are true at once, and the interface only shows her one of them.',
        hud: [
            { label: 'EARNED', value: '612 CRED', tone: '#10b981' },
            { label: 'LINKED', value: '9h 41m', tone: '#8899aa' },
        ],
        tone: '#10b981',
    },
];

function Beat({ beat, index }: { beat: Beat; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Reduced motion is handled in CSS below, so this only guards ancient engines.
        if (typeof IntersectionObserver === 'undefined') {
            const t = setTimeout(() => setSeen(true), 0);
            return () => clearTimeout(t);
        }
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
            { rootMargin: '0px 0px -12% 0px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="story-beat"
            style={{
                display: 'flex', gap: '28px', position: 'relative',
                opacity: seen ? 1 : 0,
                transform: seen ? 'none' : 'translateY(24px)',
                transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                transitionDelay: `${Math.min(index, 2) * 60}ms`,
            }}
        >
            {/* time rail */}
            <div className="story-rail" style={{ width: '86px', flexShrink: 0, textAlign: 'right', position: 'relative' }}>
                <p className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: beat.tone }}>{beat.time}</p>
                <span
                    aria-hidden
                    style={{
                        position: 'absolute', right: '-9px', top: '6px',
                        width: '9px', height: '9px', borderRadius: '50%',
                        background: beat.tone, boxShadow: `0 0 12px ${beat.tone}`,
                    }}
                />
            </div>

            <div style={{ paddingBottom: '56px', minWidth: 0 }}>
                <p style={{ fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {beat.place}
                </p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.35, marginBottom: '12px', letterSpacing: '-0.01em' }}>
                    {beat.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#8899aa', lineHeight: 1.8, maxWidth: '560px' }}>
                    {beat.body}
                </p>

                {beat.hud && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '18px' }}>
                        {beat.hud.map(h => (
                            <div
                                key={h.label}
                                style={{
                                    border: '1px solid #1e2d45', borderRadius: '5px',
                                    background: '#0d1420', padding: '8px 14px',
                                }}
                            >
                                <p style={{ fontSize: '0.55rem', color: '#4a5568', letterSpacing: '0.14em', marginBottom: '3px' }}>{h.label}</p>
                                <p className="mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: h.tone ?? '#e2e8f0' }}>{h.value}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function StoryPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: 'var(--nav-h)' }}>
                {/* Header */}
                <section style={{ background: '#0d1420', borderBottom: '1px solid #1e2d45', padding: '56px 16px' }}>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        <span className="badge badge-purple" style={{ marginBottom: '18px' }}>One shift · 2041</span>
                        <h1 style={{ fontSize: 'clamp(1.9rem, 6vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '16px 0' }}>
                            A day in the hands<br />of <span style={{ color: '#00e5ff' }}>Operator #4,412</span>
                        </h1>
                        <p style={{ fontSize: '1rem', color: '#8899aa', lineHeight: 1.8, maxWidth: '600px' }}>
                            Every other page here shows the system. This one shows a person inside it —
                            Maria R., 34, Quezon City. She is invented. The shift is not implausible.
                        </p>
                    </div>
                </section>

                {/* Timeline */}
                <section style={{ padding: '56px 16px 0' }}>
                    <div className="story-timeline" style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
                        {/* the thread of the day */}
                        <span
                            aria-hidden
                            className="story-thread"
                            style={{
                                position: 'absolute', left: '90px', top: '6px', bottom: '40px', width: '1px',
                                background: 'linear-gradient(to bottom, #8899aa, #00e5ff, #f59e0b, #a855f7, #ef4444, #10b981)',
                                opacity: 0.35,
                            }}
                        />
                        {beats.map((b, i) => <Beat key={b.time} beat={b} index={i} />)}
                    </div>
                </section>

                {/* Close */}
                <section style={{ padding: '20px 16px 72px' }}>
                    <div
                        style={{
                            maxWidth: '760px', margin: '0 auto', padding: '36px',
                            borderRadius: '12px', border: '1px solid #1e2d45',
                            background: 'linear-gradient(to bottom, rgba(168,85,247,0.08), transparent)',
                        }}
                    >
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '14px', lineHeight: 1.4 }}>
                            Nothing in that day required new physics.
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: '#8899aa', lineHeight: 1.8, marginBottom: '26px' }}>
                            It required an interface: one that decides what Maria sees first, what it
                            praises her for, and which of the two true sentences at 21:00 it puts on the
                            screen. That interface does not exist yet. It is in this repository, unfinished.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <Link href="/vr" style={{ textDecoration: 'none' }}>
                                <button className="btn-primary" style={{ padding: '12px 24px' }}>See her shift →</button>
                            </Link>
                            <a href="https://github.com/EtainClub/ghost-link/issues" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <button className="btn-secondary" style={{ padding: '12px 24px' }}>Design it differently</button>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* global: these class names live in the Beat child component,
                which styled-jsx's per-component scoping would not reach */}
            <style jsx global>{`
                @media (prefers-reduced-motion: reduce) {
                    .story-beat {
                        opacity: 1 !important;
                        transform: none !important;
                        transition: none !important;
                    }
                }
                @media (max-width: 640px) {
                    .story-beat {
                        gap: 18px;
                    }
                    .story-rail {
                        width: 54px;
                    }
                    .story-thread {
                        left: 58px;
                    }
                }
            `}</style>
        </div>
    );
}

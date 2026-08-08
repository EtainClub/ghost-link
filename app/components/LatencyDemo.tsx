'use client';
import { useEffect, useRef, useState } from 'react';

type Sample = { t: number; x: number; y: number };

const links = [
    { ms: 12, label: 'Seoul → Osaka', note: 'Fibre relay. You can thread a needle.' },
    { ms: 90, label: 'Manila → Rotterdam', note: 'Transpacific. Your hands learn to wait.' },
    { ms: 1300, label: 'Earth → Moon', note: 'This is why nobody welds on the Moon.' },
];

/**
 * The whole concept in one interaction: your input is here, the body is not.
 * The gripper replays your pointer exactly `latency` milliseconds late.
 */
export default function LatencyDemo() {
    const box = useRef<HTMLDivElement>(null);
    const hand = useRef<HTMLDivElement>(null);
    const ghost = useRef<HTMLDivElement>(null);
    const line = useRef<SVGLineElement>(null);

    const buffer = useRef<Sample[]>([]);
    const lastPointer = useRef(0);
    const latency = useRef(links[0].ms);
    const [activeLink, setActiveLink] = useState(0);
    const [drift, setDrift] = useState(0);

    useEffect(() => { latency.current = links[activeLink].ms; }, [activeLink]);

    useEffect(() => {
        const el = box.current;
        if (!el) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf = 0;
        let driftAt = 0;

        const push = (x: number, y: number, t: number) => {
            buffer.current.push({ t, x, y });
            // keep a little more history than the slowest link needs
            const cutoff = t - 2000;
            while (buffer.current.length > 2 && buffer.current[0].t < cutoff) buffer.current.shift();
        };

        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            if (x < 0 || x > 100 || y < 0 || y > 100) return;
            lastPointer.current = performance.now();
            push(x, y, lastPointer.current);
        };

        const sampleAt = (t: number): Sample | null => {
            const b = buffer.current;
            if (!b.length) return null;
            if (t <= b[0].t) return b[0];
            for (let i = b.length - 1; i >= 0; i--) {
                if (b[i].t <= t) {
                    const next = b[i + 1];
                    if (!next) return b[i];
                    const k = (t - b[i].t) / (next.t - b[i].t || 1);
                    return { t, x: b[i].x + (next.x - b[i].x) * k, y: b[i].y + (next.y - b[i].y) * k };
                }
            }
            return b[0];
        };

        const tick = () => {
            const now = performance.now();

            // No pointer for a while (or a touch device just sitting there)? Keep the link alive.
            if (now - lastPointer.current > 2200) {
                const a = now / 1000;
                push(50 + Math.sin(a * 0.9) * 30, 50 + Math.sin(a * 1.37 + 1) * 26, now);
            }

            const live = sampleAt(now);
            const late = sampleAt(now - latency.current);

            if (live && hand.current) {
                hand.current.style.left = `${live.x}%`;
                hand.current.style.top = `${live.y}%`;
            }
            if (late && ghost.current) {
                ghost.current.style.left = `${late.x}%`;
                ghost.current.style.top = `${late.y}%`;
            }
            if (live && late && line.current) {
                line.current.setAttribute('x1', String(live.x));
                line.current.setAttribute('y1', String(live.y));
                line.current.setAttribute('x2', String(late.x));
                line.current.setAttribute('y2', String(late.y));
            }
            if (live && late && now - driftAt > 120) {
                driftAt = now;
                setDrift(Math.hypot(live.x - late.x, live.y - late.y));
            }

            raf = requestAnimationFrame(tick);
        };

        if (reduced) {
            // Static pose, placed on the next frame: the gap stays legible, nothing moves.
            raf = requestAnimationFrame(() => {
                line.current?.setAttribute('x1', '35');
                line.current?.setAttribute('y1', '45');
                line.current?.setAttribute('x2', '62');
                line.current?.setAttribute('y2', '58');
                setDrift(Math.hypot(62 - 35, 58 - 45));
            });
        } else {
            window.addEventListener('pointermove', onMove, { passive: true });
            raf = requestAnimationFrame(tick);
        }

        return () => {
            window.removeEventListener('pointermove', onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    const link = links[activeLink];

    return (
        <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
            <div
                ref={box}
                aria-hidden
                style={{
                    position: 'relative',
                    height: '190px',
                    borderRadius: '10px',
                    border: '1px solid rgba(0,229,255,0.2)',
                    background: 'rgba(8,12,20,0.55)',
                    backdropFilter: 'blur(6px)',
                    overflow: 'hidden',
                }}
                className="grid-bg"
            >
                {/* gap between intent and action */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    <line ref={line} stroke="rgba(168,85,247,0.5)" strokeWidth="0.4" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
                </svg>

                {/* you */}
                <div ref={hand} style={{ position: 'absolute', top: '45%', left: '35%', width: '26px', height: '26px', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', inset: 0, border: '1px solid #00e5ff', borderRadius: '50%', opacity: 0.7 }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '5px', height: '5px', marginTop: '-2.5px', marginLeft: '-2.5px', borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 10px #00e5ff' }} />
                </div>

                {/* the body, elsewhere */}
                <div ref={ghost} style={{ position: 'absolute', top: '58%', left: '62%', width: '38px', height: '38px', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', inset: 0, border: '2px solid #a855f7', borderRadius: '4px', opacity: 0.9, clipPath: 'polygon(0 0, 34% 0, 34% 12%, 12% 12%, 12% 88%, 34% 88%, 34% 100%, 0 100%, 0 0, 100% 0, 100% 100%, 66% 100%, 66% 88%, 88% 88%, 88% 12%, 66% 12%, 66% 0, 100% 0)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '4px', height: '4px', marginTop: '-2px', marginLeft: '-2px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 12px #a855f7' }} />
                </div>

                {/* readouts */}
                <div className="mono" style={{ position: 'absolute', top: '10px', left: '12px', fontSize: '0.6rem', letterSpacing: '0.12em', color: '#00e5ff' }}>
                    ● YOUR HAND
                </div>
                <div className="mono" style={{ position: 'absolute', top: '10px', right: '12px', fontSize: '0.6rem', letterSpacing: '0.12em', color: '#a855f7', textAlign: 'right' }}>
                    THE GRIPPER ●
                </div>
                <div className="mono" style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '0.6rem', letterSpacing: '0.1em', color: '#4a5568' }}>
                    DRIFT <span style={{ color: drift > 12 ? '#f59e0b' : '#10b981' }}>{drift.toFixed(1)}%</span>
                </div>
                <div className="mono" style={{ position: 'absolute', bottom: '10px', right: '12px', fontSize: '0.6rem', letterSpacing: '0.1em', color: '#4a5568' }}>
                    {link.label}
                </div>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#8899aa', textAlign: 'center', margin: '14px 0 10px', lineHeight: 1.6 }}>
                Move your cursor. <strong style={{ color: '#e2e8f0' }}>{link.note}</strong>
            </p>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {links.map((l, i) => (
                    <button
                        key={l.ms}
                        onClick={() => setActiveLink(i)}
                        aria-pressed={i === activeLink}
                        className="mono"
                        style={{
                            padding: '6px 14px', borderRadius: '4px', cursor: 'pointer',
                            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
                            border: `1px solid ${i === activeLink ? '#00e5ff' : '#1e2d45'}`,
                            background: i === activeLink ? 'rgba(0,229,255,0.12)' : 'transparent',
                            color: i === activeLink ? '#00e5ff' : '#8899aa',
                            transition: 'all 0.2s',
                        }}
                    >
                        {l.ms >= 1000 ? `${(l.ms / 1000).toFixed(1)}s` : `${l.ms}ms`}
                    </button>
                ))}
            </div>
        </div>
    );
}

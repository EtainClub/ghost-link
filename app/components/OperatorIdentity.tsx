'use client';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'ghostlink.operator';

/* --- tiny external store so the Navbar updates the moment boot finishes --- */
let cached: string | null | undefined = undefined;
const listeners = new Set<() => void>();

function read(): string | null {
    if (cached === undefined) {
        try { cached = window.localStorage.getItem(STORAGE_KEY); } catch { cached = null; }
    }
    return cached;
}

function subscribe(fn: () => void) {
    listeners.add(fn);
    return () => { listeners.delete(fn); };
}

function commit(id: string) {
    cached = id;
    try { window.localStorage.setItem(STORAGE_KEY, id); } catch { /* private mode */ }
    listeners.forEach(l => l());
}

/**
 * Persistent operator id for this visitor.
 * `SSR` on the server, `null` on a client that has not been assigned one yet.
 */
export function useOperatorIdState(): string | null | 'SSR' {
    return useSyncExternalStore(subscribe, read, () => 'SSR' as const);
}

/** The id to display, or `null` while unknown. */
export function useOperatorId(): string | null {
    const v = useOperatorIdState();
    return v === 'SSR' ? null : v;
}

const bootLines = [
    'ESTABLISHING NEURAL LINK',
    'CALIBRATING HAPTIC PROFILE',
    'MAPPING MOTOR CORTEX',
    'QUERYING OPERATOR REGISTRY',
];

export default function OperatorIdentity() {
    const stored = useOperatorIdState();
    const [step, setStep] = useState(0);
    const [assigned, setAssigned] = useState<string | null>(null);
    const [closing, setClosing] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    // Boot only for a client with no id yet. `assigned` latches the overlay open
    // through the reveal, after which `stored` is no longer null.
    const booting = !dismissed && (stored === null || (assigned !== null && stored === assigned));

    const finish = useCallback(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        setClosing(true);
        setTimeout(() => setDismissed(true), 500);
    }, []);

    const started = useRef(false);
    useEffect(() => {
        if (stored !== null || started.current) return;
        started.current = true;

        const id = `OP-${Math.floor(1000 + Math.random() * 9000)}`;

        // Reveal one line at a time, then stamp the id and fade out.
        bootLines.forEach((_, i) => {
            timers.current.push(setTimeout(() => setStep(i + 1), 420 * (i + 1)));
        });
        timers.current.push(setTimeout(() => {
            setAssigned(id);
            commit(id);
        }, 420 * bootLines.length + 250));
        timers.current.push(setTimeout(() => {
            setClosing(true);
            timers.current.push(setTimeout(() => setDismissed(true), 500));
        }, 420 * bootLines.length + 2100));
    }, [stored]);

    // Cleanup lives on its own so the mid-sequence `stored` change (from commit)
    // does not cancel the timers that are still running the reveal.
    useEffect(() => () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    }, []);

    useEffect(() => {
        if (!booting) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter') finish(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [booting, finish]);

    if (!booting) return null;

    return (
        <div
            onClick={finish}
            role="status"
            aria-live="polite"
            style={{
                position: 'fixed', inset: 0, zIndex: 300,
                background: '#05080f',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px', cursor: 'pointer',
                opacity: closing ? 0 : 1,
                transition: 'opacity 0.5s ease',
            }}
        >
            {/* scanline wash */}
            <div aria-hidden style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.25) 50%)',
                backgroundSize: '100% 3px',
            }} />

            <div className="mono" style={{ width: '100%', maxWidth: '440px', fontSize: '0.78rem', lineHeight: 2 }}>
                <p style={{ color: '#4a5568', letterSpacing: '0.2em', marginBottom: '20px', fontSize: '0.65rem' }}>
                    GHOST LINK // NEURAL BRIDGE v4.02
                </p>

                {bootLines.map((line, i) => (
                    <p key={line} style={{ color: '#8899aa', opacity: step > i ? 1 : 0, transition: 'opacity 0.2s' }}>
                        <span style={{ color: '#00e5ff' }}>&gt;</span> {line}
                        <span style={{ color: '#1e2d45' }}> {'.'.repeat(Math.max(2, 30 - line.length))} </span>
                        <span style={{ color: '#10b981' }}>OK</span>
                    </p>
                ))}

                {assigned && (
                    <div style={{ marginTop: '24px', borderTop: '1px solid #1e2d45', paddingTop: '20px' }}>
                        <p style={{ color: '#4a5568', fontSize: '0.65rem', letterSpacing: '0.2em', marginBottom: '6px' }}>
                            OPERATOR ID ASSIGNED
                        </p>
                        <p style={{ color: '#00e5ff', fontSize: '2rem', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.2 }}>
                            {assigned}
                        </p>
                        <p style={{ color: '#a855f7', marginTop: '8px' }}>
                            Welcome back, ghost. A body is waiting.
                        </p>
                    </div>
                )}

                <p style={{ color: '#1e2d45', fontSize: '0.65rem', marginTop: '32px', letterSpacing: '0.15em' }}>
                    CLICK ANYWHERE TO SKIP
                </p>
            </div>
        </div>
    );
}

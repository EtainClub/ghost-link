'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import GhostLogo from './GhostLogo';
import SimFrame from './SimFrame';
import { useOperatorId } from './OperatorIdentity';

const navLinks = [
    { href: '/story', label: 'Story' },
    { href: '/how-to', label: 'How-To' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/contributors', label: 'Contributors' },
    { href: '/wallet', label: 'Wallet' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const operatorId = useOperatorId();

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            background: 'rgba(8, 12, 20, 0.96)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #1e2d45',
        }}>
            {/* Frames everything below it as fiction — see docs/CONCEPT-IMPROVEMENT.md */}
            <SimFrame />

            {/* Main bar */}
            <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--navbar-h)' }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
                    <GhostLogo width={28} height={28} />
                    <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                        GHOST <span style={{ color: '#00e5ff' }}>LINK</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2px', flexShrink: 1, minWidth: 0 }}>
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} style={{
                            padding: '6px 9px',
                            fontSize: '0.74rem',
                            whiteSpace: 'nowrap',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            color: pathname === link.href ? '#00e5ff' : '#8899aa',
                            borderBottom: pathname === link.href ? '2px solid #00e5ff' : '2px solid transparent',
                            transition: 'all 0.2s',
                        }}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right side - desktop */}
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    {/* redundant with the operator badge once space gets tight */}
                    <div className="hidden xl:flex" style={{ alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#8899aa', whiteSpace: 'nowrap' }}>
                        <span style={{ color: '#10b981', fontSize: '0.7rem' }}>●</span>
                        <span className="mono" style={{ color: '#00e5ff', fontWeight: 700 }}>OPTIMAL</span>
                        <span className="mono" style={{ color: '#4a5568' }}>12ms</span>
                    </div>
                    {/* The visitor is not a customer — they are operator #N in this fiction */}
                    <div
                        title="Your operator id for this simulation. Stored locally, nowhere else."
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '5px 12px', borderRadius: '4px',
                            border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)',
                        }}
                    >
                        <span style={{ fontSize: '0.7rem' }}>👻</span>
                        <span className="mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: operatorId ? '#00e5ff' : '#4a5568' }}>
                            {operatorId ?? 'LINKING…'}
                        </span>
                    </div>
                    <Link href="/vr" style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                            <span>⚡</span> Jack In
                        </button>
                    </Link>
                </div>

                {/* Mobile: Jack In + Hamburger */}
                <div className="flex md:hidden" style={{ alignItems: 'center', gap: '8px' }}>
                    <Link href="/vr" style={{ textDecoration: 'none' }}>
                        <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>⚡</span> Jack In
                        </button>
                    </Link>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            background: 'transparent',
                            border: '1px solid #1e2d45',
                            borderRadius: '4px',
                            padding: '6px 10px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                        }}
                        aria-label="Toggle menu"
                    >
                        <span style={{ display: 'block', width: '18px', height: '2px', background: mobileOpen ? '#00e5ff' : '#8899aa', transition: 'all 0.2s', transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
                        <span style={{ display: 'block', width: '18px', height: '2px', background: mobileOpen ? 'transparent' : '#8899aa', transition: 'all 0.2s' }} />
                        <span style={{ display: 'block', width: '18px', height: '2px', background: mobileOpen ? '#00e5ff' : '#8899aa', transition: 'all 0.2s', transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileOpen && (
                <div className="flex md:hidden" style={{
                    flexDirection: 'column',
                    background: 'rgba(8, 12, 20, 0.98)',
                    borderTop: '1px solid #1e2d45',
                    padding: '8px 0 16px',
                }}>
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: 'block',
                                padding: '12px 20px',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                color: pathname === link.href ? '#00e5ff' : '#8899aa',
                                borderLeft: pathname === link.href ? '3px solid #00e5ff' : '3px solid transparent',
                                transition: 'all 0.2s',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ padding: '12px 20px 4px', borderTop: '1px solid #1e2d45', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <span className="mono" style={{ fontSize: '0.78rem', color: operatorId ? '#00e5ff' : '#4a5568', fontWeight: 700 }}>
                            👻 {operatorId ?? 'LINKING…'}
                        </span>
                        <span className="mono" style={{ fontSize: '0.72rem', color: '#4a5568' }}>
                            <span style={{ color: '#10b981' }}>●</span> OPTIMAL · 12ms
                        </span>
                    </div>
                </div>
            )}
        </nav>
    );
}

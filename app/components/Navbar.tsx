'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
    { href: '/how-to', label: 'How-To' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/wallet', label: 'Wallet' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            background: 'rgba(8, 12, 20, 0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #1e2d45',
            height: '60px',
            display: 'flex', alignItems: 'center',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <div style={{
                        width: '28px', height: '28px', borderRadius: '6px',
                        background: 'linear-gradient(135deg, #00e5ff, #0ea5e9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontWeight: 900, color: '#000',
                    }}>G</div>
                    <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>
                        GHOST <span style={{ color: '#00e5ff' }}>LINK</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: '4px' }}>
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} style={{
                            padding: '6px 14px',
                            fontSize: '0.82rem',
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

                {/* Right side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#8899aa' }}>
                        <span style={{ color: '#10b981', fontSize: '0.7rem' }}>●</span>
                        <span className="mono" style={{ color: '#00e5ff', fontWeight: 700 }}>OPTIMAL</span>
                        <span className="mono" style={{ color: '#4a5568' }}>12ms</span>
                    </div>
                    <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                        Connect Wallet
                    </button>
                    <Link href="/vr" style={{ textDecoration: 'none' }}>
                        <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>⚡</span> Jack In
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

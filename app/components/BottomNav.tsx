'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home', icon: '🏠' },
        { href: '/marketplace', label: 'Jobs', icon: '💼' },
        { href: '/dashboard', label: 'Dash', icon: '📊' },
        { href: '/leaderboard', label: 'Rank', icon: '🏆' },
        { href: '/wallet', label: 'Wallet', icon: '💳' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe" style={{
            background: 'rgba(8, 12, 20, 0.95)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid #1e2d45',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
            paddingBottom: 'env(safe-area-inset-bottom, 20px)',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '60px' }}>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            textDecoration: 'none', width: '100%', height: '100%',
                            color: isActive ? '#00e5ff' : '#8899aa',
                            transition: 'all 0.2s',
                        }}>
                            <span style={{ fontSize: '1.2rem', marginBottom: '2px', filter: isActive ? 'drop-shadow(0 0 8px rgba(0,229,255,0.6))' : 'none' }}>
                                {link.icon}
                            </span>
                            <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 700 : 500, letterSpacing: '0.02em' }}>
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

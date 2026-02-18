import Link from 'next/link';
import GhostLogo from './GhostLogo';

export default function Footer() {
    return (
        <footer style={{
            background: '#080c14',
            borderTop: '1px solid #1e2d45',
            padding: '40px 16px 28px',
            marginTop: 'auto',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8" style={{ marginBottom: '32px' }}>
                    {/* Brand */}
                    <div className="col-span-2 sm:col-span-1">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <GhostLogo width={24} height={24} />
                            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>GHOST <span style={{ color: '#00e5ff' }}>LINK</span></span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#4a5568', lineHeight: 1.6, maxWidth: '200px' }}>
                            Decentralized robotics labor protocol. Empowering human operators to earn through telepresence.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a5568', marginBottom: '12px' }}>Platform</p>
                        {['Marketplace', 'Contributors', 'Fleet Stats', 'Governance', 'Whitepaper'].map(item => (
                            <Link key={item} href={item === 'Contributors' ? '/contributors' : '#'} style={{ display: 'block', fontSize: '0.82rem', color: '#8899aa', textDecoration: 'none', marginBottom: '8px', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#00e5ff')}
                                onMouseLeave={e => (e.currentTarget.style.color = '#8899aa')}>
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Operators */}
                    <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a5568', marginBottom: '12px' }}>Operators</p>
                        {['Documentation', 'Haptic Standards', 'Yield Math', 'Developer API'].map(item => (
                            <Link key={item} href="#" style={{ display: 'block', fontSize: '0.82rem', color: '#8899aa', textDecoration: 'none', marginBottom: '8px' }}>
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Connect */}
                    <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a5568', marginBottom: '12px' }}>Connect</p>
                        {['X / Twitter', 'Discord', 'Telegram', 'Governance'].map(item => (
                            <Link key={item} href="#" style={{ display: 'block', fontSize: '0.82rem', color: '#8899aa', textDecoration: 'none', marginBottom: '8px' }}>
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #1e2d45', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <p style={{ fontSize: '0.75rem', color: '#4a5568' }}>© 2026 Ghost Link — Labor Protocol. All rights reserved.</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {['Privacy Policy', 'Terms of Service', 'Legal Notice'].map(item => (
                            <Link key={item} href="#" style={{ fontSize: '0.75rem', color: '#4a5568', textDecoration: 'none' }}>{item}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

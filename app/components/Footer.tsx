import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            background: '#080c14',
            borderTop: '1px solid #1e2d45',
            padding: '48px 24px 32px',
            marginTop: 'auto',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <div style={{
                                width: '24px', height: '24px', borderRadius: '5px',
                                background: 'linear-gradient(135deg, #00e5ff, #0ea5e9)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '12px', fontWeight: 900, color: '#000',
                            }}>G</div>
                            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>GHOST <span style={{ color: '#00e5ff' }}>LINK</span></span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#4a5568', lineHeight: 1.6, maxWidth: '200px' }}>
                            Decentralized robotics labor protocol. Empowering human operators to earn through telepresence.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a5568', marginBottom: '12px' }}>Platform</p>
                        {['Marketplace', 'Fleet Stats', 'Governance', 'Whitepaper'].map(item => (
                            <Link key={item} href="#" style={{ display: 'block', fontSize: '0.82rem', color: '#8899aa', textDecoration: 'none', marginBottom: '8px', transition: 'color 0.2s' }}
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

                <div style={{ borderTop: '1px solid #1e2d45', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: '#4a5568' }}>© 2026 Ghost Link — Labor Protocol. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {['Privacy Policy', 'Terms of Service', 'Legal Notice'].map(item => (
                            <Link key={item} href="#" style={{ fontSize: '0.75rem', color: '#4a5568', textDecoration: 'none' }}>{item}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

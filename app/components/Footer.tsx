import Link from 'next/link';
import GhostLogo from './GhostLogo';

const REPO = 'https://github.com/EtainClub/ghost-link';

// Internal routes only. Anything that would have been a dead "#" is either a real
// GitHub destination or is not listed at all.
const explore = [
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'A day in the job', href: '/story' },
    { label: 'How it works', href: '/how-to' },
    { label: 'The VR shift', href: '/vr' },
    { label: 'Architects', href: '/contributors' },
];

const build = [
    { label: 'Source', href: REPO },
    { label: 'Open an issue from 2041', href: `${REPO}/issues/new/choose` },
    { label: 'Contributing guide', href: `${REPO}/blob/main/CONTRIBUTING.md` },
    { label: 'Improvement plan', href: `${REPO}/blob/main/docs/CONCEPT-IMPROVEMENT.md` },
];

export default function Footer() {
    return (
        <footer style={{
            background: '#080c14',
            borderTop: '1px solid #1e2d45',
            padding: '40px 16px 28px',
            marginTop: 'auto',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8" style={{ marginBottom: '32px' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <GhostLogo width={24} height={24} />
                            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>GHOST <span style={{ color: '#00e5ff' }}>LINK</span></span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#4a5568', lineHeight: 1.7, maxWidth: '260px' }}>
                            An open-source prototype of the interface for telepresence labour.
                            No company, no token, no robots — just the screen they would need.
                        </p>
                    </div>

                    {/* Explore */}
                    <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a5568', marginBottom: '12px' }}>Explore</p>
                        {explore.map(item => (
                            <Link key={item.label} href={item.href} style={{ display: 'block', fontSize: '0.82rem', color: '#8899aa', textDecoration: 'none', marginBottom: '8px' }}>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Build */}
                    <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a5568', marginBottom: '12px' }}>Build it with us</p>
                        {build.map(item => (
                            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.82rem', color: '#8899aa', textDecoration: 'none', marginBottom: '8px' }}>
                                {item.label} ↗
                            </a>
                        ))}
                        <a href={REPO} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '8px' }}>
                            <button className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.78rem' }}>
                                ⑂ Fork this future
                            </button>
                        </a>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #1e2d45', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <p style={{ fontSize: '0.75rem', color: '#4a5568' }}>
                        Design fiction, released under MIT. Every figure on this site is invented.
                    </p>
                    <p className="mono" style={{ fontSize: '0.72rem', color: '#1e2d45', letterSpacing: '0.2em' }}>
                        GHOST LINK // END OF LINE
                    </p>
                </div>
            </div>
        </footer>
    );
}

'use client';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function HowToPage() {
    return (
        <div className="bg-primary text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden" style={{ background: '#080c14', color: '#e2e8f0' }}>

            {/* Custom Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080c14]/80 backdrop-blur-md" style={{ borderBottom: '1px solid #1e2d45', background: 'rgba(8, 12, 20, 0.8)' }}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', background: '#00e5ff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                                GL
                            </div>
                            <h1 className="text-xl font-bold tracking-tighter uppercase italic" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.05em', fontStyle: 'italic', color: '#fff' }}>
                                Ghost <span style={{ color: '#00e5ff' }}>Link</span>
                            </h1>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-400" style={{ display: 'flex', gap: '32px', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8899aa' }}>
                        <a href="#concept" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-cyan">Concept</a>
                        <a href="#workflow" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-cyan">Workflow</a>
                        <a href="#data-cycle" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-cyan">Data Cycle</a>
                        <a href="#economics" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-cyan">Economics</a>
                    </div>

                    <div className="flex items-center gap-4" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }}></span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>System Online</span>
                        </div>
                        <Link href="/dashboard">
                            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>
                                Connect Operator
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="grid-bg">
                {/* Hero Section: Concept Visualization */}
                <section id="concept" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="hero-grid">
                        <div className="space-y-8">
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.3)', color: '#00e5ff', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
                                <span style={{ fontSize: '1rem' }}>🧠</span> The Synergy Matrix
                            </div>

                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '24px' }}>
                                Human Intelligence <br />
                                <span style={{ background: 'linear-gradient(to right, #00e5ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+ Robotic Physicality</span>
                            </h2>

                            <p style={{ fontSize: '1.1rem', color: '#8899aa', lineHeight: 1.6, maxWidth: '540px', marginBottom: '32px' }}>
                                Bridging the gap between AI limitations and physical complexity. Ghost Link separates the "Ghost" (Neural Human Input) from the "Shell" (Autonomous Hardware), creating a high-fidelity teleoperation link for Industry 4.0.
                            </p>

                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: '200px', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(4px)' }}>
                                    <h4 style={{ color: '#00e5ff', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        🤖 The Shell
                                    </h4>
                                    <p style={{ fontSize: '0.9rem', color: '#8899aa' }}>Industrial robot body with localized autonomous routine processing.</p>
                                </div>
                                <div style={{ flex: 1, minWidth: '200px', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(4px)' }}>
                                    <h4 style={{ color: '#a855f7', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        👻 The Ghost
                                    </h4>
                                    <p style={{ fontSize: '0.9rem', color: '#8899aa' }}>Human operator providing high-level cognitive solving for edge cases.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: '-4px', background: 'linear-gradient(to right, rgba(0,229,255,0.2), rgba(168,85,247,0.2))', borderRadius: '16px', filter: 'blur(20px)', opacity: 0.5 }}></div>
                            <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '16px', background: '#0d1420', border: '1px solid #1e2d45', overflow: 'hidden' }}>
                                {/* Visual Placeholder for VR HUD */}
                                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, #0d1420 100%)', zIndex: 10 }}></div>

                                {/* HUD Elements */}
                                <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '0.7rem', color: 'rgba(0,229,255,0.6)', fontFamily: 'monospace', lineHeight: 1.5 }}>
                                    <p>LATENCY: 12ms</p>
                                    <p>SYNC: 99.8%</p>
                                    <p>NODE: GX-900</p>
                                </div>

                                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <p style={{ fontSize: '0.65rem', color: '#4a5568', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Active Linkage</p>
                                        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>NEURAL-BRIDGE-v4.02</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px', height: '20px', alignItems: 'flex-end' }}>
                                        <div style={{ width: '4px', height: '16px', background: '#00e5ff', animation: 'pulse 1s infinite' }}></div>
                                        <div style={{ width: '4px', height: '12px', background: 'rgba(0,229,255,0.6)' }}></div>
                                        <div style={{ width: '4px', height: '20px', background: '#00e5ff' }}></div>
                                    </div>
                                </div>

                                {/* Center Element */}
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', borderRadius: '50%', border: '1px dashed rgba(0,229,255,0.3)' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10px', height: '10px', background: '#00e5ff', borderRadius: '50%', boxShadow: '0 0 20px #00e5ff' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Workflow Section */}
                <section id="workflow" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(13, 20, 32, 0.3)' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '-0.02em', marginBottom: '16px' }}>7-Step Detailed Workflow</h3>
                            <p style={{ color: '#8899aa', maxWidth: '640px', margin: '0 auto' }}>
                                The architecture of seamless human-machine collaboration, from local autonomy to global neural connection.
                            </p>
                        </div>

                        <div style={{ position: 'relative' }}>
                            {/* Vertical Line */}
                            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, #1337ec, #00e5ff, #a855f7, #1337ec)', transform: 'translateX(-50%)', opacity: 0.3 }} className="hidden md:block"></div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                                {[
                                    { id: '01', type: 'AUTONOMY', title: 'Autonomous Robot Monitoring', desc: 'Robot handles routine tasks via local AI models, maintaining continuous operation without human oversight.', icon: '🤖', color: 'blue' },
                                    { id: '02', type: 'DETECTION', title: 'Edge Case Detection', desc: 'The system identifies a complex physical bottleneck or environmental uncertainty that exceeds local AI parameters.', icon: '⚠️', color: 'cyan', reverse: true },
                                    { id: '03', type: 'MATCHING', title: 'Global Operator Matching', desc: 'Ghost Link AI scans the global operator network to find the highest-rated skill match with lowest latency.', icon: '🔍', color: 'blue' },
                                    { id: '04', type: 'LINKAGE', title: 'Neural-Mechanical Link', desc: 'Operator initializes the link via VR/Haptic interface, gaining 1:1 tactile and visual feedback from the machine.', icon: '⚡', color: 'purple', reverse: true },
                                    { id: '05', type: 'ACTION', title: 'Real-time Teleoperation', desc: 'Human operator takes control, solving the complex task using high-level cognitive intuition and manual dexterity.', icon: '🎮', color: 'blue' },
                                    { id: '06', type: 'LEARNING', title: 'Machine Learning Ingestion', desc: 'All human sensory input and mechanical outputs are recorded as high-quality training data for the next AI generation.', icon: '💾', color: 'cyan', reverse: true },
                                    { id: '07', type: 'REWARD', title: 'Reward & Tokenization', desc: 'Operator earns $GHOST tokens; Robot uncertainty score drops, and the system becomes more autonomous.', icon: '🪙', color: 'purple' },
                                ].map((step, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '32px', flexDirection: step.reverse ? 'row-reverse' : 'row' }} className={`workflow-step ${step.reverse ? 'reversed' : ''}`}>
                                        <div style={{ flex: 1, textAlign: step.reverse ? 'left' : 'right', order: step.reverse ? 2 : 1 }}>
                                            <span className="mono" style={{ color: step.color === 'cyan' ? '#00e5ff' : step.color === 'purple' ? '#a855f7' : '#3b82f6', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                                                {step.id} // {step.type}
                                            </span>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '4px', marginBottom: '8px' }}>{step.title}</h4>
                                            <p style={{ fontSize: '0.9rem', color: '#8899aa', maxWidth: '400px', marginLeft: step.reverse ? 0 : 'auto' }}>{step.desc}</p>
                                        </div>

                                        <div style={{
                                            width: '64px', height: '64px', borderRadius: '50%', background: '#080c14',
                                            border: `2px solid ${step.color === 'cyan' ? '#00e5ff' : step.color === 'purple' ? '#a855f7' : '#3b82f6'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                                            position: 'relative', zIndex: 10,
                                            boxShadow: `0 0 20px ${step.color === 'cyan' ? 'rgba(0,229,255,0.3)' : step.color === 'purple' ? 'rgba(168,85,247,0.3)' : 'rgba(59,130,246,0.3)'}`,
                                            order: step.reverse ? 1 : 2
                                        }}>
                                            {step.icon}
                                        </div>

                                        <div style={{ flex: 1, order: step.reverse ? 1 : 3 }} className="hidden md:block"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Cycle Section */}
                <section id="data-cycle" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="hero-grid">
                        <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Orbit Container */}
                            <div style={{ position: 'relative', width: '320px', height: '320px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }}>
                                {/* Outer Orbit */}
                                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(59,130,246,0.2)', animation: 'spin 20s linear infinite' }}>
                                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', width: '24px', height: '24px', background: '#3b82f6', borderRadius: '50%', color: '#fff', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>ML</div>
                                </div>
                                {/* Middle Orbit */}
                                <div style={{ position: 'absolute', inset: '40px', borderRadius: '50%', border: '1px solid rgba(0,229,255,0.2)', animation: 'spin 15s linear infinite reverse' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: -12, transform: 'translateY(-50%)', width: '24px', height: '24px', background: '#00e5ff', borderRadius: '50%', color: '#000', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AI</div>
                                </div>
                                {/* Inner Orbit */}
                                <div style={{ position: 'absolute', inset: '80px', borderRadius: '50%', border: '1px solid rgba(168,85,247,0.2)', animation: 'spin 25s linear infinite' }}>
                                    <div style={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', width: '24px', height: '24px', background: '#a855f7', borderRadius: '50%', color: '#fff', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>HI</div>
                                </div>

                                {/* Center */}
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                    <span style={{ fontSize: '3rem', display: 'block', color: '#3b82f6', marginBottom: '8px' }}>↻</span>
                                    <p style={{ fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.5 }}>DATA CYCLE</p>
                                </div>
                            </div>
                            {/* Glow BG */}
                            <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', zIndex: -1 }}></div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1.1, marginBottom: '24px' }}>Reducing Uncertainty Through Human Intervention</h3>
                            <p style={{ color: '#8899aa', marginBottom: '32px', lineHeight: 1.6 }}>
                                Every human decision is a data point. Our cycle ensures that robots learn from edge cases, slowly increasing their autonomous capability until a task becomes routine. This is the path to 100% automation.
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {['Neural recording of haptic feedback profiles', 'Auto-labeling of environmental edge cases', 'RLHF (Reinforcement Learning from Human Feedback) training'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ color: '#00e5ff' }}>✓</span>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Economic Matrix */}
                <section id="economics" style={{ padding: '100px 0', background: 'rgba(13, 20, 32, 0.4)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                        <div style={{ marginBottom: '48px' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }}>Economic Advantage Matrix</h3>
                            <p style={{ color: '#8899aa' }}>Comparing operational efficiency across different models.</p>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <th style={{ padding: '24px 16px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4a5568' }}>Metric</th>
                                        <th style={{ padding: '24px 16px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4a5568' }}>Full Automation</th>
                                        <th style={{ padding: '24px 16px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#00e5ff' }}>Ghost Link Hybrid</th>
                                        <th style={{ padding: '24px 16px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4a5568' }}>Manual Labor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {[
                                        { metric: 'Initial Capex', full: '$2.5M+ (High)', ghost: '$450k (Mid)', manual: '$10k (Low)' },
                                        { metric: 'Flexibility / Agility', full: 'Low (Strictly Coded)', ghost: 'Infinite (Human-Led)', manual: 'High (Human)' },
                                        { metric: 'Downtime Risk', full: 'High (Bugs/Errors)', ghost: 'Zero (Seamless Link)', manual: 'Mid (Burnout)' },
                                        { metric: 'Scalability', full: 'Fixed Hardware', ghost: 'On-Demand Network', manual: 'Linear Growth' },
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '24px 16px', fontWeight: 'bold' }}>{row.metric}</td>
                                            <td style={{ padding: '24px 16px', color: '#8899aa', fontSize: '0.9rem' }}>{row.full}</td>
                                            <td style={{ padding: '24px 16px', color: '#00e5ff', fontWeight: 'bold', fontSize: '0.9rem' }}>{row.ghost}</td>
                                            <td style={{ padding: '24px 16px', color: '#8899aa', fontSize: '0.9rem' }}>{row.manual}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '64px' }}>
                            {[
                                { val: '40%', label: 'OPEX REDUCTION' },
                                { val: '12ms', label: 'AVERAGE LATENCY' },
                                { val: '99.9%', label: 'TASK COMPLETION RATE' },
                            ].map((stat, i) => (
                                <div key={i} style={{ padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: '#0d1420' }}>
                                    <h5 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>{stat.val}</h5>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.1em', color: '#4a5568' }}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ padding: '100px 24px', textAlign: 'center' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px', borderRadius: '24px', background: 'linear-gradient(to bottom, rgba(0,229,255,0.1), transparent)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '24px' }}>Ready to bridge the gap?</h2>
                        <p style={{ color: '#8899aa', marginBottom: '40px', fontSize: '1.1rem' }}>
                            Start deploying Ghost Link hardware at your facility and tap into our global network of elite teleoperators.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="btn-primary" style={{ padding: '16px 32px' }}>Request System Demo</button>
                            <button className="btn-secondary" style={{ padding: '16px 32px' }}>Become an Operator</button>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}

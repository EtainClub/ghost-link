'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import type { Ledger } from './github';
import { REPO, REPO_URL } from './github';

const tones = ['#00e5ff', '#a855f7', '#10b981', '#f59e0b'];

function commitTone(message: string) {
    const m = message.toLowerCase();
    if (m.startsWith('fix') || m.includes('bug')) return { label: '[FIX]', color: '#f59e0b' };
    if (m.startsWith('feat') || m.startsWith('add')) return { label: '[FEAT]', color: '#00e5ff' };
    if (m.includes('design') || m.includes('layout') || m.includes('ui')) return { label: '[UX]', color: '#a855f7' };
    return { label: '[SYNC]', color: '#10b981' };
}

function ago(iso: string) {
    if (!iso) return '';
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (days <= 0) return 'today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
}

export default function ContributorsClient({ ledger }: { ledger: Ledger }) {
    const [activeTab, setActiveTab] = useState<'architects' | 'commits'>('architects');
    const { contributors, commits, stats, offline } = ledger;

    const totalCommits = contributors.reduce((n, c) => n + c.contributions, 0);

    const metrics = [
        { label: 'Architects', value: offline ? '—' : String(contributors.length), sub: 'people, not nodes', color: '#00e5ff' },
        { label: 'Commits', value: offline ? '—' : totalCommits.toLocaleString(), sub: 'to a job that does not exist', color: '#a855f7' },
        { label: 'Stars', value: offline ? '—' : stats.stars.toLocaleString(), sub: `${stats.openIssues} open issues`, color: '#10b981' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#080c14] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Navbar />

            <main style={{ paddingTop: 'var(--nav-h)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Page Header */}
                <div style={{ background: '#080c14', borderBottom: '1px solid #1e2d45', padding: '24px 16px' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                                    Architects of a job<br />that doesn&apos;t exist yet
                                </h1>
                                <p className="text-xs text-white/40 uppercase tracking-widest" style={{ marginTop: '10px' }}>
                                    {offline
                                        ? 'Ledger unreachable — GitHub did not answer'
                                        : `${contributors.length} ${contributors.length === 1 ? 'person has' : 'people have'} shaped ${REPO}`}
                                </p>
                            </div>
                            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <button className="flex items-center justify-center rounded bg-[#00e5ff] text-black text-[10px] font-black uppercase tracking-[0.15em] hover:bg-[#00e5ff]/80 transition-all border border-[#00e5ff]/50 shadow-[0_0_20px_rgba(0,229,255,0.4)]" style={{ padding: '10px 18px', cursor: 'pointer' }}>
                                    Put your name here
                                </button>
                            </a>
                        </div>

                        {/* Tab navigation */}
                        {/* padding/margin inline: Tailwind spacing utilities are dead here
                            (docs/CONCEPT-IMPROVEMENT.md §1.6a) */}
                        <div className="flex gap-1 border-b border-[#1e2d45]" style={{ marginTop: '20px' }}>
                            {(['architects', 'commits'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="capitalize text-xs font-bold tracking-wide transition-colors"
                                    style={{
                                        color: activeTab === tab ? '#00e5ff' : 'rgba(255,255,255,0.4)',
                                        background: 'none',
                                        border: 'none',
                                        borderBottom: activeTab === tab ? '2px solid #00e5ff' : '2px solid transparent',
                                        cursor: 'pointer',
                                        padding: '8px 16px 10px',
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content area */}
                <div style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '20px 16px 40px' }}>

                    {/* Metrics — real numbers, unlike everything else on this site */}
                    <div className="grid grid-cols-3 gap-3" style={{ marginBottom: '24px' }}>
                        {metrics.map(m => (
                            <div key={m.label} className="border border-[#1e2d45] rounded-sm" style={{ padding: '14px 16px', background: 'linear-gradient(to bottom right, rgba(13,20,32,0.8), transparent)' }}>
                                <p className="text-[9px] uppercase text-white/30 tracking-wider font-bold" style={{ marginBottom: '8px' }}>{m.label}</p>
                                <h4 className="text-lg md:text-2xl font-black font-mono tracking-tighter" style={{ color: m.color }}>{m.value}</h4>
                                <p className="text-[9px] text-white/30" style={{ marginTop: '4px' }}>{m.sub}</p>
                            </div>
                        ))}
                    </div>

                    {offline && (
                        <div className="border border-[#f59e0b]/30 rounded-sm" style={{ padding: '20px', background: 'rgba(245,158,11,0.06)' }}>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]" style={{ marginBottom: '8px' }}>Link down</p>
                            <p className="text-[13px] text-white/60 leading-relaxed">
                                This page used to show four invented contributors. It now shows real ones, which
                                means when GitHub is unreachable it shows nothing at all. That is the correct
                                failure.{' '}
                                <a href={`${REPO_URL}/graphs/contributors`} target="_blank" rel="noopener noreferrer" className="text-[#00e5ff]">
                                    See them on GitHub →
                                </a>
                            </p>
                        </div>
                    )}

                    {/* ARCHITECTS */}
                    {!offline && activeTab === 'architects' && (
                        <div>
                            <div className="border border-[#00e5ff]/20 rounded-sm" style={{ padding: '16px', marginBottom: '16px', background: 'rgba(0,229,255,0.05)' }}>
                                <p className="text-[9px] text-[#00e5ff] font-black uppercase tracking-widest" style={{ marginBottom: '8px' }}>Standing invitation</p>
                                <p className="text-[12px] text-white/60 leading-relaxed">
                                    Nobody here is qualified to design this — the job has no incumbents. That is
                                    the point, and it is why the list below is short enough for you to join.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {contributors.map((c, i) => {
                                    const tone = tones[i % tones.length];
                                    return (
                                        <a
                                            key={c.login}
                                            href={c.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center border border-[#1e2d45] hover:border-[#00e5ff]/40 rounded-sm transition-all duration-300"
                                            style={{ padding: '14px', gap: '14px', textDecoration: 'none', background: '#0d1420' }}
                                        >
                                            <div className="relative shrink-0">
                                                <div
                                                    className="size-11 rounded-sm bg-center bg-cover border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    style={{ backgroundImage: `url('${c.avatar}')` }}
                                                />
                                                <div
                                                    className="absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-[#080c14] opacity-60 group-hover:opacity-100 transition-opacity"
                                                    style={{ background: tone }}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold truncate tracking-tight text-white/90 group-hover:text-white transition-colors">
                                                    @{c.login}
                                                </p>
                                                <p className="text-[10px] font-mono uppercase tracking-tight opacity-70 group-hover:opacity-100" style={{ color: tone }}>
                                                    {c.contributions} commit{c.contributions === 1 ? '' : 's'}
                                                </p>
                                            </div>
                                            <span className="text-[9px] font-bold text-[#00e5ff] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* COMMITS */}
                    {!offline && activeTab === 'commits' && (
                        <div className="border border-[#1e2d45] rounded-sm overflow-hidden bg-[#080c14]">
                            <div className="flex items-center justify-between border-b border-[#1e2d45]/50" style={{ padding: '10px 16px', background: 'rgba(13,20,32,0.5)' }}>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-[#00e5ff] font-bold">HEAD &gt;</span>
                                    <h4 className="text-[9px] uppercase font-bold text-white/40 tracking-[0.2em]">Recent commits // {REPO}</h4>
                                </div>
                                <span className="text-[9px] text-[#10b981] font-bold tracking-wider">STATUS: SYNCED</span>
                            </div>
                            <div className="font-mono text-[11px] text-white/60" style={{ padding: '16px', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {commits.map(c => {
                                    const t = commitTone(c.message);
                                    return (
                                        <a
                                            key={c.sha}
                                            href={c.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', display: 'flex', gap: '10px', alignItems: 'baseline', flexWrap: 'wrap' }}
                                            className="hover:bg-[#00e5ff]/5"
                                        >
                                            <span className="font-bold shrink-0" style={{ color: t.color }}>{t.label}</span>
                                            <span className="text-white/80 flex-1" style={{ minWidth: '200px' }}>{c.message}</span>
                                            <span className="text-white/25">@{c.author}</span>
                                            <span className="text-white/20">{c.sha}</span>
                                            <span className="text-white/20">{ago(c.date)}</span>
                                        </a>
                                    );
                                })}
                                <a href={`${REPO_URL}/commits`} target="_blank" rel="noopener noreferrer" className="text-[#00e5ff]" style={{ textDecoration: 'none', marginTop: '6px' }}>
                                    &gt; the rest of the history →
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="h-8 border-t border-[#1e2d45] bg-[#080c14] flex items-center justify-between" style={{ padding: '0 16px' }}>
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Ghost Link Protocol // End of Line</span>
                <div className="flex items-center gap-2">
                    <div className="size-1 bg-[#10b981] rounded-full animate-pulse shadow-[0_0_5px_#10b981]" />
                    <span className="text-[9px] font-mono text-[#10b981] uppercase tracking-widest font-bold">Global Sync: Active</span>
                </div>
            </footer>
        </div>
    );
}

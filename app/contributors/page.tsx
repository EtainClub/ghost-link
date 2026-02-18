'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

// Mock Data from design
const visionaries = [
    { name: '@Xenon_01', rank: '0.992', color: 'text-[#00f3ff]', border: 'border-[#00f3ff]', bg: 'bg-[#00f3ff]', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD98OWEnJJvvTAblleT6s8sQslbLqMOe_TDJjj4hW99IrsoIwsTP-5PqVQyUDOoxl5l-xKSlTM_UR4Xr87RLXCbL4mh3xXbXmeHQ8cXrcwnynrhU5eqbayK_ZRYYRP2Wy7u24smvJCdnuxf_ZH06xw-cA5UGmtK-fXxsMb9pIZAqeNNKJDGJ2z83yE-oesGELSaj68f9drQb8ZUC1EB2wpYLhyvbOWbwMm1rNArvNpru4MifIXByeGDVQ3cHTqqpLU86zUnUJZULlc' },
    { name: '@NullPointer_Ex', rank: '0.985', color: 'text-[#bc00ff]', border: 'border-[#bc00ff]', bg: 'bg-[#bc00ff]', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4SF5JbzQgjeH71IPP0LLg27AHh8p4eNl3xUUBY6r7_3iaHUEpLHRevH0TaTX0UlBlfCKJkUgBJzI4PVwtAJ8ohdETzegLTJPR4zgjUMO6v5_qtSzq35kC2t3QPGKEZuNFahL55P6gNlN4Heljokt-0dejvMdPbWeW6Q-rftVu6tVJimUlu9MLtgRKoCSmzMTYC6cHioKZj5tCBL6WOKfVGqaiY_0jVl6lrSROLbG_GaEh_WBjh1ToBcmYT9Xx1JOkEE8mdBdVo7Y' },
    { name: '@VoidArchitect', rank: '0.941', color: 'text-white/60', border: 'border-white/60', bg: 'bg-white', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADf5HcfVQbo18xEEg5lAbplk9H25QOIuNzt9Sj1SCet3bZRQ5naildE1pcdfaDGb5H6X4E2_OxqAQYZ_NM9UpKTKaHgajso2Z5bpygHZwhZI0wfbcOrzmjtZX-1RMmCcGxx1kne9dXQIP-_Lwig87gLZlXyyfAhWnEl4hFqj0v8K7jvV19yNn75vuOVBa7aCuKFpLnjZd0gaoP4WytDyoli0T2N9xBA7XMmmF6CTuAag8jH3PYEFQY4KBWGDlCo6i_KsaZ_ENpK8Y' },
    { name: '@NeuralLink_99', rank: '0.912', color: 'text-[#0bda65]', border: 'border-[#0bda65]', bg: 'bg-[#0bda65]', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY8JaeLC5f_uhY6GtKfPG2KMBq-9_akkzzmmVXl8S8Z0jNgc32C3-S759QVbRMavf4-FrHshPEziGIpbBoKO-GvJz6PT7XvCzQNHy0O_HlLncm96Rhl55VKEO4BSnMLKuo_iC-Q5TH8VXOqavaK00TbXiBIPbrI_vUgLbULLvfqRmbsA_M3i5pVB0CXTd4C9nt14PQngCzboWYSfh3dTBVYY8YaBUCDhNelIRTL-GRjJ71v_sDsCKz-isw-bWthYgtcXCFV8sd8bk' },
];

const terminalLogs = [
    { prefix: '[INIT]', prefixColor: '#00f3ff', text: 'Neural shard committed by @Xenon_01 (SHA-256: 4b29...)' },
    { prefix: '[DEBATE]', prefixColor: '#bc00ff', text: 'UX proposal #942: High-latency mitigation active in shard 4.' },
    { prefix: '[SYNC]', prefixColor: '#0bda65', text: 'Protocol handshake completed with 8,102 remote nodes.' },
    { prefix: '[EVENT]', prefixColor: 'rgba(255,255,255,0.3)', text: 'Archive snapshot created at sequence 89,201.' },
    { prefix: '[INIT]', prefixColor: '#00f3ff', text: 'Visual core architecture updated. Version 4.0.2-patch.1' },
    { prefix: '[DEBATE]', prefixColor: '#bc00ff', text: 'Architect @NullPointer_Ex suggests increasing ledger density.' },
    { prefix: '[SYNC]', prefixColor: '#0bda65', text: 'Neural ledger re-indexing... 42% complete.' },
];

const metrics = [
    { label: 'Total Nodes', value: '10,242', change: '+1.2%', changeColor: '#0bda65' },
    { label: 'Daily Commits', value: '4,812', change: '+5.7%', changeColor: '#00f3ff' },
    { label: 'Ledger Capacity', value: '82.4%', change: 'STABLE', changeColor: '#bc00ff' },
];

export default function ContributorsPage() {
    const [activeTab, setActiveTab] = useState<'ledger' | 'visionaries' | 'terminal'>('ledger');

    // Generate static nodes for the grid
    const nodes = useMemo(() => Array.from({ length: 600 }).map((_, i) => {
        const opacity = Math.random() > 0.9 ? 'opacity-80' : Math.random() > 0.6 ? 'opacity-30' : 'opacity-10';
        const color = Math.random() > 0.95 ? 'bg-[#00f3ff]' : Math.random() > 0.9 ? 'bg-[#bc00ff]' : Math.random() > 0.8 ? 'bg-[#1337ec]' : 'bg-[#1337ec]/50';
        return { id: i, className: `aspect-square rounded-[1px] ${color} ${opacity} transition-all duration-500 hover:scale-150 hover:z-10` };
    }), []);

    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Navbar />

            <main style={{ paddingTop: '60px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Page Header */}
                <div style={{ background: '#050505', borderBottom: '1px solid #232948', padding: '24px 16px' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Neural Ledger</h1>
                                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Active shards: 10,242 nodes mapping global architectural shifts</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex items-center gap-4 border-r border-[#232948] pr-4">
                                    <div className="text-right">
                                        <p className="text-[9px] text-white/30 uppercase mb-1 tracking-wider font-bold">Network Uptime</p>
                                        <p className="text-xs font-mono font-bold text-[#0bda65]">99.98%</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] text-white/30 uppercase mb-1 tracking-wider font-bold">Active Architects</p>
                                        <p className="text-xs font-mono font-bold text-[#1337ec]">412</p>
                                    </div>
                                </div>
                                <button className="flex items-center justify-center rounded bg-[#1337ec] px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] hover:bg-[#1337ec]/80 transition-all border border-[#1337ec]/50 shadow-[0_0_20px_rgba(19,55,236,0.4)]">
                                    Connect Neural Link
                                </button>
                            </div>
                        </div>

                        {/* Tab navigation */}
                        <div className="flex gap-1 mt-4 border-b border-[#232948]">
                            {(['ledger', 'visionaries', 'terminal'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="capitalize text-xs font-bold tracking-wide px-4 py-2 transition-colors"
                                    style={{
                                        color: activeTab === tab ? '#1337ec' : 'rgba(255,255,255,0.4)',
                                        background: 'none',
                                        border: 'none',
                                        borderBottom: activeTab === tab ? '2px solid #1337ec' : '2px solid transparent',
                                        cursor: 'pointer',
                                        paddingBottom: '10px',
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content area */}
                <div style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '16px' }}>

                    {/* LEDGER TAB */}
                    {activeTab === 'ledger' && (
                        <div>
                            {/* Metrics row */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {metrics.map((m, i) => (
                                    <div key={i} className="p-3 md:p-4 border border-[#232948] rounded-sm bg-gradient-to-br from-[#111422]/80 to-transparent">
                                        <p className="text-[9px] uppercase text-white/30 mb-2 tracking-wider font-bold">{m.label}</p>
                                        <div className="flex items-end justify-between gap-1">
                                            <h4 className="text-lg md:text-2xl font-black font-mono tracking-tighter text-white">{m.value}</h4>
                                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: m.changeColor, background: `${m.changeColor}18` }}>{m.change}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Neural grid visualization */}
                            <div className="relative bg-[#050505] border border-[#232948] rounded-sm overflow-hidden" style={{ height: '300px', marginBottom: '16px' }}>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(19,55,236,0.08)_0%,_transparent_60%)] pointer-events-none" />
                                <div className="absolute inset-0 p-1 flex flex-wrap content-start overflow-hidden">
                                    {nodes.map(node => (
                                        <div key={node.id} className={`${node.className} w-[2.5%] border-[0.5px] border-[#050505]`} />
                                    ))}
                                </div>
                                {/* Floating Info Card */}
                                <div className="absolute bottom-4 left-4 p-4 border border-[#1337ec]/30 bg-[#050505]/95 backdrop-blur-md rounded-sm w-56 shadow-xl z-20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="size-2 rounded-full bg-[#1337ec] shadow-[0_0_10px_#1337ec] animate-pulse" />
                                        <p className="text-[9px] font-mono uppercase tracking-widest text-[#1337ec] font-bold">Node Interaction</p>
                                    </div>
                                    <p className="text-xs font-bold mb-1 uppercase tracking-tight text-white">Block #482,912-Alpha</p>
                                    <p className="text-[10px] text-white/50 font-mono">Contributor: <span className="text-white">@GhostArchitect_0x</span></p>
                                    <p className="text-[10px] text-white/50 font-mono">Latency: <span className="text-[#0bda65]">12ms</span></p>
                                </div>
                            </div>

                            {/* Filter buttons */}
                            <div className="flex gap-1">
                                {['Code', 'Design', 'Neural Map'].map((label, i) => (
                                    <button key={label} className="px-3 py-1.5 text-[9px] font-bold rounded-[1px] uppercase tracking-widest transition-colors"
                                        style={{
                                            border: i === 0 ? '1px solid #1337ec' : '1px solid #232948',
                                            background: i === 0 ? 'rgba(19,55,236,0.1)' : 'transparent',
                                            color: i === 0 ? 'white' : 'rgba(255,255,255,0.4)',
                                            cursor: 'pointer',
                                        }}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VISIONARIES TAB */}
                    {activeTab === 'visionaries' && (
                        <div>
                            <div className="mb-4 p-4 bg-[#1337ec]/5 border border-[#1337ec]/20 rounded-sm">
                                <p className="text-[9px] text-[#1337ec] font-black uppercase mb-2 tracking-widest">Contribution Phase</p>
                                <p className="text-[11px] text-white/60 leading-relaxed font-mono italic">&quot;The inevitable design of the ledger requires your neural pattern.&quot;</p>
                            </div>
                            <div className="space-y-2">
                                {visionaries.map((v, i) => (
                                    <div key={i} className="group flex items-center gap-4 p-4 rounded bg-transparent hover:bg-[#1337ec]/5 border border-transparent hover:border-[#1337ec]/20 transition-all duration-300 cursor-pointer">
                                        <div className="relative shrink-0">
                                            <div
                                                className="size-12 rounded-sm bg-center bg-cover border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"
                                                style={{ backgroundImage: `url('${v.avatar}')` }}
                                            />
                                            <div className={`absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-[#050505] ${v.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold truncate tracking-tight text-white/90 group-hover:text-white transition-colors">{v.name}</p>
                                            <p className={`text-[10px] font-mono uppercase tracking-tight ${v.color} opacity-70 group-hover:opacity-100`}>
                                                NEURAL RANK: {v.rank}
                                            </p>
                                        </div>
                                        <span className="text-[9px] font-bold text-[#1337ec] tracking-widest">→</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TERMINAL TAB */}
                    {activeTab === 'terminal' && (
                        <div className="border border-[#232948] rounded-sm overflow-hidden bg-[#050505]">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#111422]/50 border-b border-[#232948]/50">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-[#00f3ff] font-bold">TYPE &gt;</span>
                                    <h4 className="text-[9px] uppercase font-bold text-white/40 tracking-[0.2em]">Live Project Feed // Terminal</h4>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-[9px] text-[#0bda65] font-bold tracking-wider">STATUS: SYNCED</span>
                                    <span className="text-[9px] text-white/30 tracking-wider hidden sm:block">LOGS: 1,429/sec</span>
                                </div>
                            </div>
                            <div className="p-4 space-y-3 font-mono text-[10px] text-white/60" style={{ minHeight: '300px' }}>
                                {terminalLogs.map((log, i) => (
                                    <p key={i}>
                                        <span style={{ color: log.prefixColor }} className="font-bold">{log.prefix}</span> {log.text}
                                    </p>
                                ))}
                                <p className="text-[#1337ec] animate-pulse">&gt; Waiting for next pattern...</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="h-8 border-t border-[#232948] bg-[#050505] flex items-center justify-between px-4 md:px-6">
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Ghost Link Protocol // End of Line</span>
                <div className="flex items-center gap-2">
                    <div className="size-1 bg-[#0bda65] rounded-full animate-pulse shadow-[0_0_5px_#0bda65]" />
                    <span className="text-[9px] font-mono text-[#0bda65] uppercase tracking-widest font-bold">Global Sync: Active</span>
                </div>
            </footer>
        </div>
    );
}

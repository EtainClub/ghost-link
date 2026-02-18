'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const GlobalNetworkMap = () => {
    const Map = useMemo(() => dynamic(
        () => import('./DynamicMap'),
        {
            loading: () => <div className="w-full h-full bg-[#0a101a] animate-pulse flex items-center justify-center text-cyan-900 font-mono text-xs">INITIALIZING SATELLITE LINK...</div>,
            ssr: false
        }
    ), []);

    return (
        <div className="w-full bg-[#050b14] border-t border-gray-800 py-32 relative overflow-hidden flex flex-col items-center">
            {/* Section Header */}
            <div className="flex flex-col items-center justify-center text-center mb-16 relative z-10 px-4">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-6 drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]">
                    Global Node Density
                </h2>
                <div className="w-24 h-1 bg-cyan-500 rounded-full mb-6 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                <p className="text-gray-400 max-w-3xl mx-auto font-light tracking-wide text-base md:text-lg leading-relaxed">
                    Real-time visualization of the Ghost Link Relay Network and active robotic nodes across 142 cities.
                </p>
            </div>

            {/* Map Container */}
            <div className="max-w-[1400px] mx-auto relative z-10 w-full px-4 md:px-8 h-[600px] md:h-[700px] flex justify-center">
                <div className="w-full h-full rounded-2xl overflow-hidden border border-[#1e2d45] shadow-[0_0_50px_rgba(0,0,0,0.6)] relative bg-[#0a101a]">
                    {/* Live Indicator Overlay */}
                    <div className="absolute top-4 left-4 z-[400] bg-[#0f172a]/90 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                        </span>
                        <span className="text-cyan-400 font-mono text-xs md:text-sm tracking-wider font-bold">
                            LIVE: 6,788 ACTIVE NODES
                        </span>
                    </div>

                    <Map />
                </div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0d1420] to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0d1420] to-transparent pointer-events-none" />
        </div>
    );
};

export default GlobalNetworkMap;

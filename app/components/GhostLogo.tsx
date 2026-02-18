'use client';
import Image from 'next/image';

export default function GhostLogo({ className = "", width = 32, height = 32 }: { className?: string, width?: number, height?: number }) {
    return (
        <Image
            src="/logo.png"
            alt="Ghost Link Logo"
            width={width}
            height={height}
            className={className}
            style={{ borderRadius: '6px' }}
        />
    );
}

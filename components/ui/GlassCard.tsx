import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
    return (
        <div
            className={`
        backdrop-blur-lg bg-white/5 
        border border-white/10 
        rounded-2xl shadow-2xl
        ${hover ? 'transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-neon-cyan/20' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

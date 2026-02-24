'use client';

import React, { useState, useRef } from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
    };

    // Calculate rotation based on mouse position relative to center
    const getRotation = () => {
        if (!isHovered || !cardRef.current) return 'rotateX(0deg) rotateY(0deg)';
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((mousePos.x - centerX) / centerX) * 5; // max 5 degrees
        const rotateX = ((centerY - mousePos.y) / centerY) * 5; // max 5 degrees
        return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePos({ x: 0, y: 0 });
            }}
            className={`
                relative overflow-hidden
                backdrop-blur-xl bg-white/5 
                border border-white/10 
                rounded-2xl shadow-2xl
                transition-transform duration-200 ease-out
                ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-neon-cyan/20' : ''}
                ${className}
            `}
            style={{
                transform: getRotation(),
            }}
        >
            {/* Liquid Shine Glint */}
            {isHovered && (
                <div
                    className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 40%)`,
                    }}
                />
            )}

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}


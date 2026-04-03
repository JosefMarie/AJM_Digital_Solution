'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for rotation - tuned for slower, more subtle movement
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { damping: 30, stiffness: 100 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { damping: 30, stiffness: 100 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate normalized mouse position (-0.5 to 0.5)
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        
        x.set(mouseX);
        y.set(mouseY);
    };

    // Liquid Shine Glint effect
    const background = useTransform(
        [x, y],
        ([latestX, latestY]) => {
            const pxX = (Number(latestX) + 0.5) * 100;
            const pxY = (Number(latestY) + 0.5) * 100;
            return `radial-gradient(600px circle at ${pxX}% ${pxY}%, rgba(255,255,255,0.1), transparent 40%)`;
        }
    );

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileHover={hover ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
            whileTap={hover ? { scale: 0.98 } : {}}
            className={`
                relative overflow-hidden
                backdrop-blur-xl bg-white/5 
                border border-white/10 
                rounded-2xl shadow-2xl
                ${hover ? 'cursor-pointer hover:border-white/20' : ''}
                ${className}
            `}
            style={{
                perspective: '1000px',
                rotateX: hover ? rotateX : 0,
                rotateY: hover ? rotateY : 0,
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Liquid Shine Glint */}
            {hover && isHovered && (
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{ background }}
                />
            )}

            <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </motion.div>
    );
}



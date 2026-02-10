'use client';

import React from 'react';
import GlassCard from '../ui/GlassCard';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-4xl w-full text-center">
                <GlassCard className="p-12 hover">
                    {/* Glowing accent */}
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-electric-purple to-neon-cyan animate-pulse-glow"></div>

                    {/* Main heading */}
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-cyan via-electric-purple to-neon-sky bg-clip-text text-transparent">
                        Full-Stack Developer
                    </h1>

                    {/* Subheading */}
                    <p className="text-2xl md:text-3xl text-white/80 mb-6 font-light">
                        Building beautiful, scalable web applications
                    </p>

                    {/* Description */}
                    <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Specialized in Next.js, TypeScript, and modern web technologies.
                        Passionate about creating elegant solutions to complex problems.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a
                            href="#projects"
                            className="px-8 py-4 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 hover:scale-105"
                        >
                            View Projects
                        </a>
                        <a
                            href="#resume"
                            className="px-8 py-4 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
                        >
                            View Resume
                        </a>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}

'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';

export default function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Subtle parallax shift for the content
    const translateX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
    const translateY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX.set(e.clientX / innerWidth - 0.5);
        mouseY.set(e.clientY / innerHeight - 0.5);
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section 
            className="min-h-screen flex items-center justify-center px-6 py-20 relative"
            onMouseMove={handleMouseMove}
        >
            <motion.div 
                className="max-w-4xl w-full text-center relative z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{ x: translateX, y: translateY }}
            >
                <div className="
                    backdrop-blur-lg bg-white/5 
                    border border-white/10 
                    rounded-3xl shadow-2xl
                    p-12 md:p-16 hover:shadow-neon-cyan/20 transition-all duration-500
                    relative overflow-hidden
                ">
                    {/* Inner glowing circle */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-electric-purple/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse"></div>

                    <motion.div variants={itemVariants} className="relative z-10">
                        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-electric-purple to-neon-cyan animate-pulse-glow shadow-[0_0_30px_rgba(34,211,238,0.3)]"></div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative z-10">
                        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-neon-cyan via-electric-purple to-neon-sky bg-clip-text text-transparent leading-tight">
                            AJM Digital Solution
                        </h1>
                        <p className="text-2xl md:text-3xl text-neon-cyan font-light mb-8 tracking-widest">
                            Full-Stack Engineer
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative z-10">
                        <p className="text-xl md:text-2xl text-white/80 mb-8 font-light italic">
                            "Empowering Tomorrow, One Line at a Time"
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative z-10">
                        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            Specialized in Next.js, TypeScript, and modern web technologies.
                            Building beautiful, scalable applications for the future.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative z-10">
                        <div className="flex gap-6 justify-center flex-wrap">
                            <a
                                href="#projects"
                                className="px-10 py-4 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-xl font-bold text-white hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                View Projects
                            </a>
                            <a
                                href="#resume"
                                className="px-10 py-4 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl font-bold text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                View Resume
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}


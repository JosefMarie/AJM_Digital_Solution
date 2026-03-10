'use client';

import React, { useEffect, useState } from 'react';
import { getResume } from '@/lib/firebase/firestore';
import { Resume } from '@/lib/types';
import GlassCard from '../ui/GlassCard';
import ScrollReveal from '../ui/ScrollReveal';

export default function ResumeSection() {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const data = await getResume();
                setResume(data);
            } catch (error) {
                console.error('Error fetching resume:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, []);

    if (loading) {
        return (
            <section id="resume" className="min-h-screen px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-electric-purple to-neon-sky bg-clip-text text-transparent">
                        Professional Experience
                    </h2>
                    <div className="flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-electric-purple border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (!resume) return null;

    return (
        <section id="resume" className="min-h-screen px-6 py-20">
            <div className="max-w-6xl mx-auto">
                {/* Personal Info Header */}
                <ScrollReveal>
                    <GlassCard hover className="mb-16 p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-electric-purple/10 rounded-full blur-3xl group-hover:bg-neon-cyan/20 transition-all duration-500"></div>
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            {resume.personalInfo.profileImageUrl && (
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-neon-cyan/50 shadow-lg shadow-neon-cyan/30">
                                        <img
                                            src={resume.personalInfo.profileImageUrl}
                                            alt={resume.personalInfo.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="text-center md:text-left">
                                <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white">{resume.personalInfo.name}</h2>
                                <p className="text-xl md:text-2xl text-neon-cyan font-light mb-4">{resume.personalInfo.title}</p>
                                
                                <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6 text-white/70 text-base">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>{resume.personalInfo.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>{resume.personalInfo.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{resume.personalInfo.location}</span>
                                    </div>
                                </div>
                                <p className="text-white/70 max-w-3xl leading-relaxed text-lg italic mb-6">
                                    "{resume.personalInfo.summary}"
                                </p>
                                
                                {resume.personalInfo.coreObjectives && (
                                    <div className="mb-4">
                                        <h4 className="text-lg font-bold text-white mb-2">Core Objectives</h4>
                                        <ul className="text-white/70 max-w-3xl leading-relaxed space-y-2 list-disc list-inside">
                                            {resume.personalInfo.coreObjectives.split('\n').filter(line => line.trim() !== '').map((objective, i) => (
                                                <li key={i}>{objective.trim()}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                {resume.personalInfo.myVision && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-bold text-white mb-2">My Vision</h4>
                                        <p className="text-white/70 max-w-3xl leading-relaxed">
                                            {resume.personalInfo.myVision}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-4 flex-wrap print-hide">
                                    <button
                                        onClick={() => window.print()}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                        Print / Save as PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Experience */}
                    <div className="lg:col-span-2 space-y-8">
                        <ScrollReveal>
                            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <span className="w-8 h-1 bg-electric-purple rounded-full"></span>
                                Experience
                            </h3>
                        </ScrollReveal>

                        {resume.experience.map((exp, index) => (
                            <ScrollReveal key={index} delay={index * 150}>
                                <GlassCard hover className="p-8 hover:border-electric-purple/50 transition-colors">
                                    <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
                                        <h4 className="text-2xl font-bold text-white">{exp.position}</h4>
                                        <span className="text-neon-cyan font-mono bg-neon-cyan/10 px-3 py-1 rounded text-sm self-start">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p className="text-lg text-white/90 font-medium mb-4">{exp.company}</p>
                                    <ul className="space-y-3">
                                        {exp.responsibilities.map((resp, i) => (
                                            <li key={i} className="text-white/70 flex gap-3 text-sm">
                                                <span className="text-electric-purple mt-1 flex-shrink-0">▹</span>
                                                {resp}
                                            </li>
                                        ))}
                                    </ul>
                                </GlassCard>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Right Column: Skills & Education */}
                    <div className="space-y-12">
                        {/* Skills */}
                        <section>
                            <ScrollReveal>
                                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-neon-cyan rounded-full"></span>
                                    Skills
                                </h3>
                            </ScrollReveal>
                            <div className="space-y-6">
                                {resume.skills.map((skillGroup, index) => (
                                    <ScrollReveal key={index} delay={index * 100}>
                                        <GlassCard hover className="p-6">
                                            <h4 className="text-lg font-bold text-neon-cyan mb-4 uppercase tracking-wider">
                                                {skillGroup.category}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {skillGroup.items.map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80 hover:bg-white/10 transition-colors"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </GlassCard>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <ScrollReveal>
                                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-neon-sky rounded-full"></span>
                                    Education
                                </h3>
                            </ScrollReveal>
                            <div className="space-y-6">
                                {resume.education.map((edu, index) => (
                                    <ScrollReveal key={edu.id || index} delay={index * 100}>
                                        <GlassCard hover className="p-6">
                                            <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                                            <p className="text-neon-sky text-sm mb-2">{edu.institution}</p>
                                            <p className="text-white/50 text-xs font-mono print:hidden">{edu.year}</p>
                                        </GlassCard>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>

                        {/* Languages */}
                        {resume.languages && resume.languages.length > 0 && (
                            <section>
                                <ScrollReveal>
                                    <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                        <span className="w-8 h-1 bg-electric-purple rounded-full"></span>
                                        Languages
                                    </h3>
                                </ScrollReveal>
                                <div className="space-y-6">
                                    {resume.languages.map((lang, index) => (
                                        <ScrollReveal key={index} delay={index * 100}>
                                            <GlassCard hover className="p-6">
                                                <h4 className="text-xl font-bold text-white mb-1">{lang.name}</h4>
                                                <p className="text-neon-cyan text-sm">{lang.level}</p>
                                            </GlassCard>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

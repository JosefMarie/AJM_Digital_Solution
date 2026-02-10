'use client';

import React, { useEffect, useState } from 'react';
import { getResume } from '@/lib/firebase/firestore';
import { Resume } from '@/lib/types';
import GlassCard from '../ui/GlassCard';

export default function ResumeSection() {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const data = await getResume();
                setResume(data);
            } catch (error) {
                console.error('Error loading resume:', error);
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

    if (!resume) {
        return (
            <section id="resume" className="min-h-screen px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-electric-purple to-neon-sky bg-clip-text text-transparent">
                        Professional Experience
                    </h2>
                    <div className="text-center text-white/60 py-20">
                        <p className="text-xl">Resume content coming soon!</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="resume" className="min-h-screen px-6 py-20">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-electric-purple to-neon-sky bg-clip-text text-transparent">
                    Professional Experience
                </h2>
                <p className="text-center text-white/60 mb-16 text-lg">
                    Skills, experience, and education
                </p>

                <div className="space-y-8">
                    {/* Personal Info */}
                    <GlassCard className="p-8 mb-8">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            {/* Profile Picture */}
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

                            {/* Personal Details */}
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-white mb-2">{resume.personalInfo.name}</h3>
                                <p className="text-xl text-neon-cyan mb-4">{resume.personalInfo.title}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/70">
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-sky">📧</span>
                                        <a href={`mailto:${resume.personalInfo.email}`} className="hover:text-neon-cyan transition-colors">
                                            {resume.personalInfo.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-sky">📱</span>
                                        <span>{resume.personalInfo.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-sky">📍</span>
                                        <span>{resume.personalInfo.location}</span>
                                    </div>
                                </div>

                                <p className="mt-4 text-white/80 leading-relaxed">{resume.personalInfo.summary}</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Experience */}
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-electric-purple to-neon-cyan rounded-full"></span>
                            Work Experience
                        </h3>
                        <div className="space-y-6">
                            {resume.experience.map((exp) => (
                                <GlassCard key={exp.id} className="p-6">
                                    <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{exp.position}</h4>
                                            <p className="text-neon-cyan font-medium">{exp.company}</p>
                                        </div>
                                        <span className="text-white/60 text-sm">{exp.duration}</span>
                                    </div>
                                    <ul className="space-y-2 text-white/70">
                                        {exp.responsibilities.map((resp, index) => (
                                            <li key={index} className="flex gap-2">
                                                <span className="text-neon-cyan mt-1.5">•</span>
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-neon-cyan to-electric-purple rounded-full"></span>
                            Skills
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resume.skills.map((skillGroup, index) => (
                                <GlassCard key={index} className="p-6">
                                    <h4 className="text-lg font-bold text-neon-cyan mb-3">{skillGroup.category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.items.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 text-sm bg-electric-indigo/30 border border-electric-purple/40 rounded-full text-white"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-neon-sky to-electric-indigo rounded-full"></span>
                            Education
                        </h3>
                        <div className="space-y-6">
                            {resume.education.map((edu) => (
                                <GlassCard key={edu.id} className="p-6">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                                            <p className="text-neon-cyan">{edu.institution}</p>
                                            {edu.field && <p className="text-white/60 text-sm mt-1">{edu.field}</p>}
                                        </div>
                                        <span className="text-white/60 text-sm">{edu.year}</span>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

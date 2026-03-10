'use client';

import React, { useEffect, useState } from 'react';
import { getProjects } from '@/lib/firebase/firestore';
import { Project } from '@/lib/types';
import GlassCard from '../ui/GlassCard';
import ScrollReveal from '../ui/ScrollReveal';

export default function ProjectsGallery() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section id="projects" className="min-h-screen px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <div className="flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="min-h-screen px-6 py-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <ScrollReveal>
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                </ScrollReveal>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="text-center text-white/60 py-20">
                        <p className="text-xl">No projects yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ScrollReveal key={project.id} delay={index * 100}>
                                <GlassCard hover className="group h-full flex flex-col overflow-hidden">
                                    {project.imageUrl && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-void-900 to-transparent opacity-60"></div>
                                        </div>
                                    )}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/70 mb-6 line-clamp-3 text-sm flex-grow">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 text-xs rounded-full bg-electric-purple/20 border border-electric-purple/30 text-neon-cyan"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-4 mt-auto">
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white/60 hover:text-white transition-colors"
                                                >
                                                    GitHub
                                                </a>
                                            )}
                                            {project.liveLink && (
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white/60 hover:text-white transition-colors"
                                                >
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </GlassCard>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

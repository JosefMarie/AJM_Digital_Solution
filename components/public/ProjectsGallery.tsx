'use client';

import React, { useEffect, useState } from 'react';
import { getProjects } from '@/lib/firebase/firestore';
import { Project } from '@/lib/types';
import GlassCard from '../ui/GlassCard';

export default function ProjectsGallery() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error loading projects:', error);
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
                <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent">
                    Featured Projects
                </h2>
                <p className="text-center text-white/60 mb-16 text-lg">
                    A selection of my recent work and contributions
                </p>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="text-center text-white/60 py-20">
                        <p className="text-xl">No projects yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <GlassCard key={project.id} className="p-6 hover" hover>
                                {/* Project Image */}
                                {project.imageUrl && (
                                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-void-800">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                {/* Project Title */}
                                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>

                                {/* Project Description */}
                                <p className="text-white/70 mb-4 leading-relaxed">{project.description}</p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-sm bg-electric-indigo/30 border border-electric-purple/40 rounded-full text-neon-cyan font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-3">
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all duration-200"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-gradient-to-r from-electric-purple to-neon-cyan hover:shadow-lg hover:shadow-neon-cyan/50 rounded-lg text-white font-medium transition-all duration-200"
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

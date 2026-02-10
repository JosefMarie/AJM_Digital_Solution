'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/firebase/firestore';
import { Project } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminProjectsPage() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        imageUrl: '',
        githubLink: '',
        liveLink: '',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const projectData = {
                title: formData.title,
                description: formData.description,
                techStack: formData.techStack.split(',').map((tech) => tech.trim()),
                imageUrl: formData.imageUrl,
                githubLink: formData.githubLink,
                liveLink: formData.liveLink,
            };

            if (editingProject) {
                await updateProject(editingProject.id, projectData);
                alert('Project updated successfully!');
            } else {
                await createProject(projectData);
                alert('Project created successfully!');
            }

            // Reset form
            setFormData({
                title: '',
                description: '',
                techStack: '',
                imageUrl: '',
                githubLink: '',
                liveLink: '',
            });
            setEditingProject(null);
            setShowForm(false);
            await fetchProjects();
        } catch (error: any) {
            console.error('Error saving project:', error);

            // Show user-friendly error message
            let errorMessage = 'Failed to save project. ';

            if (error?.code === 'permission-denied') {
                errorMessage += 'Permission denied. Please check your Firestore security rules.';
            } else if (error?.message) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Please check the console for details.';
            }

            alert(errorMessage);
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            techStack: project.techStack.join(', '),
            imageUrl: project.imageUrl,
            githubLink: project.githubLink || '',
            liveLink: project.liveLink || '',
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id);
                await fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            techStack: '',
            imageUrl: '',
            githubLink: '',
            liveLink: '',
        });
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Back Button */}
            <button
                onClick={() => router.push('/admin')}
                className="mb-6 flex items-center gap-2 text-white/60 hover:text-neon-cyan transition-colors"
            >
                <span>←</span>
                <span>Back to Dashboard</span>
            </button>

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                    Manage Projects
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-3 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
                >
                    {showForm ? 'Cancel' : '+ New Project'}
                </button>
            </div>

            {/* Project Form */}
            {showForm && (
                <GlassCard className="p-6 mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6">
                        {editingProject ? 'Edit Project' : 'Create New Project'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                rows={4}
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Tech Stack (comma-separated)
                            </label>
                            <input
                                type="text"
                                value={formData.techStack}
                                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                required
                                placeholder="Next.js, TypeScript, Tailwind CSS"
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Image URL</label>
                            <input
                                type="url"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">GitHub Link (optional)</label>
                                <input
                                    type="url"
                                    value={formData.githubLink}
                                    onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Live Link (optional)</label>
                                <input
                                    type="url"
                                    value={formData.liveLink}
                                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
                            >
                                {editingProject ? 'Update Project' : 'Create Project'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium text-white transition-all duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </GlassCard>
            )}

            {/* Projects List */}
            <div className="space-y-6">
                {projects.length === 0 ? (
                    <GlassCard className="p-12 text-center">
                        <p className="text-white/60 text-lg">No projects yet. Create your first project!</p>
                    </GlassCard>
                ) : (
                    projects.map((project) => (
                        <GlassCard key={project.id} className="p-6">
                            <div className="flex gap-6">
                                {project.imageUrl && (
                                    <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-void-800">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-white/70 mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techStack.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-sm bg-electric-indigo/30 border border-electric-purple/40 rounded-full text-neon-cyan"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg text-red-200 font-medium transition-all duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    ))
                )}
            </div>
        </div>
    );
}

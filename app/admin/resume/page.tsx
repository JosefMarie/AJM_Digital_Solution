'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getResume, updateResume, createResume } from '@/lib/firebase/firestore';
import { Resume } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminResumePage() {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [creating, setCreating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchResume();
    }, []);

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

    const handleCreateInitialResume = async () => {
        setCreating(true);
        try {
            const initialResume = {
                personalInfo: {
                    name: 'Your Name',
                    title: 'Full-Stack Developer',
                    email: 'your@email.com',
                    phone: '+1234567890',
                    location: 'City, Country',
                    summary: 'Your professional summary here...',
                },
                experience: [
                    {
                        id: '1',
                        company: 'Example Company',
                        position: 'Software Developer',
                        duration: 'Jan 2020 - Present',
                        responsibilities: [
                            'Developed web applications using React and Node.js',
                            'Collaborated with cross-functional teams',
                        ],
                    },
                ],
                skills: [
                    {
                        category: 'Frontend',
                        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
                    },
                    {
                        category: 'Backend',
                        items: ['Node.js', 'Express', 'Firebase', 'PostgreSQL'],
                    },
                    {
                        category: 'Tools',
                        items: ['Git', 'VS Code', 'Figma', 'Postman'],
                    },
                ],
                education: [
                    {
                        id: '1',
                        institution: 'University Name',
                        degree: 'Bachelor of Science',
                        field: 'Computer Science',
                        year: '2016 - 2020',
                    },
                ],
            };

            await createResume(initialResume);
            await fetchResume();
            alert('Initial resume created successfully!');
        } catch (error) {
            console.error('Error creating initial resume:', error);
            alert('Failed to create initial resume');
        } finally {
            setCreating(false);
        }
    };

    const handleSave = async () => {
        if (!resume) return;
        setSaving(true);
        try {
            const { id, updatedAt, ...resumeData } = resume;
            await updateResume(resumeData);
            alert('Resume updated successfully!');
        } catch (error) {
            console.error('Error updating resume:', error);
            alert('Failed to update resume');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-electric-purple border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!resume) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/admin')}
                    className="mb-6 flex items-center gap-2 text-white/60 hover:text-neon-cyan transition-colors"
                >
                    <span>←</span>
                    <span>Back to Dashboard</span>
                </button>

                <GlassCard className="p-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-electric-purple to-neon-sky flex items-center justify-center">
                        <span className="text-4xl">📄</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">No Resume Data Found</h3>
                    <p className="text-white/60 mb-8 max-w-md mx-auto">
                        Get started by creating your initial resume. You can customize all the information after creation.
                    </p>
                    <button
                        onClick={handleCreateInitialResume}
                        disabled={creating}
                        className="px-8 py-4 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {creating ? 'Creating Resume...' : 'Create Initial Resume'}
                    </button>
                    <p className="mt-6 text-sm text-white/40">
                        This will create a resume template that you can edit
                    </p>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header with Back Button and Save */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/admin')}
                        className="flex items-center gap-2 text-white/60 hover:text-neon-cyan transition-colors"
                    >
                        <span>←</span>
                        <span>Back to Dashboard</span>
                    </button>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-electric-purple to-neon-sky bg-clip-text text-transparent">
                        Edit Resume
                    </h2>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="space-y-8">
                {/* Personal Info */}
                <GlassCard className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
                            <input
                                type="text"
                                value={resume.personalInfo.name}
                                onChange={(e) =>
                                    setResume({
                                        ...resume,
                                        personalInfo: { ...resume.personalInfo, name: e.target.value },
                                    })
                                }
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
                            <input
                                type="text"
                                value={resume.personalInfo.title}
                                onChange={(e) =>
                                    setResume({
                                        ...resume,
                                        personalInfo: { ...resume.personalInfo, title: e.target.value },
                                    })
                                }
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                            <input
                                type="email"
                                value={resume.personalInfo.email}
                                onChange={(e) =>
                                    setResume({
                                        ...resume,
                                        personalInfo: { ...resume.personalInfo, email: e.target.value },
                                    })
                                }
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                            <input
                                type="tel"
                                value={resume.personalInfo.phone}
                                onChange={(e) =>
                                    setResume({
                                        ...resume,
                                        personalInfo: { ...resume.personalInfo, phone: e.target.value },
                                    })
                                }
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Location</label>
                            <input
                                type="text"
                                value={resume.personalInfo.location}
                                onChange={(e) =>
                                    setResume({
                                        ...resume,
                                        personalInfo: { ...resume.personalInfo, location: e.target.value },
                                    })
                                }
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-white/80 mb-2">Professional Summary</label>
                        <textarea
                            value={resume.personalInfo.summary}
                            onChange={(e) =>
                                setResume({
                                    ...resume,
                                    personalInfo: { ...resume.personalInfo, summary: e.target.value },
                                })
                            }
                            rows={4}
                            className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                        />
                    </div>
                </GlassCard>

                {/* Note about complex editing */}
                <GlassCard className="p-6 bg-neon-cyan/5 border-neon-cyan/20">
                    <div className="flex gap-3">
                        <span className="text-2xl">ℹ️</span>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">Advanced Editing</h4>
                            <p className="text-white/70 text-sm">
                                For editing Experience, Skills, and Education sections, you can either:
                                <br />• Update data directly in Firestore Console for complex changes
                                <br />• Or extend this interface to include full CRUD for each section
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* Preview Sections */}
                <GlassCard className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Experience ({resume.experience.length})</h3>
                    <div className="space-y-4">
                        {resume.experience.map((exp) => (
                            <div key={exp.id} className="p-4 bg-void-800/30 rounded-lg border border-white/5">
                                <p className="text-white font-bold">{exp.position}</p>
                                <p className="text-neon-cyan text-sm">{exp.company} • {exp.duration}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Skills ({resume.skills.length} categories)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {resume.skills.map((skillGroup, idx) => (
                            <div key={idx} className="p-4 bg-void-800/30 rounded-lg border border-white/5">
                                <p className="text-neon-cyan font-bold mb-2">{skillGroup.category}</p>
                                <p className="text-white/60 text-sm">{skillGroup.items.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Education ({resume.education.length})</h3>
                    <div className="space-y-4">
                        {resume.education.map((edu) => (
                            <div key={edu.id} className="p-4 bg-void-800/30 rounded-lg border border-white/5">
                                <p className="text-white font-bold">{edu.degree}</p>
                                <p className="text-neon-cyan text-sm">{edu.institution} • {edu.year}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getResume, updateResume, createResume } from '@/lib/firebase/firestore';
import { Resume, Experience, Skill, Education, Language } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';
import TagInput from '@/components/ui/TagInput';

export default function AdminResumePage() {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [creating, setCreating] = useState(false);
    const router = useRouter();

    // Section editing states
    const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [editingEducation, setEditingEducation] = useState<Education | null>(null);
    const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
    const [showExpForm, setShowExpForm] = useState(false);
    const [showSkillForm, setShowSkillForm] = useState(false);
    const [showEduForm, setShowEduForm] = useState(false);
    const [showLangForm, setShowLangForm] = useState(false);
    const [editingLangIndex, setEditingLangIndex] = useState<number | null>(null);

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
                    coreObjectives: '',
                    myVision: '',
                    profileImageUrl: '',
                    resumePdfUrl: '',
                },
                experience: [
                    {
                        id: '1',
                        company: 'Example Company',
                        position: 'Software Developer',
                        duration: 'Jan 2020 - Present',
                        responsibilities: ['Developed web applications', 'Collaborated with teams'],
                    },
                ],
                skills: [
                    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript'] },
                    { category: 'Backend', items: ['Node.js', 'Firebase'] },
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
                languages: [
                    { name: 'English', level: 'Native' }
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

    // Experience handlers
    const handleAddExperience = () => {
        const newExp: Experience = {
            id: Date.now().toString(),
            company: '',
            position: '',
            duration: '',
            responsibilities: [''],
        };
        setEditingExperience(newExp);
        setShowExpForm(true);
    };

    const handleEditExperience = (exp: Experience) => {
        setEditingExperience({ ...exp });
        setShowExpForm(true);
    };

    const handleSaveExperience = () => {
        if (!resume || !editingExperience) return;

        const existingIndex = resume.experience.findIndex(e => e.id === editingExperience.id);
        let updatedExperience = [...resume.experience];

        if (existingIndex >= 0) {
            updatedExperience[existingIndex] = editingExperience;
        } else {
            updatedExperience.push(editingExperience);
        }

        setResume({ ...resume, experience: updatedExperience });
        setEditingExperience(null);
        setShowExpForm(false);
    };

    const handleDeleteExperience = (id: string) => {
        if (!resume || !confirm('Delete this experience?')) return;
        setResume({
            ...resume,
            experience: resume.experience.filter(e => e.id !== id),
        });
    };

    // Skill handlers
    const handleAddSkill = () => {
        const newSkill: Skill = { category: '', items: [''] };
        setEditingSkill(newSkill);
        setShowSkillForm(true);
    };

    const handleEditSkill = (skill: Skill, index: number) => {
        setEditingSkill({ ...skill, category: skill.category + `_${index}` }); // Track index
        setShowSkillForm(true);
    };

    const handleSaveSkill = () => {
        if (!resume || !editingSkill) return;

        const categoryParts = editingSkill.category.split('_');
        const isEdit = categoryParts.length > 1;
        const skillIndex = isEdit ? parseInt(categoryParts[1]) : -1;
        const actualCategory = isEdit ? categoryParts[0] : editingSkill.category;

        let updatedSkills = [...resume.skills];
        const skillToSave = { ...editingSkill, category: actualCategory };

        if (isEdit && skillIndex >= 0) {
            updatedSkills[skillIndex] = skillToSave;
        } else {
            updatedSkills.push(skillToSave);
        }

        setResume({ ...resume, skills: updatedSkills });
        setEditingSkill(null);
        setShowSkillForm(false);
    };

    const handleDeleteSkill = (index: number) => {
        if (!resume || !confirm('Delete this skill category?')) return;
        setResume({
            ...resume,
            skills: resume.skills.filter((_, i) => i !== index),
        });
    };

    // Education handlers
    const handleAddEducation = () => {
        const newEdu: Education = {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            field: '',
            year: '',
        };
        setEditingEducation(newEdu);
        setShowEduForm(true);
    };

    const handleEditEducation = (edu: Education) => {
        setEditingEducation({ ...edu });
        setShowEduForm(true);
    };

    const handleSaveEducation = () => {
        if (!resume || !editingEducation) return;

        const existingIndex = resume.education.findIndex(e => e.id === editingEducation.id);
        let updatedEducation = [...resume.education];

        if (existingIndex >= 0) {
            updatedEducation[existingIndex] = editingEducation;
        } else {
            updatedEducation.push(editingEducation);
        }

        setResume({ ...resume, education: updatedEducation });
        setEditingEducation(null);
        setShowEduForm(false);
    };

    const handleDeleteEducation = (id: string) => {
        if (!resume || !confirm('Delete this education entry?')) return;
        setResume({
            ...resume,
            education: resume.education.filter(e => e.id !== id),
        });
    };

    // Language handlers
    const handleAddLanguage = () => {
        const newLang: Language = { name: '', level: 'Native' };
        setEditingLanguage(newLang);
        setEditingLangIndex(null);
        setShowLangForm(true);
    };

    const handleEditLanguage = (lang: Language, index: number) => {
        setEditingLanguage({ ...lang });
        setEditingLangIndex(index);
        setShowLangForm(true);
    };

    const handleSaveLanguage = () => {
        if (!resume || !editingLanguage) return;

        let updatedLanguages = [...(resume.languages || [])];

        if (editingLangIndex !== null) {
            updatedLanguages[editingLangIndex] = editingLanguage;
        } else {
            updatedLanguages.push(editingLanguage);
        }

        setResume({ ...resume, languages: updatedLanguages });
        setEditingLanguage(null);
        setEditingLangIndex(null);
        setShowLangForm(false);
    };

    const handleDeleteLanguage = (index: number) => {
        if (!resume || !confirm('Delete this language?')) return;
        const updatedLanguages = [...(resume.languages || [])];
        updatedLanguages.splice(index, 1);
        setResume({
            ...resume,
            languages: updatedLanguages,
        });
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
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
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
                {/* Personal Info - Existing code stays the same */}
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

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Profile Picture URL</label>
                            <input
                                type="url"
                                value={resume.personalInfo.profileImageUrl || ''}
                                onChange={(e) =>
                                    setResume({
                                        ...resume,
                                        personalInfo: { ...resume.personalInfo, profileImageUrl: e.target.value },
                                    })
                                }
                                placeholder="https://firebasestorage.googleapis.com/..."
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                            />
                            {resume.personalInfo.profileImageUrl && (
                                <div className="mt-3">
                                    <img
                                        src={resume.personalInfo.profileImageUrl}
                                        alt="Profile preview"
                                        className="w-20 h-20 rounded-full object-cover border-2 border-neon-cyan/50"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Resume PDF URL</label>
                            <input
                                type="url"
                                value={resume.personalInfo.resumePdfUrl || ''}
                                onChange={(e) =>
                                    setResume({
                                        ...resume,
                                        personalInfo: { ...resume.personalInfo, resumePdfUrl: e.target.value },
                                    })
                                }
                                placeholder="https://example.com/resume.pdf"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Core Objectives (Each line will be a list item)</label>
                            <textarea
                                value={resume.personalInfo.coreObjectives || ''}
                                onChange={(e) =>
                                    setResume({
                                        ...resume,
                                        personalInfo: { ...resume.personalInfo, coreObjectives: e.target.value },
                                    })
                                }
                                rows={4}
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                                placeholder="Write your core objectives here..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">My Vision</label>
                            <textarea
                                value={resume.personalInfo.myVision || ''}
                                onChange={(e) =>
                                    setResume({
                                        ...resume,
                                        personalInfo: { ...resume.personalInfo, myVision: e.target.value },
                                    })
                                }
                                rows={4}
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                                placeholder="Write your vision here..."
                            />
                        </div>
                    </div>
                </GlassCard>

                {/* Experience Section */}
                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">Experience ({resume.experience.length})</h3>
                        <button
                            onClick={handleAddExperience}
                            className="px-4 py-2 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg text-white font-medium hover:shadow-lg transition-all"
                        >
                            + Add Experience
                        </button>
                    </div>

                    {showExpForm && editingExperience && (
                        <div className="mb-6 p-4 bg-void-800/30 rounded-lg border border-neon-cyan/30">
                            <h4 className="text-lg font-bold text-white mb-4">
                                {resume.experience.some(e => e.id === editingExperience.id) ? 'Edit' : 'Add'} Experience
                            </h4>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Position"
                                    value={editingExperience.position}
                                    onChange={(e) => setEditingExperience({ ...editingExperience, position: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={editingExperience.company}
                                    onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Duration (e.g., Jan 2020 - Present)"
                                    value={editingExperience.duration}
                                    onChange={(e) => setEditingExperience({ ...editingExperience, duration: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                />
                                <div>
                                    <label className="block text-sm text-white/70 mb-2">Responsibilities (one per line)</label>
                                    <textarea
                                        placeholder="• Developed features&#10;• Led projects"
                                        value={editingExperience.responsibilities.join('\n')}
                                        onChange={(e) => setEditingExperience({
                                            ...editingExperience,
                                            responsibilities: e.target.value.split('\n').filter(r => r.trim())
                                        })}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSaveExperience}
                                        className="px-6 py-2 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg text-white font-medium"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => { setShowExpForm(false); setEditingExperience(null); }}
                                        className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {resume.experience.map((exp) => (
                            <div key={exp.id} className="p-4 bg-void-800/30 rounded-lg border border-white/5">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-white font-bold">{exp.position}</p>
                                        <p className="text-neon-cyan text-sm">{exp.company} • {exp.duration}</p>
                                        <ul className="mt-2 text-white/60 text-sm space-y-1">
                                            {exp.responsibilities.map((resp, i) => (
                                                <li key={i}>• {resp}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleEditExperience(exp)}
                                            className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteExperience(exp.id)}
                                            className="px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 rounded text-red-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Skills Section */}
                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">Skills ({resume.skills.length})</h3>
                        <button
                            onClick={handleAddSkill}
                            className="px-4 py-2 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg text-white font-medium hover:shadow-lg transition-all"
                        >
                            + Add Skill Category
                        </button>
                    </div>

                    {showSkillForm && editingSkill && (
                        <div className="mb-6 p-4 bg-void-800/30 rounded-lg border border-neon-cyan/30">
                            <h4 className="text-lg font-bold text-white mb-4">Add/Edit Skill Category</h4>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Category (e.g., Frontend)"
                                    value={editingSkill.category.split('_')[0]}
                                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                />
                                <div>
                                    <label className="block text-sm text-white/70 mb-2">Skills (Press Enter or comma to add)</label>
                                    <TagInput
                                        tags={editingSkill.items}
                                        setTags={(newTags) => setEditingSkill({ ...editingSkill, items: newTags })}
                                        placeholder="Add a skill (e.g., React)"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSaveSkill}
                                        className="px-6 py-2 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg text-white font-medium"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => { setShowSkillForm(false); setEditingSkill(null); }}
                                        className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {resume.skills.map((skillGroup, idx) => (
                            <div key={idx} className="p-4 bg-void-800/30 rounded-lg border border-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-neon-cyan font-bold">{skillGroup.category}</p>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleEditSkill(skillGroup, idx)}
                                            className="px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSkill(idx)}
                                            className="px-2 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 rounded text-red-200"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                                <p className="text-white/60 text-sm">{skillGroup.items.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Education Section */}
                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">Education ({resume.education.length})</h3>
                        <button
                            onClick={handleAddEducation}
                            className="px-4 py-2 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg text-white font-medium hover:shadow-lg transition-all"
                        >
                            + Add Education
                        </button>
                    </div>

                    {showEduForm && editingEducation && (
                        <div className="mb-6 p-4 bg-void-800/30 rounded-lg border border-neon-cyan/30">
                            <h4 className="text-lg font-bold text-white mb-4">
                                {resume.education.some(e => e.id === editingEducation.id) ? 'Edit' : 'Add'} Education
                            </h4>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Degree (e.g., Bachelor of Science)"
                                    value={editingEducation.degree}
                                    onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Institution"
                                    value={editingEducation.institution}
                                    onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Field of Study (optional)"
                                    value={editingEducation.field || ''}
                                    onChange={(e) => setEditingEducation({ ...editingEducation, field: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Year (e.g., 2016 - 2020)"
                                    value={editingEducation.year}
                                    onChange={(e) => setEditingEducation({ ...editingEducation, year: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                />
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSaveEducation}
                                        className="px-6 py-2 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg text-white font-medium"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => { setShowEduForm(false); setEditingEducation(null); }}
                                        className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {resume.education.map((edu) => (
                            <div key={edu.id} className="p-4 bg-void-800/30 rounded-lg border border-white/5">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-white font-bold">{edu.degree}</p>
                                        <p className="text-neon-cyan text-sm">{edu.institution}</p>
                                        {edu.field && <p className="text-white/60 text-sm">{edu.field}</p>}
                                        <p className="text-white/60 text-sm">{edu.year}</p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleEditEducation(edu)}
                                            className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteEducation(edu.id)}
                                            className="px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 rounded text-red-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Languages Section */}
                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">Languages ({(resume.languages || []).length})</h3>
                        <button
                            onClick={handleAddLanguage}
                            className="px-4 py-2 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg text-white font-medium hover:shadow-lg transition-all"
                        >
                            + Add Language
                        </button>
                    </div>

                    {showLangForm && editingLanguage && (
                        <div className="mb-6 p-4 bg-void-800/30 rounded-lg border border-neon-cyan/30">
                            <h4 className="text-lg font-bold text-white mb-4">
                                {editingLangIndex !== null ? 'Edit' : 'Add'} Language
                            </h4>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Language (e.g., English)"
                                    value={editingLanguage.name}
                                    onChange={(e) => setEditingLanguage({ ...editingLanguage, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                                />
                                <select
                                    value={editingLanguage.level}
                                    onChange={(e) => setEditingLanguage({ ...editingLanguage, level: e.target.value })}
                                    className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                                >
                                    <option value="" disabled className="bg-void-900 text-white/40">Select Proficiency Level</option>
                                    <option value="Native" className="bg-void-900 text-white">Native</option>
                                    <option value="Fluent" className="bg-void-900 text-white">Fluent</option>
                                    <option value="Advanced (C1/C2)" className="bg-void-900 text-white">Advanced (C1/C2)</option>
                                    <option value="Upper Intermediate (B2)" className="bg-void-900 text-white">Upper Intermediate (B2)</option>
                                    <option value="Intermediate (B1)" className="bg-void-900 text-white">Intermediate (B1)</option>
                                    <option value="Pre-Intermediate (A2)" className="bg-void-900 text-white">Pre-Intermediate (A2)</option>
                                    <option value="Elementary (A1)" className="bg-void-900 text-white">Elementary (A1)</option>
                                    <option value="Beginner" className="bg-void-900 text-white">Beginner</option>
                                </select>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSaveLanguage}
                                        className="px-6 py-2 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg text-white font-medium"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => { setShowLangForm(false); setEditingLanguage(null); setEditingLangIndex(null); }}
                                        className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(resume.languages || []).map((lang, idx) => (
                            <div key={idx} className="p-4 bg-void-800/30 rounded-lg border border-white/5">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-white font-bold">{lang.name}</p>
                                        <p className="text-neon-cyan text-sm">{lang.level}</p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleEditLanguage(lang, idx)}
                                            className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteLanguage(idx)}
                                            className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 rounded text-red-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

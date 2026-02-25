'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSettings, updateSettings } from '@/lib/firebase/firestore';
import { AppSettings } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<AppSettings | null>(null);
    const [formData, setFormData] = useState<Omit<AppSettings, 'id' | 'updatedAt'>>({
        accentColor: '#22d3ee',
        secondaryColor: '#7c3aed',
        siteName: 'AJM Digital Solution',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await getSettings();
            setSettings(data);
            setFormData({
                accentColor: data.accentColor,
                secondaryColor: data.secondaryColor,
                siteName: data.siteName,
            });
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSettings(formData);

            // Apply theme immediately to current window
            document.documentElement.style.setProperty('--accent-color', formData.accentColor);
            document.documentElement.style.setProperty('--secondary-color', formData.secondaryColor);

            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating settings:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`Failed to update settings: ${errorMessage}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-electric-purple border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <button
                onClick={() => router.push('/admin')}
                className="mb-8 flex items-center gap-2 text-white/60 hover:text-neon-cyan transition-colors"
            >
                <span>←</span>
                <span>Back to Dashboard</span>
            </button>

            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-electric-purple to-neon-sky bg-clip-text text-transparent">
                System Settings
            </h2>

            <form onSubmit={handleSave} className="space-y-8">
                <GlassCard className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>🎨</span> Appearance & Theme
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Accent Color */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-white/80">
                                Accent Color (Default: Cyan)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    value={formData.accentColor}
                                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                                    className="w-16 h-16 bg-transparent border-2 border-white/10 rounded-lg cursor-pointer transition-transform hover:scale-105"
                                />
                                <input
                                    type="text"
                                    value={formData.accentColor}
                                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                                    className="flex-1 px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white font-mono uppercase"
                                />
                            </div>
                            <p className="text-sm text-white/40">Used for links, glows, and highlights.</p>
                        </div>

                        {/* Secondary Color */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-white/80">
                                Secondary Color (Default: Purple)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    value={formData.secondaryColor}
                                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                                    className="w-16 h-16 bg-transparent border-2 border-white/10 rounded-lg cursor-pointer transition-transform hover:scale-105"
                                />
                                <input
                                    type="text"
                                    value={formData.secondaryColor}
                                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                                    className="flex-1 px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white font-mono uppercase"
                                />
                            </div>
                            <p className="text-sm text-white/40">Used for card gradients and secondary elements.</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>🌐</span> General Information
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Site Name
                        </label>
                        <input
                            type="text"
                            value={formData.siteName}
                            onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                            className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white"
                        />
                    </div>
                </GlassCard>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-4 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 disabled:opacity-50"
                    >
                        {saving ? 'Saving System Settings...' : 'Save All Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}

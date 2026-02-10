import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-electric-purple to-neon-sky bg-clip-text text-transparent">
                Welcome to Admin Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Projects Management Card */}
                <Link href="/admin/projects">
                    <GlassCard className="p-8 hover cursor-pointer" hover>
                        <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-electric-purple to-neon-cyan flex items-center justify-center">
                            <span className="text-3xl">💼</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Manage Projects</h3>
                        <p className="text-white/70 mb-4">
                            Create, edit, and delete your portfolio projects. Update titles, descriptions, tech stacks, and links.
                        </p>
                        <div className="text-neon-cyan font-medium flex items-center gap-2">
                            Open Projects Manager
                            <span>→</span>
                        </div>
                    </GlassCard>
                </Link>

                {/* Resume Management Card */}
                <Link href="/admin/resume">
                    <GlassCard className="p-8 hover cursor-pointer" hover>
                        <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-neon-sky to-electric-indigo flex items-center justify-center">
                            <span className="text-3xl">📄</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Edit Resume</h3>
                        <p className="text-white/70 mb-4">
                            Update your professional experience, skills, education, and personal information in real-time.
                        </p>
                        <div className="text-neon-sky font-medium flex items-center gap-2">
                            Open Resume Editor
                            <span>→</span>
                        </div>
                    </GlassCard>
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GlassCard className="p-6">
                        <div className="text-3xl mb-2">🏠</div>
                        <a href="/" target="_blank" className="text-neon-cyan hover:underline font-medium">
                            View Public Portfolio
                        </a>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <div className="text-3xl mb-2">📊</div>
                        <p className="text-white/70">Analytics</p>
                        <p className="text-sm text-white/50 mt-1">Coming soon...</p>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <div className="text-3xl mb-2">⚙️</div>
                        <p className="text-white/70">Settings</p>
                        <p className="text-sm text-white/50 mt-1">Coming soon...</p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmail, registerWithEmail } from '@/lib/firebase/auth';
import GlassCard from '@/components/ui/GlassCard';

type AuthMode = 'login' | 'register';

export default function LoginPage() {
    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authKey, setAuthKey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'register') {
                // Validate authentication key
                if (authKey !== process.env.NEXT_PUBLIC_AUTH_KEY) {
                    setError('Invalid authentication key. You are not authorized to create an account.');
                    setLoading(false);
                    return;
                }

                // Validate password match
                if (password !== confirmPassword) {
                    setError('Passwords do not match.');
                    setLoading(false);
                    return;
                }

                // Validate password length
                if (password.length < 6) {
                    setError('Password must be at least 6 characters long.');
                    setLoading(false);
                    return;
                }

                // Register user
                await registerWithEmail(email, password);
                router.push('/admin');
            } else {
                // Login user
                await loginWithEmail(email, password);
                router.push('/admin');
            }
        } catch (err: any) {
            const errorMessage = err.code === 'auth/email-already-in-use'
                ? 'This email is already registered. Please login instead.'
                : err.code === 'auth/invalid-email'
                    ? 'Invalid email address.'
                    : err.code === 'auth/weak-password'
                        ? 'Password is too weak. Please use a stronger password.'
                        : err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
                            ? 'Invalid email or password.'
                            : err.message || `Failed to ${mode}. Please try again.`;

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAuthKey('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <GlassCard className="w-full max-w-md p-8">
                {/* Logo/Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-electric-purple to-neon-cyan flex items-center justify-center">
                    <span className="text-2xl">{mode === 'login' ? '🔐' : '✨'}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent">
                    {mode === 'login' ? 'Admin Login' : 'Create Account'}
                </h1>
                <p className="text-center text-white/60 mb-8">
                    {mode === 'login'
                        ? 'Sign in to manage your portfolio'
                        : 'Register a new admin account'}
                </p>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm">
                        {error}
                    </div>
                )}

                {/* Auth Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                            placeholder="admin@example.com"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-electric-purple focus:ring-2 focus:ring-electric-purple/20 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Confirm Password Field (Register only) */}
                    {mode === 'register' && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-electric-purple focus:ring-2 focus:ring-electric-purple/20 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    {/* Authentication Key Field (Register only) */}
                    {mode === 'register' && (
                        <div>
                            <label htmlFor="authKey" className="block text-sm font-medium text-white/80 mb-2">
                                Authentication Key
                            </label>
                            <input
                                type="text"
                                id="authKey"
                                value={authKey}
                                onChange={(e) => setAuthKey(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-void-800/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-sky focus:ring-2 focus:ring-neon-sky/20 transition-all"
                                placeholder="Enter authentication key"
                            />
                            <p className="mt-2 text-xs text-white/50">
                                Required to prevent unauthorized account creation
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-electric-purple to-neon-cyan rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
                            : (mode === 'login' ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                {/* Mode Toggle */}
                <div className="mt-6 text-center">
                    <button
                        onClick={switchMode}
                        className="text-sm text-neon-cyan hover:text-neon-sky transition-colors"
                    >
                        {mode === 'login'
                            ? "Don't have an account? Register here"
                            : 'Already have an account? Login here'}
                    </button>
                </div>

                {/* Back to Home */}
                <div className="mt-4 text-center">
                    <a href="/" className="text-sm text-white/60 hover:text-neon-cyan transition-colors">
                        ← Back to Portfolio
                    </a>
                </div>
            </GlassCard>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { submitMessage, getResume } from '@/lib/firebase/firestore';
import { Resume } from '@/lib/types';
import GlassCard from '../ui/GlassCard';
import ScrollReveal from '../ui/ScrollReveal';

export default function ContactSection() {
    const [resume, setResume] = useState<Resume | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        const fetchResume = async () => {
            const data = await getResume();
            setResume(data);
        };
        fetchResume();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await submitMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error submitting message:', error);
            setStatus('error');
        }
    };

    const whatsappUrl = resume?.personalInfo.phone 
        ? `https://wa.me/${resume.personalInfo.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi, I reached out via your portfolio!')}`
        : '#';

    const emailUrl = resume?.personalInfo.email 
        ? `mailto:${resume.personalInfo.email}?subject=Contact from Portfolio`
        : '#';

    return (
        <section id="contact" className="py-24 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-electric-purple/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-neon-cyan via-electric-purple to-neon-sky bg-clip-text text-transparent">
                            Get In Touch
                        </h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                            Have a project in mind or just want to say hello? I'm always open to discussing new opportunities and creative ideas.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info & Links */}
                    <ScrollReveal delay={200}>
                        <div className="space-y-8">
                            <h3 className="text-3xl font-bold text-white mb-6">Let's Connect</h3>
                            <p className="text-white/70 leading-relaxed mb-8">
                                Feel free to reach out through the form, or use the direct links below to chat via WhatsApp or send an email.
                            </p>

                            <div className="flex flex-col gap-4">
                                <a 
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-neon-cyan/50 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Chat on WhatsApp</p>
                                        <p className="text-white/50 text-sm">{resume?.personalInfo.phone || 'Loading...'}</p>
                                    </div>
                                </a>

                                <a 
                                    href={emailUrl}
                                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-electric-purple/50 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-electric-purple/20 flex items-center justify-center text-electric-purple group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Email Me</p>
                                        <p className="text-white/50 text-sm">{resume?.personalInfo.email || 'Loading...'}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Motto</p>
                                <p className="text-2xl font-light italic text-neon-sky">
                                    "Empowering Tomorrow, One Line at a Time"
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Contact Form */}
                    <ScrollReveal delay={400}>
                        <GlassCard className="p-8 md:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 ml-1">Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 ml-1">Email</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 ml-1">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Project Subject"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 ml-1">Message</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can I help you?"
                                        rows={5}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 outline-none transition-all resize-none"
                                    />
                                </div>

                                <button
                                    disabled={status === 'submitting'}
                                    type="submit"
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3
                                        ${status === 'success' 
                                            ? 'bg-emerald-500 text-white' 
                                            : 'bg-gradient-to-r from-electric-purple to-neon-cyan text-white hover:shadow-lg hover:shadow-neon-cyan/30 active:scale-95'
                                        }`}
                                >
                                    {status === 'submitting' ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : status === 'success' ? (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Send Message
                                        </>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-400 text-center text-sm">Oops! Something went wrong. Please try again.</p>
                                )}
                            </form>
                        </GlassCard>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

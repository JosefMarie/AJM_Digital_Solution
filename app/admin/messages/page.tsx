'use client';

import React, { useEffect, useState } from 'react';
import { getMessages, deleteMessage } from '@/lib/firebase/firestore';
import { ContactMessage } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const data = await getMessages();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            await deleteMessage(id);
            setMessages(messages.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message.');
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-neon-sky bg-clip-text text-transparent">
                    Message Inbox ({messages.length})
                </h2>
                <button 
                    onClick={fetchMessages}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all font-medium"
                >
                    Refresh
                </button>
            </div>

            {messages.length === 0 ? (
                <GlassCard className="p-12 text-center">
                    <p className="text-xl text-white/50">No messages found.</p>
                </GlassCard>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {messages.map((msg) => (
                        <GlassCard key={msg.id} className="p-8 group relative">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-widest">
                                            {msg.subject}
                                        </span>
                                        <span className="text-white/30 text-xs font-mono">
                                            {msg.createdAt.toLocaleDateString()} {msg.createdAt.toLocaleTimeString()}
                                        </span>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{msg.name}</h3>
                                        <p className="text-neon-cyan text-sm">{msg.email}</p>
                                    </div>

                                    <div className="bg-void-900/50 border border-white/5 rounded-xl p-4 text-white/80 leading-relaxed whitespace-pre-wrap italic">
                                        "{msg.message}"
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col justify-end gap-3 self-end md:self-start">
                                    <a 
                                        href={`mailto:${msg.email}?subject=RE: ${msg.subject}`}
                                        className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan rounded-lg text-sm font-bold hover:bg-neon-cyan/30 transition-all text-center"
                                    >
                                        Reply
                                    </a>
                                    <button 
                                        onClick={() => handleDelete(msg.id)}
                                        className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500/20 transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </div>
    );
}

'use client';

import React from 'react';

export default function FluidBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-void-900">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-fluid-gradient opacity-50"></div>

            {/* Animated fluid blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-electric-indigo rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Additional accent blobs */}
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-neon-sky rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float"></div>

            {/* Radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void-900/50 to-void-900"></div>
        </div>
    );
}

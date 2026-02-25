'use client';

import { useEffect } from 'react';
import { getSettings } from '@/lib/firebase/firestore';

export default function ThemeInitializer() {
    useEffect(() => {
        const applyTheme = async () => {
            try {
                const settings = await getSettings();
                if (settings) {
                    const root = document.documentElement;
                    root.style.setProperty('--accent-color', settings.accentColor);
                    root.style.setProperty('--secondary-color', settings.secondaryColor);

                    // Optional: Update site tile if desired
                    if (settings.siteName) {
                        // document.title = settings.siteName; // Be careful with this in a metadata-controlled environment
                    }
                }
            } catch (error) {
                console.error('Failed to initialize theme:', error);
            }
        };

        applyTheme();
    }, []);

    return null; // This component doesn't render anything
}

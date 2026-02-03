'use client';

import { useEffect } from 'react';
import { getSettings, applySettings } from '@/lib/settings';

export default function SettingsInitializer() {
    useEffect(() => {
        // Load and apply settings on mount
        const settings = getSettings();
        applySettings(settings);
    }, []);

    return null;
}

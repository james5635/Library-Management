'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from '@/lib/translations';
import { getSettings, saveSettings } from '@/lib/settings';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Load language from settings
        const settings = getSettings();
        setLanguageState(settings.language as Language);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        const settings = getSettings();
        saveSettings({ ...settings, language: lang });
    };

    const value: LanguageContextType = {
        language,
        setLanguage,
        t: translations[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

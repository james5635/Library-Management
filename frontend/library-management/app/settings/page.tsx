'use client';

import { useState, useEffect } from 'react';
import { Type, Globe, Check } from 'lucide-react';
import { getSettings, saveSettings, FONT_SIZES, LANGUAGES, AppSettings } from '@/lib/settings';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>(getSettings());
    const [saved, setSaved] = useState(false);
    const { t, setLanguage } = useLanguage();

    useEffect(() => {
        // Load settings on mount
        setSettings(getSettings());
    }, []);

    const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
        const newSettings = { ...settings, fontSize: size };
        setSettings(newSettings);
        saveSettings(newSettings);
        showSavedMessage();
    };

    const handleLanguageChange = (lang: 'en' | 'km' | 'ja') => {
        const newSettings = { ...settings, language: lang };
        setSettings(newSettings);
        saveSettings(newSettings);
        setLanguage(lang); // Trigger language change in context
        showSavedMessage();
    };

    const showSavedMessage = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="flex flex-col gap-8">
                {/* Font Size Section */}
                <div className="bg-white dark:bg-gray-900 rounded-[40px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                            <Type className="text-brand-teal" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 italic">{t.fontSize}</h2>
                            <p className="text-xs text-gray-400">Adjust text size for better readability</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {(['small', 'medium', 'large'] as const).map((size) => (
                            <button
                                key={size}
                                onClick={() => handleFontSizeChange(size)}
                                className={`relative p-6 rounded-2xl border-2 transition-all ${settings.fontSize === size
                                    ? 'border-brand-teal bg-teal-50 dark:bg-teal-900/20'
                                    : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                    }`}
                            >
                                {settings.fontSize === size && (
                                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center">
                                        <Check size={14} className="text-white" />
                                    </div>
                                )}
                                <div className="text-center">
                                    <div className={`font-bold mb-2 ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'
                                        } text-gray-800 dark:text-gray-100`}>
                                        Aa
                                    </div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        {t[size]}
                                    </div>
                                    <div className="text-[10px] text-gray-400 mt-1">
                                        {FONT_SIZES[size]}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Language Section */}
                <div className="bg-white dark:bg-gray-900 rounded-[40px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Globe className="text-blue-500" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 italic">{t.language}</h2>
                            <p className="text-xs text-gray-400">Choose your preferred language</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code as any)}
                                className={`relative p-5 rounded-2xl border-2 transition-all ${settings.language === lang.code
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                    }`}
                            >
                                {settings.language === lang.code && (
                                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                        <Check size={12} className="text-white" />
                                    </div>
                                )}
                                <div className="text-center">
                                    <div className="text-3xl mb-2">{lang.flag}</div>
                                    <div className="text-sm font-bold text-gray-800 dark:text-gray-100">
                                        {lang.name}
                                    </div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                        {lang.code}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Save Indicator */}
                {saved && (
                    <div className="fixed bottom-8 right-8 bg-brand-teal text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-300">
                        <Check size={20} />
                        <span className="font-bold">{t.settingsSaved}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

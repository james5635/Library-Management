'use client';

import { useState, useEffect } from 'react';
import { getSettings, saveSettings, FONT_SIZES, LANGUAGES, AppSettings } from '@/lib/settings';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';
import { Check, Globe, Type } from 'lucide-react';

export default function SettingsPage() {
    const { t, language, setLanguage } = useLanguage();
    const [fontSize, setFontSize] = useState<AppSettings['fontSize']>('medium');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const settings = getSettings();
        setFontSize(settings.fontSize);
    }, []);

    const handleSave = () => {
        saveSettings({ fontSize, language });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="max-w-[600px] mx-auto py-8 flex flex-col gap-8">
            {/* Font Size */}
            <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                        <Type size={20} className="text-orange-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t.fontSize}</h2>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Choose your preferred text size</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    {(['small', 'medium', 'large'] as const).map(s => (
                        <button
                            key={s}
                            onClick={() => setFontSize(s)}
                            className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-all ${
                                fontSize === s
                                    ? 'bg-brand-teal text-white shadow-lg shadow-teal-500/20'
                                    : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            {t[s]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Language */}
            <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                        <Globe size={20} className="text-blue-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t.language}</h2>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Select your language</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code as Language)}
                            className={`flex items-center gap-3 py-4 px-5 rounded-2xl transition-all ${
                                language === lang.code
                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800'
                                    : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            <span className="text-xl">{lang.flag}</span>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{lang.name}</span>
                            {language === lang.code && <Check size={18} className="ml-auto text-blue-500" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Save */}
            <button
                onClick={handleSave}
                className="bg-brand-teal text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-transform text-sm"
            >
                {saved ? (
                    <span className="flex items-center justify-center gap-2">
                        <Check size={18} /> {t.settingsSaved}
                    </span>
                ) : t.save}
            </button>
        </div>
    );
}

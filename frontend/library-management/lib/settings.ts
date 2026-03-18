export interface AppSettings {
    fontSize: 'small' | 'medium' | 'large';
    language: 'en' | 'km' | 'ja' | 'zh' | 'ko';
}

const DEFAULT_SETTINGS: AppSettings = {
    fontSize: 'medium',
    language: 'en'
};

export const FONT_SIZES = {
    small: '14px',
    medium: '16px',
    large: '18px'
};

export const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'km', name: 'Khmer', flag: '🇰🇭' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' }
];

export function getSettings(): AppSettings {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;

    try {
        const stored = localStorage.getItem('app-settings');
        if (stored) {
            return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        }
    } catch (error) {
        console.error('Failed to load settings:', error);
    }

    return DEFAULT_SETTINGS;
}

export function saveSettings(settings: AppSettings): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem('app-settings', JSON.stringify(settings));
        document.documentElement.style.setProperty('--base-font-size', FONT_SIZES[settings.fontSize]);
    } catch (error) {
        console.error('Failed to save settings:', error);
    }
}

export function applySettings(settings: AppSettings): void {
    if (typeof window === 'undefined') return;
    document.documentElement.style.setProperty('--base-font-size', FONT_SIZES[settings.fontSize]);
}

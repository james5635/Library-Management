'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register') || pathname?.startsWith('/forgot-password');

    if (isAuthPage) {
        return <>{children}</>;
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.className = newTheme;
    };

    return (
        <div className={`flex min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-[#F8F9FA] dark:bg-black transition-colors`}>
            <Sidebar isCollapsed={isCollapsed} />
            <div className="flex-1 flex flex-col">
                <Topbar
                    onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
                    onToggleTheme={toggleTheme}
                    isDark={theme === 'dark'}
                />
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

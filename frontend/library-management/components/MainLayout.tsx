'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register') || pathname?.startsWith('/forgot-password');

    useEffect(() => {
        if (!loading && !user && !isAuthPage) {
            router.push('/login');
        }
    }, [user, loading, isAuthPage, router]);

    if (isAuthPage) {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" />
                    <span className="text-gray-400 text-sm font-medium">Loading...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
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

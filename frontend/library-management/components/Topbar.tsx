'use client';

import { Search, SlidersHorizontal, Bell, ChevronDown, Menu, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { api } from '@/lib/api';

interface TopbarProps {
    onToggleSidebar: () => void;
    onToggleTheme: () => void;
    isDark: boolean;
}

function TopbarContent({ onToggleSidebar, onToggleTheme, isDark }: TopbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [notifications, setNotifications] = useState<any[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        api.notifications?.getAll().then(setNotifications).catch(console.error);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/?q=${encodeURIComponent(searchQuery)}`);
    };

    const getPageTitle = () => {
        switch (pathname) {
            case '/': return 'Dashboard';
            case '/librarian': return 'Librarian';
            case '/chatbot': return 'Chatbot';
            case '/bookmark': return 'Bookmark';
            case '/profile': return 'Profile';
            case '/management/books': return 'Book Management';
            case '/management/members': return 'Member';
            case '/management/loans': return 'Loan';
            case '/management/books/add': return 'Add book';
            default:
                if (pathname?.startsWith('/book/')) return 'Book';
                return 'Dashboard';
        }
    };

    return (
        <div className="h-[80px] flex items-center justify-between px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-10 dark:bg-black/50 transition-colors">
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-500"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-6">
                <form onSubmit={handleSearch} className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Book"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-[300px] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal text-sm transition-all text-gray-700 dark:text-gray-200"
                    />
                </form>

                <button className="p-2 bg-brand-yellow rounded-lg text-white hover:opacity-90 transition-opacity">
                    <SlidersHorizontal size={20} />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Bell size={20} />
                        {notifications.length > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-red rounded-full"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-[300px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl z-50 p-4">
                            <h3 className="text-sm font-bold mb-3 dark:text-white">Notifications</h3>
                            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                                {notifications.length > 0 ? notifications.map(n => (
                                    <div key={n.id} className="text-xs p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors border-b last:border-0 border-gray-50 dark:border-gray-800">
                                        <div className="font-semibold dark:text-gray-200">{n.type || 'INFO'}</div>
                                        <div className="text-gray-500 dark:text-gray-400">{n.message}</div>
                                    </div>
                                )) : (
                                    <div className="text-gray-400 text-center py-4">No notifications</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={onToggleTheme}
                    className="p-2 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="flex items-center gap-3 px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                        <Image src="/static/UI/login.png" alt="User" width={32} height={32} className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold leading-tight">Sou Chanrojame</span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>
            </div>
        </div>
    );
}

export default function Topbar(props: TopbarProps) {
    return (
        <Suspense fallback={<div className="h-[80px] bg-white/50 dark:bg-black/50" />}>
            <TopbarContent {...props} />
        </Suspense>
    );
}

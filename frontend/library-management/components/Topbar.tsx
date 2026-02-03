'use client';

import { Search, SlidersHorizontal, Bell, ChevronDown, Menu, Sun, Moon, Mail, Phone, Clock } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { api, STORAGE_BASE_URL } from '@/lib/api';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
    const [user, setUser] = useState<any>(null);
    const [showProfile, setShowProfile] = useState(false);
    const userEmail = "chanrojame@example.com";

    useEffect(() => {
        api.notifications?.getAll().then(setNotifications).catch(console.error);

        // Fetch user info for top bar
        api.readers.getAll().then(readers => {
            const found = readers.find((r: any) => r.email === userEmail);
            if (found) setUser(found);
        }).catch(console.error);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/?q=${encodeURIComponent(searchQuery)}`);
    };

    const getFullImageUrl = (path: string) => {
        if (!path) return "/static/UI/login.png";
        if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/static')) return path;
        return `${STORAGE_BASE_URL}${path}`;
    };

    const getPageTitle = () => {
        switch (pathname) {
            case '/': return 'Dashboard';
            case '/books': return 'Books';
            case '/librarian': return 'Librarian';
            case '/chatbot': return 'Chatbot';
            case '/bookmark': return 'Bookmark';
            case '/management/books': return 'Book Management';
            case '/management/members': return 'Member';
            case '/management/loans': return 'Loan';
            case '/management/fines': return 'Fine';
            case '/management/reports': return 'Report';
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
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">{getPageTitle()}</h1>
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
                        className="pl-10 pr-4 py-2 w-[300px] border-none bg-gray-50 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm transition-all text-gray-700 dark:text-gray-200"
                    />
                </form>

                <button className="p-2 bg-brand-yellow rounded-lg text-white hover:opacity-90 transition-opacity">
                    <SlidersHorizontal size={20} />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 border border-gray-100 dark:border-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Bell size={20} />
                        {notifications.length > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-red rounded-full"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-[300px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl z-50 p-4 animate-in slide-in-from-top-2 duration-200">
                            <h3 className="text-sm font-bold mb-3 dark:text-white">Notifications</h3>
                            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                                {notifications.length > 0 ? notifications.map(n => (
                                    <div key={n.id} className="text-xs p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors border-b last:border-0 border-gray-50 dark:border-gray-800">
                                        <div className="font-semibold dark:text-gray-200 uppercase text-[10px] tracking-widest text-brand-teal mb-1">{n.type || 'INFO'}</div>
                                        <div className="text-gray-600 dark:text-gray-400">{n.message}</div>
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
                    className="p-2 border border-gray-100 dark:border-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="relative">
                    <div
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-3 px-3 py-1.5 border border-gray-100 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 flex-shrink-0 relative">
                            <Image
                                src={getFullImageUrl(user?.profileImage)}
                                alt="User"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold leading-tight uppercase tracking-tight">
                                {user ? `${user.firstName} ${user.lastName[0]}.` : 'Loading...'}
                            </span>
                        </div>
                        <ChevronDown size={14} className={cn("text-gray-400 transition-transform", showProfile && "rotate-180")} />
                    </div>

                    {showProfile && user && (
                        <div className="absolute right-0 mt-2 w-[280px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] shadow-2xl z-50 p-6 animate-in slide-in-from-top-2 duration-300 transition-colors">
                            <div className="flex flex-col items-center gap-4 border-b border-gray-50 dark:border-gray-800 pb-6 mb-6">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-teal-50 dark:border-teal-900/30 relative">
                                    <Image
                                        src={getFullImageUrl(user.profileImage)}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 italic">{user.firstName} {user.lastName}</h3>
                                    <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">Librarian</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email</span>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-gray-50 dark:border-gray-800 group">
                                        <Mail size={14} className="text-gray-400" />
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Joined</span>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-gray-50 dark:border-gray-800">
                                        <Clock size={14} className="text-gray-400" />
                                        {user.joinDate}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Phone</span>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-gray-50 dark:border-gray-800">
                                        <Phone size={14} className="text-gray-400" />
                                        {user.phoneNumber || 'N/A'}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-50 dark:border-gray-800">
                                <button
                                    onClick={() => setShowProfile(false)}
                                    className="w-full py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl transition-colors uppercase tracking-widest"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
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

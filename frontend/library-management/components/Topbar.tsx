'use client';

import { Search, SlidersHorizontal, Bell, ChevronDown, Menu, Sun, Moon, Mail, Phone, Clock, LogOut, User, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { api, STORAGE_BASE_URL } from '@/lib/api';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

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
    const [showProfile, setShowProfile] = useState(false);
    const { user, logout } = useAuth();
    const { t } = useLanguage();

    useEffect(() => {
        api.notifications?.getAll().then(setNotifications).catch(console.error);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/books?q=${encodeURIComponent(searchQuery)}`);
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const getPageTitle = () => {
        switch (pathname) {
            case '/': return t.dashboard;
            case '/books': return t.books;
            case '/librarian': return t.librarian;
            case '/chatbot': return t.aiAssistant;
            case '/bookmark': return t.bookmark;
            case '/settings': return t.settings;
            case '/management/books': return t.bookManagement;
            case '/management/members': return t.member;
            case '/management/loans': return t.loan;
            case '/management/fines': return t.fine;
            case '/management/reports': return t.report;
            case '/management/staff': return t.staff;
            case '/management/books/add': return t.addBook;
            case '/profile': return "My Profile";
            case '/help': return "Help Support";
            default:
                if (pathname?.startsWith('/book/')) return t.books;
                return t.dashboard;
        }
    };

    const getRoleBadge = () => {
        if (!user) return '';
        switch (user.role) {
            case 'ADMIN': return 'Admin';
            case 'LIBRARIAN': return 'Librarian';
            case 'BORROWER': return 'Borrower';
            default: return '';
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
                        placeholder={t.search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-[300px] border-none bg-gray-50 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm transition-all text-gray-700 dark:text-gray-200"
                    />
                </form>

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
                            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                                {notifications.length > 0 ? notifications.map(n => (
                                    <div key={n.id} className="text-xs p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
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
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xs overflow-hidden relative border border-teal-200 dark:border-teal-800">
                            {(
                                user?.staffName?.[0] || '?'
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold leading-tight">
                                {user?.staffName || 'User'}
                            </span>
                            <span className="text-[10px] text-brand-teal font-medium">{getRoleBadge()}</span>
                        </div>
                        <ChevronDown size={14} className={cn("text-gray-400 transition-transform", showProfile && "rotate-180")} />
                    </div>

                    {showProfile && user && (
                        <div className="absolute right-0 mt-2 w-[260px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] shadow-2xl z-50 p-6 animate-in slide-in-from-top-2 duration-300">
                            <div className="flex flex-col items-center gap-3 border-b border-gray-50 dark:border-gray-800 pb-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xl overflow-hidden relative shadow-inner border-2 border-white dark:border-gray-800">
                                    {
                                    (
                                        user.staffName?.[0] || '?'
                                    )}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">{user.staffName}</h3>
                                    <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">{getRoleBadge()}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mb-4">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl">
                                    <Mail size={14} className="text-gray-400" />
                                    <span className="truncate">{user.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl">
                                    <Clock size={14} className="text-gray-400" />
                                    <span>ID: {user.loginId}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mb-4 border-t border-gray-100 dark:border-gray-800 pt-4 px-2">
                                <Link href="/profile" onClick={() => setShowProfile(false)} className="flex items-center gap-3 p-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-teal hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors">
                                    <User size={16} /> My Profile & Loans
                                </Link>
                                <Link href="/help" onClick={() => setShowProfile(false)} className="flex items-center gap-3 p-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-teal hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors">
                                    <HelpCircle size={16} /> Help & FAQ
                                </Link>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full py-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 text-xs font-bold rounded-xl transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <LogOut size={14} />
                                {t.logout}
                            </button>
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

'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { BookOpen, Users, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();
    const { user } = useAuth();

    useEffect(() => {
        Promise.all([
            api.reports.getStats().catch(() => null),
            api.books.getAll().catch(() => [])
        ]).then(([statsData, booksData]) => {
            setStats(statsData);
            setBooks(booksData?.slice(0, 6) || []);
            setLoading(false);
        });
    }, []);

    const statCards = [
        { label: t.totalBooks, value: stats?.totalBooks || 0, icon: BookOpen, color: 'from-teal-400 to-teal-600', shadow: 'shadow-teal-500/15' },
        { label: t.activeReaders, value: stats?.userCount || 0, icon: Users, color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/15' },
        { label: t.currentLoans, value: stats?.loans?.active || 0, icon: TrendingUp, color: 'from-orange-400 to-orange-600', shadow: 'shadow-orange-500/15' },
        { label: t.returnRate, value: `${(stats?.loans?.returnRate || 0).toFixed(0)}%`, icon: Sparkles, color: 'from-violet-400 to-violet-600', shadow: 'shadow-violet-500/15' }
    ];

    const getStatusBadge = (status: string) => {
        const config: Record<string, string> = {
            AVAILABLE: 'bg-green-50 text-green-600',
            BORROWED: 'bg-orange-50 text-orange-600',
            RESERVED: 'bg-blue-50 text-blue-600',
            LOST: 'bg-red-50 text-red-600'
        };
        return config[status] || config.AVAILABLE;
    };

    return (
        <div className="py-8 flex flex-col gap-8">
            {/* Hero */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-[32px] p-10 flex flex-col gap-4 shadow-xl shadow-teal-500/10">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-teal-200 text-sm font-medium">Welcome back,</span>
                    <span className="text-white text-sm font-bold">{user?.staffName || 'User'} 👋</span>
                </div>
                <h2 className="text-3xl font-bold text-white max-w-lg leading-tight">{t.discoverTitle}</h2>
                <p className="text-teal-100 text-sm max-w-md">{t.discoverSubtitle}</p>
                <Link href="/books"
                    className="mt-2 bg-white text-teal-600 px-6 py-3 rounded-xl font-bold text-sm w-fit flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all">
                    {t.browseCatalog} <ArrowRight size={16} />
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-5">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                        <div className={`w-12 h-12 bg-gradient-to-br ${card.color} ${card.shadow} rounded-xl flex items-center justify-center shadow-lg`}>
                            <card.icon size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                {loading ? <span className="w-12 h-6 bg-gray-100 dark:bg-gray-800 rounded block animate-pulse" /> : card.value}
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recently Added */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 italic">{t.recentlyAdded}</h3>
                    <Link href="/books" className="text-xs font-bold text-brand-teal flex items-center gap-1 hover:underline">
                        {t.viewAll} <ArrowRight size={14} />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {loading ? [1,2,3,4,5,6].map(i => (
                        <div key={i} className="animate-pulse bg-white dark:bg-gray-900 rounded-[20px] border border-gray-100 dark:border-gray-800 p-4 h-56" />
                    )) : books.map((book: any) => (
                        <Link key={book.isbn} href={`/book/${book.isbn}`}
                            className="group bg-white dark:bg-gray-900 rounded-[20px] border border-gray-100 dark:border-gray-800 p-4 hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
                            <div className="w-full aspect-[3/4] rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-3">
                                <BookOpen size={24} className="text-gray-300 dark:text-gray-600 group-hover:text-brand-teal transition-colors" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className={`w-fit px-2 py-0.5 rounded-full text-[8px] font-bold ${getStatusBadge(book.status || 'AVAILABLE')}`}>
                                    {book.status || 'AVAILABLE'}
                                </span>
                                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-tight">{book.title}</h4>
                                <p className="text-[10px] text-gray-400">{book.category?.categoryName || ''}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

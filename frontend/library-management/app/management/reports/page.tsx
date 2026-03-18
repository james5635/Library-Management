'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import { Download, TrendingUp, Users, BookOpen, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ReportsPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        api.reports.getStats()
            .then(data => { setStats(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const exportCSV = () => {
        if (!stats) return;
        let csv = "Metric,Value\n";
        csv += `Total Books,${stats.totalBooks}\n`;
        csv += `Active Readers,${stats.userCount}\n`;
        csv += `Staff Count,${stats.staffCount}\n`;
        csv += `Active Loans,${stats.loans?.active}\n`;
        csv += `Return Rate,${stats.loans?.returnRate?.toFixed(1)}%\n`;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'library-report.csv'; a.click();
    };

    if (loading) return <div className="py-8 text-center text-gray-400">{t.loading}</div>;
    if (!stats) return <div className="py-8 text-center text-red-400">Failed to load report data.</div>;

    const bookDistroData = [
        { name: 'Physical', value: stats.bookDistro?.physical || 0 },
        { name: 'Digital', value: stats.bookDistro?.digital || 0 },
        { name: 'Both', value: stats.bookDistro?.both || 0 }
    ];

    const bookStatusData = [
        { name: t.available, value: stats.bookStatus?.available || 0 },
        { name: t.borrowed, value: stats.bookStatus?.borrowed || 0 },
        { name: t.reserved, value: stats.bookStatus?.reserved || 0 },
        { name: t.lost, value: stats.bookStatus?.lost || 0 }
    ];

    const COLORS = ['#14b8a6', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#10b981', '#6366f1'];
    const STATUS_COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

    return (
        <div className="py-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">{t.report}</h1>
                    <p className="text-sm text-gray-400">Library analytics and statistics</p>
                </div>
                <button onClick={exportCSV}
                    className="bg-brand-teal text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-teal-500/20">
                    <Download size={16} /> Export CSV
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: t.totalBooks, val: stats.totalBooks, icon: BookOpen, color: 'from-teal-400 to-teal-600' },
                    { label: t.activeReaders, val: stats.userCount, icon: Users, color: 'from-blue-400 to-blue-600' },
                    { label: t.staff, val: stats.staffCount, icon: FileText, color: 'from-violet-400 to-violet-600' },
                    { label: t.currentLoans, val: stats.loans?.active, icon: TrendingUp, color: 'from-orange-400 to-orange-600' }
                ].map((c, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 p-6 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-lg`}>
                            <c.icon size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{c.val || 0}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{c.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-3 gap-6">
                {/* Book Status Pie */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-6">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4">Book Status</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={bookStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                                {bookStatusData.map((_, i) => <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Book Type Pie */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-6">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4">Book Types</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={bookDistroData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                                {bookDistroData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution Bar */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-6">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4">Categories</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={stats.categoryDistribution || []} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis type="number" tick={{ fontSize: 10 }} />
                            <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#14b8a6" radius={[0, 6, 6, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Monthly Trend */}
            <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-8">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-6">Monthly Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={stats.monthlyTrend || []}>
                        <defs>
                            <linearGradient id="colorBorrowed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorReturned" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="borrowed" stroke="#14b8a6" fill="url(#colorBorrowed)" strokeWidth={2} />
                        <Area type="monotone" dataKey="returned" stroke="#3b82f6" fill="url(#colorReturned)" strokeWidth={2} />
                        <Area type="monotone" dataKey="newUsers" stroke="#8b5cf6" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Popular Books */}
            {stats.popularBooks?.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-8">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4">Popular Books</h3>
                    <div className="flex flex-col gap-3">
                        {stats.popularBooks.map((book: any, i: number) => (
                            <div key={i} className="flex items-center gap-4 py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <span className="text-lg font-bold text-brand-teal w-8">#{i + 1}</span>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{book.title}</p>
                                    <p className="text-[10px] text-gray-400">{book.category}</p>
                                </div>
                                <span className="text-xs font-bold text-gray-500">{book.loanCount} loans</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

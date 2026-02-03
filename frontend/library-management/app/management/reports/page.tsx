'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area,
} from 'recharts';
import { Download, AlertCircle, CheckCircle2, Book, ArrowUpRight } from 'lucide-react';

const COLORS = ['#FFD66B', '#3ABEF9', '#FF4E88'];

export default function ReportsPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.reports.getStats()
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading Report Dashboard...</div>;

    const bookDistroData = stats ? [
        { name: 'Physical', value: stats.bookDistro.physical },
        { name: 'Digital', value: stats.bookDistro.digital },
        { name: 'Both', value: stats.bookDistro.both },
    ] : [];

    // Mocked trend data for visual impact
    const trendData = [
        { name: 'Jan', overdue: 4, borrowed: 12 },
        { name: 'Feb', overdue: 7, borrowed: 18 },
        { name: 'Mar', overdue: 5, borrowed: 15 },
        { name: 'Apr', overdue: 9, borrowed: 22 },
        { name: 'May', overdue: 12, borrowed: 30 },
        { name: 'Jun', overdue: 8, borrowed: 25 },
    ];

    return (
        <div className="flex flex-col gap-8 py-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 italic">Dashboard</h1>
                <button className="bg-brand-teal text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
                    <Download size={18} />
                    Export
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Book Resource Pie Chart */}
                <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center">
                    <h2 className="text-xs font-medium text-gray-400 self-start mb-4">Book Resource</h2>
                    <div className="w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={bookDistroData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {bookDistroData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-4 mt-4 text-[10px] text-gray-500">
                        {bookDistroData.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                {d.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Borrowed Bar Chart */}
                <div className="lg:col-span-9 bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-6">Borrowed</h2>
                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                                <Tooltip cursor={{ fill: '#F3F4F6' }} />
                                <Legend verticalAlign="bottom" align="left" iconType="circle" wrapperStyle={{ paddingTop: 20 }} />
                                <Bar dataKey="borrowed" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={12} name="Last 6 days" />
                                <Bar dataKey="overdue" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={12} name="Last Week" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Trend Chart */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center">
                    <h2 className="text-xs font-medium text-gray-400 self-start mb-4">Trend</h2>
                    <div className="w-full h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData.slice(0, 5)}>
                                <Bar dataKey="borrowed" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={8} />
                                <Bar dataKey="overdue" fill="#FF4E88" radius={[4, 4, 0, 0]} barSize={8} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* New User Area Chart */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-xs font-medium text-gray-400 mb-4">New User</h2>
                    <div className="w-full h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="borrowed" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUser)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Overdue Card */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-brand-red">
                        <AlertCircle size={16} />
                        <span className="text-[10px] font-bold">Overdue</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">{stats?.loans.overdue || 0}</span>
                        <span className="text-brand-teal text-xs font-bold mb-1 flex items-center">
                            <ArrowUpRight size={14} />
                            2.5%
                        </span>
                    </div>
                    <div className="w-full h-20">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <Area type="monotone" dataKey="overdue" stroke="#FF4E88" fill="none" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Summary Bubbles */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-serif">Book</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full border-[6px] border-brand-teal/20 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold text-brand-teal">{Math.round(stats?.loans.borrowedRate || 0)}%</span>
                                <span className="text-[6px] uppercase font-bold text-gray-400">Borrowed</span>
                            </div>
                            <div className="w-12 h-12 rounded-full border-[4px] border-blue-400/20 flex flex-col items-center justify-center translate-y-4">
                                <span className="text-[8px] font-bold text-blue-400">{Math.round(stats?.loans.returnRate || 0)}%</span>
                                <span className="text-[5px] uppercase font-bold text-gray-400">Return</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

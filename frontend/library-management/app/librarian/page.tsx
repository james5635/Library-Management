'use client';

import Link from 'next/link';
import { BookOpen, FileText, Users, Banknote, BarChart, ShieldCheck, BookMarked, CalendarClock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LibrarianPage() {
    const { t } = useLanguage();

    const cards = [
        { icon: BookOpen, href: '/management/books', label: t.bookManagement, desc: 'Add, edit, delete books', color: 'from-teal-400 to-teal-600', shadow: 'shadow-teal-500/20' },
        { icon: Users, href: '/management/members', label: t.member, desc: 'Manage library members', color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/20' },
        { icon: ShieldCheck, href: '/management/staff', label: t.staff, desc: 'Manage staff & roles', color: 'from-violet-400 to-violet-600', shadow: 'shadow-violet-500/20' },
        { icon: BookMarked, href: '/management/loans', label: t.loan, desc: 'Track active loans', color: 'from-orange-400 to-orange-600', shadow: 'shadow-orange-500/20' },
        { icon: CalendarClock, href: '/management/reservations', label: t.reservations, desc: 'Accept reservations', color: 'from-sky-400 to-sky-600', shadow: 'shadow-sky-500/20' },
        { icon: Banknote, href: '/management/fines', label: t.fine, desc: 'Manage overdue fines', color: 'from-red-400 to-red-600', shadow: 'shadow-red-500/20' },
        { icon: BarChart, href: '/management/reports', label: t.report, desc: 'View analytics & reports', color: 'from-emerald-400 to-emerald-600', shadow: 'shadow-emerald-500/20' }
    ];

    return (
        <div className="py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic mb-2">Librarian Portal</h1>
                <p className="text-sm text-gray-400">Quick access to all management tools</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map(card => (
                    <Link key={card.href} href={card.href}
                        className="group bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-8 flex flex-col items-center gap-5 hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} ${card.shadow} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <card.icon size={28} className="text-white" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">{card.label}</h3>
                            <p className="text-[10px] text-gray-400 mt-1">{card.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

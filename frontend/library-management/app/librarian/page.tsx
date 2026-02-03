'use client';

import Link from 'next/link';
import { Book, FileText, Users, DollarSign, Package } from 'lucide-react';

const managementItems = [
    { icon: Book, label: 'Book', color: 'bg-purple-500', href: '/management/books' },
    { icon: FileText, label: 'Report', color: 'bg-green-500', href: '/management/reports' },
    { icon: Users, label: 'Member', color: 'bg-cyan-500', href: '/management/members' },
    { icon: DollarSign, label: 'Fine', color: 'bg-pink-500', href: '/management/fines' },
    { icon: Package, label: 'Loan', color: 'bg-orange-500', href: '/management/loans' },
];

export default function LibrarianPortalPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            {managementItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={`${item.color} rounded-[20px] p-8 flex flex-col items-center justify-center gap-4 text-white hover:scale-[1.02] transition-transform shadow-lg group`}
                >
                    <div className="w-16 h-16 rounded-xl border-2 border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <item.icon size={32} />
                    </div>
                    <span className="text-2xl font-bold">{item.label}</span>
                </Link>
            ))}
        </div>
    );
}

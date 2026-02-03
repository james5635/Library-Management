'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    value: string | number;
    label: string;
    iconBgColor: string;
}

export default function StatCard({ icon: Icon, value, label, iconBgColor }: StatCardProps) {
    return (
        <div className="flex items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm w-[200px]">
            <div className={`p-3 rounded-full ${iconBgColor} text-white`}>
                <Icon size={24} />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800">{value}</span>
                <span className="text-xs text-gray-400 font-medium">{label}</span>
            </div>
        </div>
    );
}

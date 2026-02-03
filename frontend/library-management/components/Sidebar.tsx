'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    LayoutGrid,
    BookOpen,
    MessageSquare,
    Bookmark,
    User,
    HelpCircle,
    Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
    { icon: LayoutDashboard, href: '/', label: 'Dashboard' },
    { icon: LayoutGrid, href: '/librarian', label: 'Librarian' },
    { icon: BookOpen, href: '/book/1', label: 'Books' },
    { icon: MessageSquare, href: '/chatbot', label: 'Chatbot' },
    { icon: Bookmark, href: '/bookmark', label: 'Bookmark' },
];

const bottomItems = [
    { icon: User, href: '/profile', label: 'Profile' },
    { icon: HelpCircle, href: '/help', label: 'Help' },
    { icon: Settings, href: '/settings', label: 'Settings' },
];

interface SidebarProps {
    isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className={cn(
            "h-screen flex flex-col py-8 border-r bg-white sticky top-0 transition-all duration-300",
            isCollapsed ? "w-[80px] items-center" : "w-[240px] px-4"
        )}>
            <div className="flex-1 flex flex-col gap-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 p-3 rounded-xl transition-all",
                                isActive
                                    ? "text-brand-teal bg-teal-50/50"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <item.icon size={24} className="flex-shrink-0" />
                            {!isCollapsed && (
                                <span className="font-semibold text-sm">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="flex flex-col gap-4">
                {bottomItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 p-3 rounded-xl transition-all",
                                isActive
                                    ? "text-brand-teal bg-teal-50/50"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <item.icon size={24} className="flex-shrink-0" />
                            {!isCollapsed && (
                                <span className="font-semibold text-sm">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

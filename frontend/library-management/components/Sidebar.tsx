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
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarProps {
    isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const { t } = useLanguage();

    const sidebarItems = [
        { icon: LayoutDashboard, href: '/', label: t.dashboard },
        { icon: LayoutGrid, href: '/librarian', label: t.librarian },
        { icon: BookOpen, href: '/books', label: t.books },
        { icon: MessageSquare, href: '/chatbot', label: t.chatbot },
        { icon: Bookmark, href: '/bookmark', label: t.bookmark },
    ];

    const bottomItems = [
        { icon: HelpCircle, href: '/help', label: t.help },
        { icon: Settings, href: '/settings', label: t.settings },
    ];

    return (
        <div className={cn(
            "h-screen flex flex-col py-8 border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-black sticky top-0 transition-all duration-300",
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
                                    ? "text-brand-teal bg-teal-50/50 dark:bg-teal-900/20"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                                    ? "text-brand-teal bg-teal-50/50 dark:bg-teal-900/20"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
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

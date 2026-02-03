'use client';

import { Search, SlidersHorizontal, Bell, ChevronDown, Menu } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface TopbarProps {
    onToggleSidebar: () => void;
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
    const pathname = usePathname();

    const getPageTitle = () => {
        switch (pathname) {
            case '/': return 'Dashboard';
            case '/librarian': return 'Librarian';
            case '/chatbot': return 'Chatbot';
            case '/bookmark': return 'Bookmark';
            case '/profile': return 'Profile';
            case '/management/books': return 'Book Management';
            case '/management/members': return 'Member';
            case '/management/loans': return 'Loan';
            case '/management/books/add': return 'Add book';
            default:
                if (pathname.startsWith('/book/')) return 'Book';
                return 'Dashboard';
        }
    };

    return (
        <div className="h-[80px] flex items-center justify-between px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Book"
                        className="pl-10 pr-4 py-2 w-[300px] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal text-sm transition-all"
                    />
                </div>

                <button className="p-2 bg-brand-yellow rounded-lg text-white hover:opacity-90 transition-opacity">
                    <SlidersHorizontal size={20} />
                </button>

                <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <Bell size={20} />
                </button>

                <div className="flex items-center gap-3 px-3 py-1.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                        <Image
                            src="/static/UI/login.png" // Placeholder or user image
                            alt="User"
                            width={32}
                            height={32}
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-700 leading-tight">Sou Chanrojame</span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>
            </div>
        </div>
    );
}

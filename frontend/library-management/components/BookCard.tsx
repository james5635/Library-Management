'use client';

import Link from 'next/link';
import Image from 'next/image';
import { STORAGE_BASE_URL } from '@/lib/api';

interface BookCardProps {
    isbn: string;
    title: string;
    author: string;
    coverImage: string;
    showButtons?: boolean;
}

export default function BookCard({ isbn, title, author, coverImage, showButtons = false }: BookCardProps) {
    const getFullUrl = (path: string) => {
        if (!path) return "/static/UI/2.png";
        if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/static')) return path;
        return `${STORAGE_BASE_URL}${path}`;
    };

    const fullCoverUrl = getFullUrl(coverImage);

    return (
        <Link href={`/book/${isbn}`} className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-[1.02] duration-300 border border-gray-100 dark:border-gray-800">
                <Image
                    src={fullCoverUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-1 group-hover:text-brand-teal transition-colors">{title}</h3>
                <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500">{author}</p>
            </div>

            {showButtons && (
                <div className="flex gap-2 mt-1">
                    <button className="flex-1 py-1 px-3 bg-brand-teal text-white text-[10px] font-bold rounded-lg hover:bg-teal-700 transition-colors">
                        Read
                    </button>
                    <button className="flex-1 py-1 px-3 bg-red-100 text-brand-red text-[10px] font-bold rounded-lg hover:bg-red-200 transition-colors">
                        Return
                    </button>
                </div>
            )}
        </Link>
    );
}

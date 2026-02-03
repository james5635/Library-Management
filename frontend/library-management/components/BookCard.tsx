'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface BookCardProps {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    showButtons?: boolean;
}

export default function BookCard({ id, title, author, coverImage, showButtons = false }: BookCardProps) {
    return (
        <div className="flex flex-col gap-3 group">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-[1.02] duration-300">
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col">
                <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{title}</h3>
                <p className="text-[10px] font-medium text-gray-400">{author}</p>
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
        </div>
    );
}

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, STORAGE_BASE_URL } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

function BooksContent() {
    const searchParams = useSearchParams();
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [selectedCategory, setSelectedCategory] = useState('');
    const { t } = useLanguage();

    useEffect(() => {
        setLoading(true);
        api.books.getAll(searchQuery || undefined, selectedCategory || undefined)
            .then(data => { setBooks(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [searchQuery, selectedCategory]);

    const categories = ['All', 'Computer Science', 'Literature', 'Science', 'History', 'Business', 'Philosophy', 'Art & Design', 'Mathematics'];

    const getStatusBadge = (status: string) => {
        const config: Record<string, { bg: string; text: string; label: string }> = {
            AVAILABLE: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600', label: t.available },
            BORROWED: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600', label: t.borrowed },
            RESERVED: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600', label: t.reserved },
            LOST: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600', label: t.lost }
        };
        const c = config[status] || config.AVAILABLE;
        return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.bg} ${c.text}`}>{c.label}</span>;
    };

    return (
        <div className="py-8 flex flex-col gap-6">
            {/* Search */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={t.search}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm focus:ring-2 focus:ring-brand-teal/30 focus:outline-none text-gray-700 dark:text-gray-200"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                    <button key={cat}
                        onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            (cat === 'All' && !selectedCategory) || selectedCategory === cat
                                ? 'bg-brand-teal text-white shadow-lg shadow-teal-500/20'
                                : 'bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Books Grid */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {[1,2,3,4,5,6,7,8,9,10].map(i => (
                        <div key={i} className="animate-pulse bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 p-5 h-64" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {books.map((book: any) => (
                        <Link key={book.isbn} href={`/book/${book.isbn}`}
                            className="group bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                            <div className="w-full aspect-[3/4] rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-4 overflow-hidden relative">
                                {book.coverImage ? (
                                    <Image src={`${STORAGE_BASE_URL}${book.coverImage}`} alt={book.title} fill className="object-cover" />
                                ) : (
                                    <BookOpen size={32} className="text-gray-300 dark:text-gray-600 group-hover:text-brand-teal transition-colors" />
                                )}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    {getStatusBadge(book.status || 'AVAILABLE')}
                                    <span className="text-[10px] text-gray-400 font-medium">{book.bookType}</span>
                                </div>
                                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-tight">{book.title}</h3>
                                <p className="text-[10px] text-gray-400">{book.category?.categoryName || ''}</p>
                                {book.price && <p className="text-xs font-bold text-brand-teal">${book.price}</p>}
                            </div>
                        </Link>
                    ))}
                    {books.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-400">{t.noData}</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function BooksPage() {
    return (
        <Suspense fallback={<div className="py-8 text-center text-gray-400">Loading...</div>}>
            <BooksContent />
        </Suspense>
    );
}

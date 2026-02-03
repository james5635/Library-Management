'use client';

import BookCard from '@/components/BookCard';
import { cn } from '@/lib/utils';
import { useState, useEffect, Suspense } from 'react';
import { api } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, List } from 'lucide-react';

const categories = ['All', 'Popular', 'Recommended', 'Newest', 'Oldest'];

function BooksCatalogContent() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const q = searchParams.get('q');

    useEffect(() => {
        setLoading(true);
        api.books.getAll(q || undefined, activeCategory === 'All' ? undefined : activeCategory)
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [activeCategory, q]);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                <div className="flex gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-semibold transition-all",
                                activeCategory === cat
                                    ? "bg-brand-teal text-white shadow-lg shadow-teal-500/20"
                                    : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                    <button className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm text-brand-teal">
                        <LayoutGrid size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <List size={18} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="aspect-[3/4] rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <BookCard
                                key={book.isbn}
                                isbn={book.isbn}
                                title={book.title}
                                author={book.authors?.map((a: any) => `${a.firstName} ${a.lastName}`).join(', ') || 'Unknown'}
                                coverImage={book.coverImage}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[32px] text-gray-400">
                            No books found in this category.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function BooksCatalogPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading catalog...</div>}>
            <BooksCatalogContent />
        </Suspense>
    );
}

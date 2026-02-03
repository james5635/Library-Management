'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import BookCard from '@/components/BookCard';

export default function BookmarkPage() {
    const [bookmarks, setBookmarks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const userEmail = "chanrojame@example.com";

    useEffect(() => {
        api.bookmarks.getAll(userEmail)
            .then(data => {
                setBookmarks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading bookmarks...</div>;

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Bookmarks</h1>

            {bookmarks.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
                    {bookmarks.map((b) => (
                        <BookCard
                            key={b.book.isbn}
                            isbn={b.book.isbn}
                            title={b.book.title}
                            author={b.book.authors?.map((a: any) => `${a.firstName} ${a.lastName}`).join(', ') || 'Unknown'}
                            coverImage={b.book.coverImage}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[32px]">
                    <p className="text-lg font-medium">No bookmarked books yet.</p>
                    <p className="text-sm">Books you bookmark will appear here.</p>
                </div>
            )}
        </div>
    );
}

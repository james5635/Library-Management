'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { api, STORAGE_BASE_URL } from '@/lib/api';

export default function BookViewerPage() {
    const params = useParams();
    const [book, setBook] = useState<any>(null);
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            api.books.getOne(params.id as string)
                .then(data => {
                    setBook(data);
                })
                .catch(err => {
                    console.error('Failed to fetch book:', err);
                    setLoading(false);
                });

            api.assets.getByBook(params.id as string)
                .then(data => {
                    setAssets(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch assets:', err);
                    setLoading(false);
                });
        }
    }, [params.id]);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading document...</div>;
    if (!book) return <div className="p-8 text-center text-red-400">Book not found.</div>;

    const digitalContentUrl = assets.find(a => a.contentUrl)?.contentUrl;
    const isPdf = digitalContentUrl?.toLowerCase().endsWith('.pdf');

    const getFullUrl = (path: string) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `${STORAGE_BASE_URL}${path}`;
    };

    const fullContentUrl = getFullUrl(digitalContentUrl);
    const fullCoverUrl = getFullUrl(book?.coverImage) || "/static/UI/2.png";

    return (
        <div className="flex flex-col items-center gap-8 py-4">
            {isPdf ? (
                <div className="w-full max-w-[1000px] h-[80vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <iframe
                        src={fullContentUrl || ''}
                        className="w-full h-full border-none"
                        title="PDF Viewer"
                    />
                </div>
            ) : (
                <div className="flex justify-center gap-8 w-full max-w-[1200px]">
                    <div className="flex-1 max-w-[500px] aspect-[1/1.4] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 p-8 flex flex-col gap-6 transition-colors">
                        <div className="text-[10px] text-gray-400 font-medium">{book?.title || 'Untitled'}</div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{book?.title || 'Sample document'}</h2>

                        {fullContentUrl ? (
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-serif whitespace-pre-wrap">
                                    {fullContentUrl}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                                    <Image
                                        src={fullCoverUrl}
                                        alt="Sample content"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-serif">
                                    {book?.description || "No description available for this book. Start reading to explore its content."}
                                </div>
                            </>
                        )}
                        <div className="mt-auto text-center text-[10px] text-gray-400">- 1 -</div>
                    </div>

                    <div className="flex-1 max-w-[500px] aspect-[1/1.4] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 p-8 flex flex-col gap-6 transition-colors">
                        <div className="text-[10px] text-gray-400 font-medium">{book?.title || 'Untitled'}</div>
                        <div className="flex gap-6">
                            <div className="relative w-1/3 aspect-square rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800">
                                <Image
                                    src={fullCoverUrl}
                                    alt="Sample content"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-[10px] text-gray-400 dark:text-gray-500 flex-1">
                                {book?.description?.substring(0, 150)}...
                            </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-serif">
                            {book?.description?.substring(150) || "Explore more in the next pages..."}
                        </div>
                        <div className="mt-auto text-center text-[10px] text-gray-400">- 2 -</div>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function BookViewerPage() {
    const params = useParams();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            api.books.getOne(params.id as string)
                .then(data => {
                    setBook(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch book:', err);
                    setLoading(false);
                });
        }
    }, [params.id]);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading document...</div>;

    return (
        <div className="flex justify-center gap-8 py-4">
            <div className="flex-1 max-w-[500px] aspect-[1/1.4] bg-white rounded-lg shadow-lg border border-gray-100 p-8 flex flex-col gap-6">
                <div className="text-[10px] text-gray-400 font-medium">{book?.title || 'Untitled'}</div>
                <h2 className="text-3xl font-bold text-gray-800">{book?.title || 'Sample document'}</h2>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                        src={book?.coverImage || "/static/UI/2.png"}
                        alt="Sample content"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="text-sm text-gray-600 leading-relaxed font-serif">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales placerat dui. Nulla ac orci eu justo feugiat mollis in eu odio. Duis luctus sed quam sit amet mattis. Cras ac turpis sit amet nisl elementum eleifend nec eget ligula. Etiam aliquet lobortis aliquam. Suspendisse interdum nisl sapien, vel elementum nibh sollicitudin eu.
                </div>
                <div className="mt-auto text-center text-[10px] text-gray-400">- 1 -</div>
            </div>

            <div className="flex-1 max-w-[500px] aspect-[1/1.4] bg-white rounded-lg shadow-lg border border-gray-100 p-8 flex flex-col gap-6">
                <div className="text-[10px] text-gray-400 font-medium">{book?.title || 'Untitled'}</div>
                <div className="flex gap-6">
                    <div className="relative w-1/3 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={book?.coverImage || "/static/UI/2.png"}
                            alt="Sample content"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="text-[10px] text-gray-400 flex-1">
                        ac a ligula. Curabitur vel scelerisque odio. In molestie mi pulvinar. Morbi tempus massa sit amet tortor aliquam, in condimentum elit eget.
                    </div>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed font-serif">
                    Etiam nec pellentesque sapien. Aenean arcu tellus, bibendum id arcu porttitor, auctor maximus erat. Phasellus purus nunc, ultrices ut molestie mi pulvinar. Morbi tempus massa sit amet tortor aliquam, in condimentum elit eget. Mauris vel tincidunt erat.
                    <br /><br />
                    Proin lobortis eu urna nisl. Aenean hendrerit accumsan ante at scelerisque. Donec sodales placerat dui. Nulla ac orci eu justo feugiat mollis in eu odio. Duis luctus sed quam sit amet mattis. Cras ac turpis sit amet nisl elementum eleifend nec eget ligula. Etiam aliquet lobortis aliquam. Suspendisse interdum nisl sapien, vel elementum nibh sollicitudin eu.
                </div>
                <div className="mt-auto text-center text-[10px] text-gray-400">- 2 -</div>
            </div>
        </div>
    );
}

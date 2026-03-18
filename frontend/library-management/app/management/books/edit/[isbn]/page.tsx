'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api, STORAGE_BASE_URL } from '@/lib/api';

export default function EditBookPage() {
    const router = useRouter();
    const params = useParams();
    const isbn = params.isbn as string;
    
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        edition: '1',
        price: '',
        bookType: 'PHYSICAL',
        description: '',
        status: 'AVAILABLE',
        totalCopies: 1,
        availableCopies: 1,
    });
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [existingCover, setExistingCover] = useState<string>('');

    useEffect(() => {
        if (isbn) {
            api.books.getOne(isbn)
                .then((book: any) => {
                    setFormData({
                        title: book.title || '',
                        edition: book.edition || '1',
                        price: book.price?.toString() || '',
                        bookType: book.bookType || 'PHYSICAL',
                        description: book.description || '',
                        status: book.status || 'AVAILABLE',
                        totalCopies: book.totalCopies || 1,
                        availableCopies: book.availableCopies || 1,
                    });
                    if (book.coverImage) {
                        setExistingCover(book.coverImage);
                        setPreviewUrl(`${STORAGE_BASE_URL}${book.coverImage}`);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Failed to fetch book:', err);
                    setLoading(false);
                });
        }
    }, [isbn]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'asset') => {
        const file = e.target.files?.[0];
        if (file && type === 'cover') {
            setCoverFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setExistingCover('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (!formData.title) {
                alert('Title is required.');
                setSubmitting(false);
                return;
            }

            const priceValue = parseFloat(formData.price.replace('$', '')) || 0;

            let coverImageUrl = existingCover;
            if (coverFile) {
                const res = await api.files.upload(coverFile);
                coverImageUrl = res.url;
            }

            await api.books.update(isbn, {
                isbn: isbn,
                title: formData.title,
                edition: formData.edition,
                price: priceValue,
                bookType: formData.bookType,
                coverImage: coverImageUrl,
                description: formData.description,
                status: formData.status,
                totalCopies: formData.totalCopies,
                availableCopies: formData.availableCopies,
            });

            router.push('/management/books');
        } catch (err) {
            console.error('Failed to update book:', err);
            alert('Failed to update book. Check the console for details.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-12 items-start py-8">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-[280px] aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 flex items-center justify-center">
                    {previewUrl ? (
                        <Image
                            src={previewUrl}
                            alt="Book cover preview"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <span className="text-gray-300 text-sm">No Preview</span>
                    )}
                </div>
                <label className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm w-full text-center">
                    Change Cover
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} />
                </label>
            </div>

            <div className="flex-1 max-w-[400px] flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-400 px-1">ISBN</label>
                    <input
                        type="text"
                        value={isbn}
                        disabled
                        className="w-full h-11 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 cursor-not-allowed"
                    />
                </div>

                {[
                    { label: 'Title', key: 'title', placeholder: 'Book Title' },
                    { label: 'Edition', key: 'edition', placeholder: '1' },
                    { label: 'Price', key: 'price', placeholder: '$0.00' },
                    { label: 'Description', key: 'description', placeholder: 'Enter book description...', isTextArea: true },
                ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                        <label className="text-[10px] font-medium text-gray-400 px-1">{field.label}</label>
                        {field.isTextArea ? (
                            <textarea
                                className="w-full h-24 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 dark:text-gray-200 resize-none"
                                value={formData[field.key as keyof typeof formData]}
                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            />
                        ) : (
                            <input
                                type="text"
                                placeholder={field.placeholder}
                                className="w-full h-11 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 dark:text-gray-200"
                                value={formData[field.key as keyof typeof formData]}
                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            />
                        )}
                    </div>
                ))}

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-400 px-1">Book Type</label>
                    <select
                        className="w-full h-11 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 dark:text-gray-200"
                        value={formData.bookType}
                        onChange={(e) => setFormData({ ...formData, bookType: e.target.value as any })}
                    >
                        <option value="PHYSICAL">Physical</option>
                        <option value="DIGITAL">Digital</option>
                        <option value="BOTH">Both</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-400 px-1">Status</label>
                    <select
                        className="w-full h-11 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 dark:text-gray-200"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                        <option value="AVAILABLE">Available</option>
                        <option value="BORROWED">Borrowed</option>
                        <option value="RESERVED">Reserved</option>
                        <option value="LOST">Lost</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-[100px] h-10 bg-brand-teal text-white font-bold rounded-lg hover:opacity-90 transition-opacity self-end mt-4 disabled:bg-gray-400"
                >
                    {submitting ? 'Saving...' : 'Update'}
                </button>
            </div>
        </form>
    );
}

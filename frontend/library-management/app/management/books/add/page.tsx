'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function AddBookPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        edition: '1',
        price: '',
        bookType: 'PHYSICAL',
        description: '',
    });
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [assetFile, setAssetFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'asset') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'cover') {
                setCoverFile(file);
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                setAssetFile(file);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Basic validation
            if (!formData.isbn || !formData.title) {
                alert('ISBN and Title are required.');
                setSubmitting(false);
                return;
            }

            const priceValue = parseFloat(formData.price.replace('$', '')) || 0;

            // 1. Upload Cover if exists
            let coverImageUrl = '';
            if (coverFile) {
                const res = await api.files.upload(coverFile);
                coverImageUrl = res.url;
            }

            // 2. Create the book
            await api.books.create({
                isbn: formData.isbn,
                title: formData.title,
                edition: formData.edition,
                price: priceValue,
                bookType: formData.bookType,
                coverImage: coverImageUrl,
                description: formData.description,
                publisher: null,
                category: null,
                authors: []
            });

            // 3. Upload Asset and Create Record if it's a digital book
            if ((formData.bookType === 'DIGITAL' || formData.bookType === 'BOTH') && assetFile) {
                const res = await api.files.upload(assetFile);
                await api.assets.create({
                    book: { isbn: formData.isbn },
                    fileFormat: 'PDF',
                    fileSizeMB: parseFloat((assetFile.size / (1024 * 1024)).toFixed(2)),
                    contentUrl: res.url,
                    accessLevel: 'PUBLIC'
                });
            }

            // Create notification
            await api.notifications?.create({
                message: `New book added: ${formData.title}`,
                type: 'INFO',
                isRead: false
            });

            router.push('/management/books');
        } catch (err) {
            console.error('Failed to create book:', err);
            alert('Failed to create book. Check the console for details.');
        } finally {
            setSubmitting(false);
        }
    };

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
                    Upload Cover
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} />
                </label>

                {(formData.bookType === 'DIGITAL' || formData.bookType === 'BOTH') && (
                    <label className="cursor-pointer bg-brand-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm w-full text-center">
                        {assetFile ? 'File Uploaded ✓' : 'Upload Digital Asset'}
                        <input type="file" className="hidden" accept=".pdf,.epub" onChange={(e) => handleFileChange(e, 'asset')} />
                    </label>
                )}
            </div>

            <div className="flex-1 max-w-[400px] flex flex-col gap-6">
                {[
                    { label: 'ISBN', key: 'isbn', placeholder: 'e.g. 1234567890' },
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
                                required
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
                    <div className="relative">
                        <select
                            className="w-full h-11 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 dark:text-gray-200"
                            value={formData.bookType}
                            onChange={(e) => setFormData({ ...formData, bookType: e.target.value as any })}
                        >
                            <option value="PHYSICAL">Physical</option>
                            <option value="DIGITAL">Digital</option>
                            <option value="BOTH">Both</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-[100px] h-10 bg-brand-teal text-white font-bold rounded-lg hover:opacity-90 transition-opacity self-end mt-4 disabled:bg-gray-400"
                >
                    {submitting ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}

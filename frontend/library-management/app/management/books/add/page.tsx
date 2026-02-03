'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function AddBookPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        edition: '1',
        price: '',
        bookType: 'PHYSICAL',
        publisherId: '',
        categoryId: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.books.create({
                isbn: formData.isbn,
                title: formData.title,
                edition: formData.edition,
                price: parseFloat(formData.price.replace('$', '')),
                bookType: formData.bookType,
                // For simplicity, we'll send relations as nulls for now unless we implement dropdowns
                publisher: null,
                category: null,
                authors: []
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
                    <span className="text-gray-300 text-sm">No Preview</span>
                </div>
                <span className="text-xl font-bold text-gray-700">Cover</span>
            </div>

            <div className="flex-1 max-w-[400px] flex flex-col gap-6">
                {[
                    { label: 'ISBN', key: 'isbn', placeholder: 'e.g. 1234567890' },
                    { label: 'Title', key: 'title', placeholder: 'Book Title' },
                    { label: 'Edition', key: 'edition', placeholder: '1' },
                    { label: 'Price', key: 'price', placeholder: '$0.00' },
                ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                        <label className="text-[10px] font-medium text-gray-400 px-1">{field.label}</label>
                        <input
                            type="text"
                            required
                            placeholder={field.placeholder}
                            className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700"
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        />
                    </div>
                ))}

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-400 px-1">Book Type</label>
                    <div className="relative">
                        <select
                            className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700"
                            value={formData.bookType}
                            onChange={(e) => setFormData({ ...formData, bookType: e.target.value })}
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
                    className="w-[100px] h-10 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors self-end mt-4 disabled:bg-gray-400"
                >
                    {submitting ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}

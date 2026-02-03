'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AddBookPage() {
    const [formData, setFormData] = useState({
        isbn: '0515087378',
        title: 'How to Be Rich',
        edition: '1',
        price: '$2',
        bookType: 'Value',
        publisher: 'Value',
        category: 'Value'
    });

    return (
        <div className="flex gap-12 items-start py-8">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-[280px] aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src="/static/UI/10.png" // Placeholder from UI
                        alt="Book cover preview"
                        fill
                        className="object-cover"
                    />
                </div>
                <span className="text-xl font-bold text-gray-700">Cover</span>
            </div>

            <div className="flex-1 max-w-[400px] flex flex-col gap-6">
                {[
                    { label: 'ISBN', key: 'isbn' },
                    { label: 'Title', key: 'title' },
                    { label: 'Edition', key: 'edition' },
                    { label: 'Price', key: 'price' },
                ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                        <label className="text-[10px] font-medium text-gray-400 px-1">{field.label}</label>
                        <input
                            type="text"
                            className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700"
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        />
                    </div>
                ))}

                {[
                    { label: 'Book Type', key: 'bookType' },
                    { label: 'Publisher', key: 'publisher' },
                    { label: 'Category', key: 'category' },
                ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                        <label className="text-[10px] font-medium text-gray-400 px-1">{field.label}</label>
                        <div className="relative">
                            <select
                                className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700"
                                value={formData[field.key as keyof typeof formData]}
                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            >
                                <option>Value</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        </div>
                    </div>
                ))}

                <button className="w-[100px] h-10 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors self-end mt-4">
                    Save
                </button>
            </div>
        </div>
    );
}

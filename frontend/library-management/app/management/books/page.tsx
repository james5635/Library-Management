'use client';

import { ArrowDown, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function BookManagementPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = () => {
        setLoading(true);
        api.books.getAll()
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch books:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (isbn: string) => {
        if (confirm('Are you sure you want to delete this book?')) {
            try {
                await api.books.delete(isbn);
                fetchBooks();
            } catch (err) {
                console.error('Failed to delete book:', err);
            }
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end">
                <Link
                    href="/management/books/add"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                >
                    Add book
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Title <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Edition <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Price <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Status <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Type <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Author <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Action <ArrowDown size={14} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">Loading...</td>
                            </tr>
                        ) : books.length > 0 ? (
                            books.map((book, i) => (
                                <tr key={book.isbn} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{book.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{book.edition}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-800">${book.price}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-600`}>
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{book.bookType}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {book.authors?.map((a: any) => `${a.firstName} ${a.lastName}`).join(', ') || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="p-2 text-brand-orange hover:bg-orange-50 rounded-lg transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book.isbn)}
                                                className="p-2 text-brand-red hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">No books found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

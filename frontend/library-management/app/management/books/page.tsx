'use client';

import { ArrowDown, Edit2, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

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
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Books</h2>
                <Link
                    href="/management/books/add"
                    className="bg-brand-teal text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add book
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            {[
                                { label: 'Title', key: 'title' },
                                { label: 'Edition', key: 'edition' },
                                { label: 'Price', key: 'price' },
                                { label: 'Status', key: 'status' },
                                { label: 'Type', key: 'type' },
                                { label: 'Author', key: 'author' },
                                { label: 'Action', key: 'action' },
                            ].map((col) => (
                                <th key={col.key} className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        {col.label} <ArrowDown size={14} className="text-gray-400" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">Loading...</td>
                            </tr>
                        ) : books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book.isbn} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{book.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{book.edition}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-800 dark:text-gray-200">${book.price}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{book.bookType}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {book.authors?.map((a: any) => `${a.firstName} ${a.lastName}`).join(', ') || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="p-2 text-brand-orange hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book.isbn)}
                                                className="p-2 text-brand-red hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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

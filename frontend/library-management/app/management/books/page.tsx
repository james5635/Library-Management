'use client';

import { ArrowDown, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

const booksData = [
    { title: 'Searching For Her', edition: '1', price: '$1', status: 'Active', type: 'Physical', author: 'Rick Mofina' },
    { title: 'For Love I Will', edition: '2', price: '$2', status: 'Inactive', type: 'Physical', author: 'C. D. Sterling' },
    { title: 'Knot by Knot', edition: '4', price: '$4', status: 'Active', type: 'Both', author: 'Davis Moore' },
    { title: 'The Happiness Handbook', edition: '1', price: '$1', status: 'Active', type: 'Physical', author: 'Landon Carter' },
    { title: 'What Makes You Special', edition: '2', price: '$2', status: 'Active', type: 'Digital', author: 'Britt Hallowell' },
    { title: 'Dalia Does a Mitzvah', edition: '3', price: '$3', status: 'Inactive', type: 'Digital', author: 'Jenna D.' },
    { title: 'Of Mages and Makers', edition: '4', price: '$4', status: 'Active', type: 'Physical', author: 'Rel Carroll' },
];

export default function BookManagementPage() {
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
                        {booksData.map((book, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">{book.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{book.edition}</td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-800">{book.price}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${book.status === 'Active'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-red-100 text-red-400'
                                        }`}>
                                        {book.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{book.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="px-4 py-1.5 bg-brand-orange text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                                            Edit
                                        </button>
                                        <button className="px-4 py-1.5 bg-brand-red text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

'use client';

import { ArrowDown } from 'lucide-react';

const loansData = [
    { username: 'Pov Dara', staff: 'Yem Thida', issueDate: '2/3/2015', dueDate: '2/3/2016', returnDate: 'N/A' },
    { username: 'Meas Thida', staff: 'Yi Da', issueDate: '2/3/2015', dueDate: '2/3/2016', returnDate: '2/9/2015' },
    { username: 'Chan Samuth', staff: 'Lim Horn', issueDate: '2/3/2015', dueDate: '2/3/2016', returnDate: '2/7/2015' },
    { username: 'Robert Julie', staff: 'Lam Qi', issueDate: '2/3/2015', dueDate: '2/3/2016', returnDate: '2/7/2015' },
];

export default function LoanManagementPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                    Add Loan
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Username <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Staff name <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Issue Date <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Due Date <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Return Date <ArrowDown size={14} />
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
                        {loansData.map((loan, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">{loan.username}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{loan.staff}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{loan.issueDate}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{loan.dueDate}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{loan.returnDate}</td>
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

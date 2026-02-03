'use client';

import { ArrowDown, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function LoanManagementPage() {
    const [loans, setLoans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLoans = () => {
        setLoading(true);
        api.loans.getAll()
            .then(data => {
                setLoans(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch loans:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    const handleReturn = async (id: number) => {
        try {
            await api.loans.return(id);
            fetchLoans();
        } catch (err) {
            console.error('Failed to return book:', err);
        }
    };

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
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">Loading...</td>
                            </tr>
                        ) : loans.length > 0 ? (
                            loans.map((loan) => (
                                <tr key={loan.loanId} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                        {loan.reader?.firstName} {loan.reader?.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{loan.staff?.staffName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{loan.issueDate}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{loan.dueDate}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{loan.returnDate || 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {loan.status !== 'RETURNED' && (
                                                <button
                                                    onClick={() => handleReturn(loan.loanId)}
                                                    className="p-2 text-brand-teal hover:bg-teal-50 rounded-lg transition-colors"
                                                    title="Mark as Returned"
                                                >
                                                    <RotateCcw size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">No loans found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

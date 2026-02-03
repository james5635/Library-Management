'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function LoansPage() {
    const [loans, setLoans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = () => {
        setLoading(true);
        api.loans.getAll()
            .then(data => {
                setLoans(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleReturn = async (id: number) => {
        try {
            await api.loans.returnBook(id);
            alert('Book returned successfully!');
            fetchLoans();
        } catch (err) {
            console.error(err);
            alert('Failed to return book.');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-400">Loading loans...</div>;

    return (
        <div className="py-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Loan Management</h1>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-50 dark:border-gray-800">
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Book</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Reader</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Issue Date</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Due Date</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {loans.map((loan) => (
                            <tr key={loan.loanId} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                <td className="px-8 py-5 text-sm font-semibold text-gray-700 dark:text-gray-200">{loan.book?.title}</td>
                                <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400">{loan.reader?.firstName} {loan.reader?.lastName}</td>
                                <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400">{loan.issueDate}</td>
                                <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400">{loan.dueDate}</td>
                                <td className="px-8 py-5">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${loan.status === 'RETURNED' ? 'bg-green-100 text-green-600' :
                                            loan.status === 'OVERDUE' ? 'bg-red-100 text-red-600' :
                                                'bg-blue-100 text-blue-600'
                                        }`}>
                                        {loan.status === 'RETURNED' ? <CheckCircle2 size={10} /> :
                                            loan.status === 'OVERDUE' ? <AlertCircle size={10} /> :
                                                <Clock size={10} />}
                                        {loan.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    {loan.status !== 'RETURNED' && (
                                        <button
                                            onClick={() => handleReturn(loan.loanId)}
                                            className="text-brand-teal text-xs font-bold hover:underline"
                                        >
                                            Mark Returned
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

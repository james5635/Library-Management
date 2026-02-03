'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { CircleDollarSign, CheckCircle2, XCircle } from 'lucide-react';

export default function FinesPage() {
    const [fines, setFines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFines();
    }, []);

    const fetchFines = () => {
        setLoading(true);
        api.fines.getAll()
            .then(data => {
                setFines(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handlePay = async (id: number) => {
        try {
            await api.fines.pay(id);
            alert('Fine paid successfully!');
            fetchFines();
        } catch (err) {
            console.error(err);
            alert('Failed to pay fine.');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-400">Loading fines...</div>;

    return (
        <div className="py-8 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Fine Management</h1>

            <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-50 dark:border-gray-800">
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Loan ID</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Reader</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Created At</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {fines.map((fine) => (
                            <tr key={fine.fineId} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                <td className="px-8 py-5 text-sm font-semibold text-gray-700 dark:text-gray-200">#{fine.loan?.loanId}</td>
                                <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400">{fine.loan?.reader?.firstName} {fine.loan?.reader?.lastName}</td>
                                <td className="px-8 py-5 text-sm font-bold text-brand-red">${fine.amount.toFixed(2)}</td>
                                <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400">{new Date(fine.createdAt).toLocaleDateString()}</td>
                                <td className="px-8 py-5">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${fine.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {fine.status === 'PAID' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                        {fine.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    {fine.status === 'UNPAID' && (
                                        <button
                                            onClick={() => handlePay(fine.fineId)}
                                            className="px-4 py-1.5 bg-brand-yellow text-gray-800 text-[10px] font-bold rounded-lg hover:opacity-90 transition-opacity"
                                        >
                                            Pay Fine
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

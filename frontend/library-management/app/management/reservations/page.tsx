'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { CalendarClock, CheckCircle2, RefreshCcw, XCircle } from 'lucide-react';

export default function ReservationManagementPage() {
    const { user, isStaff } = useAuth();
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState<number | null>(null);
    const canUsePage = useMemo(() => !!user && isStaff(), [user, isStaff]);

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const data = await api.reservations.getActive();
            setReservations(Array.isArray(data) ? data : []);
        } catch (e) {
            setReservations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    if (!canUsePage) {
        return (
            <div className="py-10 text-center text-gray-500">
                This page is only available to librarians/admins.
            </div>
        );
    }

    const acceptReservation = async (reservationId: number) => {
        if (!user) return;
        setBusyId(reservationId);
        try {
            await api.reservations.accept(reservationId, { staffId: user.staffId });
            await fetchReservations();
        } catch (e) {
            alert('Failed to accept reservation.');
        } finally {
            setBusyId(null);
        }
    };

    const cancelReservation = async (reservationId: number) => {
        if (!confirm('Cancel this reservation?')) return;
        setBusyId(reservationId);
        try {
            await api.reservations.cancel(reservationId);
            await fetchReservations();
        } catch (e) {
            alert('Failed to cancel reservation.');
        } finally {
            setBusyId(null);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                        <CalendarClock size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Reservations</h2>
                        <p className="text-xs text-gray-400">Accepting a reservation creates a loan</p>
                    </div>
                </div>
                <button
                    onClick={fetchReservations}
                    className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <RefreshCcw size={16} /> Refresh
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            {[
                                { label: 'Book', key: 'book' },
                                { label: 'Reader', key: 'reader' },
                                { label: 'Date', key: 'date' },
                                { label: 'Status', key: 'status' },
                                { label: 'Actions', key: 'actions' },
                            ].map(col => (
                                <th key={col.key} className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Loading...</td>
                            </tr>
                        ) : reservations.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">No active reservations.</td>
                            </tr>
                        ) : (
                            reservations.map((r) => (
                                <tr key={r.reservationId} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <Link href={`/book/${r.book?.isbn}`} className="text-sm font-bold text-gray-800 dark:text-gray-100 hover:text-brand-teal">
                                                {r.book?.title || r.book?.isbn || 'Unknown book'}
                                            </Link>
                                            <span className="text-[10px] text-gray-400">{r.book?.isbn}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{r.reader?.email || 'Unknown reader'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{r.reservationDate}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => acceptReservation(r.reservationId)}
                                                disabled={busyId === r.reservationId}
                                                className="px-3 py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                                            >
                                                <CheckCircle2 size={16} /> Accept
                                            </button>
                                            <button
                                                onClick={() => cancelReservation(r.reservationId)}
                                                disabled={busyId === r.reservationId}
                                                className="px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                                            >
                                                <XCircle size={16} /> Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


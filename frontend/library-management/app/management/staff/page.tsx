'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { UserPlus, Edit2, Trash2, X, Check, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function StaffManagementPage() {
    const [staffList, setStaffList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingStaff, setEditingStaff] = useState<any>(null);
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        staffName: '', loginId: '', email: '', password: '', role: 'LIBRARIAN'
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { fetchStaff(); }, []);

    const fetchStaff = () => {
        setLoading(true);
        api.staff.getAll()
            .then(data => { setStaffList(data); setLoading(false); })
            .catch(() => setLoading(false));
    };

    const handleOpenModal = (staff: any = null) => {
        if (staff) {
            setEditingStaff(staff);
            setFormData({ staffName: staff.staffName, loginId: staff.loginId, email: staff.email || '', password: '', role: staff.role });
        } else {
            setEditingStaff(null);
            setFormData({ staffName: '', loginId: '', email: '', password: '', role: 'LIBRARIAN' });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingStaff) {
                await api.staff.update(editingStaff.staffId, formData);
            } else {
                await api.staff.create(formData);
            }
            setShowModal(false);
            fetchStaff();
        } catch (err) {
            alert('Failed to save staff.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this staff member?')) return;
        try {
            await api.staff.delete(id);
            fetchStaff();
        } catch (err) { alert('Failed to delete staff.'); }
    };

    const getRoleBadge = (role: string) => {
        const colors: Record<string, string> = {
            ADMIN: 'bg-red-50 text-red-600 dark:bg-red-900/20',
            LIBRARIAN: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
            BORROWER: 'bg-gray-50 text-gray-600 dark:bg-gray-800'
        };
        return colors[role] || colors.BORROWER;
    };

    return (
        <div className="py-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">{t.staff} Management</h1>
                    <p className="text-sm text-gray-400">Manage librarians, admins, and staff accounts</p>
                </div>
                <button onClick={() => handleOpenModal()}
                    className="bg-brand-teal text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-teal-500/20">
                    <UserPlus size={18} /> Add Staff
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 dark:border-gray-800">
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.name}</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.username}</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.email}</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.role}</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {loading ? [1,2,3].map(i => (
                                <tr key={i} className="animate-pulse"><td colSpan={5} className="px-8 py-5"><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" /></td></tr>
                            )) : staffList.length > 0 ? staffList.map(s => (
                                <tr key={s.staffId} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xs">
                                                {s.staffName?.[0] || '?'}
                                            </div>
                                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{s.staffName}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-xs text-gray-500 dark:text-gray-400 font-mono">{s.loginId}</td>
                                    <td className="px-8 py-5 text-xs text-gray-500 dark:text-gray-400">{s.email || 'N/A'}</td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getRoleBadge(s.role)}`}>
                                            {s.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleOpenModal(s)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(s.staffId)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400">{t.noData}</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-800 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 italic">
                                {editingStaff ? 'Edit Staff' : 'Add New Staff'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-gray-400"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">{t.name}</label>
                                <input type="text" required value={formData.staffName} onChange={e => setFormData({...formData, staffName: e.target.value})}
                                    className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal text-gray-700 dark:text-gray-200" placeholder="Full Name" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">{t.username}</label>
                                    <input type="text" required value={formData.loginId} onChange={e => setFormData({...formData, loginId: e.target.value})}
                                        className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal text-gray-700 dark:text-gray-200" placeholder="username" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">{t.email}</label>
                                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal text-gray-700 dark:text-gray-200" placeholder="email@example.com" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">{t.password}</label>
                                <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                                    className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal text-gray-700 dark:text-gray-200"
                                    placeholder={editingStaff ? "Leave blank to keep" : "Password"} required={!editingStaff} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">{t.role}</label>
                                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                                    className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal text-gray-700 dark:text-gray-200">
                                    <option value="ADMIN">Admin</option>
                                    <option value="LIBRARIAN">Librarian</option>
                                    <option value="BORROWER">Borrower</option>
                                </select>
                            </div>
                            <button type="submit" disabled={submitting}
                                className="mt-2 bg-brand-teal text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50">
                                {submitting ? 'Saving...' : editingStaff ? 'Update Staff' : 'Add Staff'}
                                {!submitting && <Check size={20} />}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

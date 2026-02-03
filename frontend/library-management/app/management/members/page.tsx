'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { UserPlus, Edit2, Trash2, X, Check, Search, Mail, Phone, MapPin, Camera, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MemberManagementPage() {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        profileImage: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = () => {
        setLoading(true);
        api.readers.getAll()
            .then(data => {
                setMembers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const res = await api.files.upload(file);
            setFormData({ ...formData, profileImage: res.url || res.path });
        } catch (err) {
            console.error(err);
            alert('Failed to upload image.');
        }
    };

    const handleOpenModal = (member: any = null) => {
        if (member) {
            setEditingMember(member);
            setFormData({
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.email,
                phoneNumber: member.phoneNumber || '',
                address: member.address || '',
                profileImage: member.profileImage || ''
            });
        } else {
            setEditingMember(null);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                address: '',
                profileImage: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingMember) {
                await api.readers.update(editingMember.userId, formData);
            } else {
                await api.readers.create(formData);
            }
            setShowModal(false);
            fetchMembers();
        } catch (err) {
            console.error(err);
            alert('Failed to save member.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this member?')) return;
        try {
            await api.readers.delete(id);
            fetchMembers();
        } catch (err) {
            console.error(err);
            alert('Failed to delete member.');
        }
    };

    return (
        <div className="py-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">Member Management</h1>
                    <p className="text-sm text-gray-400">View and manage library readers</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-brand-teal text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-teal-500/20"
                >
                    <UserPlus size={18} />
                    Add Member
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 dark:border-gray-800">
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Address</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Join Date</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-8 py-5"><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full"></div></td>
                                    </tr>
                                ))
                            ) : members.length > 0 ? (
                                members.map((member) => (
                                    <tr key={member.userId} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative border border-gray-100 dark:border-gray-800">
                                                    {member.profileImage ? (
                                                        <img
                                                            src={member.profileImage.startsWith('http') || member.profileImage.startsWith('/static') ? member.profileImage : `http://localhost:8080${member.profileImage}`}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-brand-teal font-bold uppercase">
                                                            {member.firstName[0]}{member.lastName[0]}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{member.firstName} {member.lastName}</span>
                                                    <span className="text-[10px] text-gray-400 text-brand-teal uppercase">#{member.userId}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <Mail size={12} className="text-gray-300" />
                                                    {member.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <Phone size={12} className="text-gray-300" />
                                                    {member.phoneNumber || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <MapPin size={12} className="text-gray-300" />
                                                {member.address || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{member.joinDate}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(member)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(member.userId)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-gray-400">No members found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">
                                    {editingMember ? 'Edit Member' : 'Add New Member'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-400">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="flex flex-col items-center mb-4">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-teal-50 dark:border-teal-900 shadow-md relative">
                                            {formData.profileImage ? (
                                                <img
                                                    src={formData.profileImage.startsWith('http') || formData.profileImage.startsWith('/static') ? formData.profileImage : `http://localhost:8080${formData.profileImage}`}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-300">
                                                    <User size={40} />
                                                </div>
                                            )}
                                        </div>
                                        <label className="absolute bottom-0 right-0 bg-brand-teal text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                                            <Camera size={14} />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Profile Picture</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal transition-all text-gray-700 dark:text-gray-200"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal transition-all text-gray-700 dark:text-gray-200"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal transition-all text-gray-700 dark:text-gray-200"
                                        placeholder="john.doe@example.com"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal transition-all text-gray-700 dark:text-gray-200"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Address</label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-teal transition-all text-gray-700 dark:text-gray-200 min-h-[80px]"
                                        placeholder="123 Street Name, City"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="mt-4 bg-brand-teal text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {submitting ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
                                    {!submitting && <Check size={20} />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

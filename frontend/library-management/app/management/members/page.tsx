'use client';

import { ArrowDown, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function MemberManagementPage() {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = () => {
        setLoading(true);
        api.readers.getAll()
            .then(data => {
                setMembers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch members:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this member?')) {
            try {
                await api.readers.delete(id);
                fetchMembers();
            } catch (err) {
                console.error('Failed to delete member:', err);
            }
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                    Add Member
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    First name <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Last name <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Email <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Phone number <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Join Date <ArrowDown size={14} />
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
                        ) : members.length > 0 ? (
                            members.map((member) => (
                                <tr key={member.userId} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{member.firstName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{member.lastName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{member.phoneNumber}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{member.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleDelete(member.userId)}
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
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">No members found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

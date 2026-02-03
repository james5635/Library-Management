'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        firstName: 'Chanrojame',
        lastName: 'Sou',
        currentPassword: '',
        newPassword: '',
        role: 'Librarian'
    });

    return (
        <div className="flex flex-col items-center py-8 gap-12">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                    src="/static/UI/6.png" // Placeholder from UI
                    alt="Profile"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="w-full max-w-[400px] flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-400 px-1">First name</label>
                    <input
                        type="text"
                        className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-medium text-gray-400 px-1">Last name</label>
                    <input
                        type="text"
                        className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-gray-800">Password</label>
                    <input
                        type="password"
                        placeholder="Current password"
                        className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 placeholder:text-gray-300"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="New password"
                        className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 placeholder:text-gray-300"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-800">Role</label>
                    <input
                        type="text"
                        readOnly
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                        value={formData.role}
                    />
                </div>

                <button className="w-[100px] h-10 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors self-end">
                    Save
                </button>
            </div>
        </div>
    );
}

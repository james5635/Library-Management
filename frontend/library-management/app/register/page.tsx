'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-[320px] bg-white border border-gray-100 rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500">Username</label>
                        <input
                            type="text"
                            placeholder="Value"
                            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 placeholder:text-gray-300"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <input
                            type="email"
                            placeholder="Value"
                            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 placeholder:text-gray-300"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500">Password</label>
                        <input
                            type="password"
                            placeholder="Value"
                            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 placeholder:text-gray-300"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 bg-brand-teal text-white font-semibold rounded-xl hover:opacity-90 transition-opacity mt-2"
                    >
                        Register
                    </button>

                    <Link href="/login" className="text-sm text-gray-500 underline underline-offset-4 hover:text-brand-teal self-start">
                        Already have an account? Sign In
                    </Link>
                </form>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate reset
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-[400px] bg-white border border-gray-100 rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <input
                            type="email"
                            placeholder="Value"
                            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-teal text-gray-700 placeholder:text-gray-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-6 mt-2">
                        <Link href="/login" className="text-sm font-semibold text-gray-500 hover:text-gray-700">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="h-12 px-6 bg-brand-teal text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

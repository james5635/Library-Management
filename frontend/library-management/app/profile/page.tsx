'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { api, STORAGE_BASE_URL } from '@/lib/api';
import Image from 'next/image';
import { User, BookHeart, BookOpen, Save, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'profile' | 'loans' | 'likes'>('profile');
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [loans, setLoans] = useState<any[]>([]);
    const [likedBooks, setLikedBooks] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            setName(user.staffName || '');
            setPhone(user.phoneNumber || '');
            setAddress(user.address || '');
            
            // Fetch user data
            if (user.email) {
                api.loans.getByUser(user.email).then(setLoans).catch(console.error);
                api.interactions.getLikedBooks(user.email).then(setLikedBooks).catch(console.error);
            }
        }
    }, [user]);

    if (!user) {
        return <div className="p-8 text-center">Please login to view profile.</div>;
    }

    const handleSaveProfile = async () => {
        try {
            setLoading(true);
            console.log('Updating profile with:', {
                staffName: name,
                phoneNumber: phone,
                address: address,
            });
            const result = await api.staff.update(user.staffId, {
                staffName: name,
                phoneNumber: phone,
                address: address,
            });
            console.log('Update result:', result);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 5000);
        } catch (error: any) {
            console.error('Update error:', error);
            setMessage('Failed to update profile: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                <User className="text-brand-teal" size={32} />
                Profile & Settings
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar / Tabs */}
                <div className="w-full md:w-64 flex flex-col gap-2">
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${activeTab === 'profile' ? 'bg-brand-teal text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'}`}>
                        <User size={20} /> My Profile
                    </button>
                    <button 
                        onClick={() => setActiveTab('loans')}
                        className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${activeTab === 'loans' ? 'bg-brand-teal text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'}`}>
                        <BookOpen size={20} /> Borrowed Books
                    </button>
                    <button 
                        onClick={() => setActiveTab('likes')}
                        className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${activeTab === 'likes' ? 'bg-brand-teal text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'}`}>
                        <BookHeart size={20} /> Liked Books
                    </button>
                    <button 
                        onClick={logout}
                        className="flex items-center gap-3 p-4 rounded-xl text-left transition-all bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 mt-auto">
                        <LogOut size={20} /> {t.logout}
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                    {activeTab === 'profile' && (
                        <div className="max-w-xl">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Personal Information</h2>
                           
                            {/*
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-teal to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                                    {user.staffName?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{user.staffName}</h3>
                                    <p className="text-sm text-gray-500">{user.role}</p>
                                </div>
                            </div>
                            */}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        value={user.email} 
                                        disabled
                                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                    <input 
                                        type="text" 
                                        value={phone} 
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                                    <textarea 
                                        value={address} 
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows={3}
                                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {message && (
                                <div className={`mt-4 p-3 rounded-lg text-sm ${message.includes('successfully') ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                                    {message}
                                </div>
                            )}

                            <div className="mt-8">
                                <button 
                                    onClick={handleSaveProfile}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-lg font-bold shadow-md hover:bg-teal-600 transition-colors disabled:opacity-50">
                                    <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'loans' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                <BookOpen className="text-blue-500" /> Borrowed Books
                            </h2>
                            {loans.filter(loan => loan.status !== 'RETURNED').length === 0 ? (
                                <div className="text-gray-500 py-8 text-center bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">You don't have any active borrowed books at the moment.</div>
                            ) : (
                                <div className="grid gap-4">
                                    {loans.filter(loan => loan.status !== 'RETURNED').map((loan) => (
                                        <div key={loan.loanId} className="flex gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                            {loan.book?.coverImage && (
                                                <div className="w-16 h-24 relative rounded overflow-hidden flex-shrink-0">
                                                    <Image src={`${STORAGE_BASE_URL}${loan.book.coverImage}`} alt={loan.book.title} fill className="object-cover" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <Link href={`/book/${loan.book?.isbn}`} className="font-bold text-lg hover:text-brand-teal transition-colors">
                                                    {loan.book?.title}
                                                </Link>
                                                <div className="text-sm text-gray-500 mt-1">Due: {loan.dueDate}</div>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <div className={`text-xs inline-block px-2 py-1 rounded-full font-bold ${
                                                        loan.status === 'BORROWED' ? 'bg-blue-100 text-blue-700' :
                                                        loan.status === 'RETURNED' ? 'bg-green-100 text-green-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                        {loan.status}
                                                    </div>
                                                    {loan.status === 'BORROWED' && (
                                                        <button 
                                                            onClick={async () => {
                                                                try {
                                                                    await api.loans.returnBook(loan.loanId);
                                                                    if (user?.email) {
                                                                        const updatedLoans = await api.loans.getByUser(user.email);
                                                                        setLoans(updatedLoans);
                                                                    }
                                                                } catch (error) {
                                                                    console.error('Failed to return book:', error);
                                                                }
                                                            }}
                                                            className="text-xs font-bold text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full hover:bg-brand-teal hover:text-white transition-colors"
                                                        >
                                                            Return Book
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'likes' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                <BookHeart className="text-pink-500" /> Liked Books
                            </h2>
                            {likedBooks.length === 0 ? (
                                <div className="text-gray-500 py-8 text-center bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">You haven't liked any books yet.</div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {likedBooks.map((book) => (
                                        <Link href={`/book/${book.isbn}`} key={book.isbn} className="group relative aspect-[1/1.4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all block">
                                            {book.coverImage ? (
                                                <Image src={`${STORAGE_BASE_URL}${book.coverImage}`} alt={book.title} fill className="object-cover transition-transform group-hover:scale-105" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center p-4 text-center font-medium">
                                                    {book.title}
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pb-2 text-white">
                                                <h3 className="font-bold text-sm truncate">{book.title}</h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

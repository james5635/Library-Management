'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    staffId: number;
    staffName: string;
    loginId: string;
    email: string;
    role: 'ADMIN' | 'LIBRARIAN' | 'BORROWER';
    canManageDigital: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (loginId: string, password: string) => Promise<void>;
    register: (data: { loginId: string; password: string; name: string; email: string; role?: string }) => Promise<void>;
    logout: () => void;
    isAdmin: () => boolean;
    isLibrarian: () => boolean;
    isStaff: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:8080/api';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('library-user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (e) {
                localStorage.removeItem('library-user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (loginId: string, password: string) => {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loginId, password })
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'Login failed' }));
            throw new Error(err.error || 'Invalid credentials');
        }
        const userData = await res.json();
        setUser(userData);
        localStorage.setItem('library-user', JSON.stringify(userData));
    };

    const register = async (data: { loginId: string; password: string; name: string; email: string; role?: string }) => {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'Registration failed' }));
            throw new Error(err.error || 'Registration failed');
        }
        const userData = await res.json();
        setUser(userData);
        localStorage.setItem('library-user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('library-user');
    };

    const isAdmin = () => user?.role === 'ADMIN';
    const isLibrarian = () => user?.role === 'LIBRARIAN';
    const isStaff = () => user?.role === 'ADMIN' || user?.role === 'LIBRARIAN';

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, isLibrarian, isStaff }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

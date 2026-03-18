'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, BookOpen, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(formData.loginId, formData.password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-[380px] bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[32px] p-10 shadow-[0_20px_60px_rgb(0,0,0,0.06)]">
        
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30">
            <BookOpen className="text-white" size={28} />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">Library Management</h1>
            <p className="text-xs text-gray-400 mt-1">Sign in to your account</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal text-gray-700 placeholder:text-gray-300 transition-all"
              value={formData.loginId}
              onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full h-12 px-4 pr-12 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal text-gray-700 placeholder:text-gray-300 transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : 'Sign In'}
          </button>

          {/* Demo credentials */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Demo Accounts</p>
            <div className="flex flex-col gap-1 text-xs text-gray-500">
              <span><strong className="text-brand-teal">Admin:</strong> admin / admin123</span>
              <span><strong className="text-blue-500">Librarian:</strong> librarian / lib123</span>
              <span><strong className="text-gray-600">Borrower:</strong> jame / jame123</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm">
            <Link href="/register" className="text-gray-500 hover:text-brand-teal transition-colors">
              Don't have an account? <span className="font-semibold underline underline-offset-4">Register</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

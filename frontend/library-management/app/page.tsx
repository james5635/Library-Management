'use client';

import { Book, Users, Star, ArrowRight, Clock } from 'lucide-react';
import StatCard from '@/components/StatCard';
import BookCard from '@/components/BookCard';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.reports.getStats(),
      api.books.getAll()
    ]).then(([statsData, booksData]) => {
      setStats(statsData);
      setFeaturedBooks(booksData.slice(0, 5));
      setLoading(false);
    }).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-10 py-2">
      {/* Hero / Featured Section */}
      <div className="relative h-[300px] w-full rounded-[40px] overflow-hidden bg-gradient-to-r from-teal-500 to-teal-700 shadow-2xl shadow-teal-500/20 group">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 h-full flex items-center px-12 gap-12">
          <div className="flex-1 flex flex-col gap-4 text-white">
            <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
              <Star size={14} fill="currentColor" />
              Featured Book
            </div>
            <h1 className="text-4xl font-bold">Discover Your Next <br /> Great Adventure</h1>
            <p className="text-teal-50 text-sm max-w-md">Search and read through our extensive library of over 10,000 digital and physical books.</p>
            <Link href="/books" className="bg-white text-teal-600 px-8 py-3 rounded-xl font-bold w-fit hover:scale-105 transition-transform">
              Browse Catalog
            </Link>
          </div>
          <div className="hidden lg:block relative w-[200px] aspect-[2/3] rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
            <Image src="/static/UI/1.png" alt="Featured" fill className="rounded-lg object-cover" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Book}
          value={stats?.loans.total.toString() || "0"}
          label="Total Books"
          iconBgColor="bg-brand-yellow"
        />
        <StatCard
          icon={Users}
          value={stats?.userCount.toString() || "0"}
          label="Active Readers"
          iconBgColor="bg-blue-400"
        />
        <StatCard
          icon={Clock}
          value={stats?.loans.active.toString() || "0"}
          label="Current Loans"
          iconBgColor="bg-brand-teal"
        />
        <StatCard
          icon={Star}
          value={Math.round(stats?.loans.returnRate || 0).toString() + "%"}
          label="Return Rate"
          iconBgColor="bg-brand-red"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">Recently Added</h2>
            <p className="text-sm text-gray-400">The latest additions to our collection</p>
          </div>
          <Link href="/books" className="text-brand-teal font-bold text-sm flex items-center gap-2 hover:underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.isbn}
              isbn={book.isbn}
              title={book.title}
              author={book.authors?.map((a: any) => `${a.firstName} ${a.lastName}`).join(', ') || 'Unknown'}
              coverImage={book.coverImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

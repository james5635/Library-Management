'use client';

import { Book, Users } from 'lucide-react';
import StatCard from '@/components/StatCard';
import BookCard from '@/components/BookCard';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

const categories = ['Popular', 'Recommended', 'Newest', 'Oldest'];

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.books.getAll()
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch books:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <div className="flex gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm",
                activeCategory === cat
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="text-gray-400">Loading books...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book.isbn}
                  id={book.isbn}
                  title={book.title}
                  author={book.authors?.map((a: any) => `${a.firstName} ${a.lastName}`).join(', ') || 'Unknown'}
                  coverImage={book.coverImage || `/static/UI/${Math.floor(Math.random() * 10) + 1}.png`}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-400">
                No books found. Add some in the management panel!
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-[240px] flex flex-col gap-4">
        <StatCard
          icon={Book}
          value={books.length.toString()}
          label="Books"
          iconBgColor="bg-brand-yellow"
        />
        <StatCard
          icon={Users}
          value="0"
          label="Book Authors"
          iconBgColor="bg-blue-400"
        />
      </div>
    </div>
  );
}

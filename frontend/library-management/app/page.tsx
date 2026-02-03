'use client';

import { Book, Users } from 'lucide-react';
import StatCard from '@/components/StatCard';
import BookCard from '@/components/BookCard';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const categories = ['Popular', 'Recommended', 'Newest', 'Oldest'];

const dummyBooks = [
  { id: '1', title: 'Searching For Her', author: 'Rick Mofina', coverImage: '/static/UI/1.png' },
  { id: '2', title: 'For Love I Will', author: 'C. D. Sterling', coverImage: '/static/UI/2.png' },
  { id: '3', title: 'Knot by Knot', author: 'Davis Moore', coverImage: '/static/UI/3.png' },
  { id: '4', title: 'The Happiness Handbook', author: 'Landon Carter', coverImage: '/static/UI/4.png' },
  { id: '5', title: 'What Makes You Special', author: 'Britt Hallowell', coverImage: '/static/UI/5.png' },
  { id: '6', title: 'Dalia Does a Mitzvah', author: 'Jenna D.', coverImage: '/static/UI/6.png' },
  { id: '7', title: 'Of Mages and Makers', author: 'Rel Carroll', coverImage: '/static/UI/7.png' },
  { id: '8', title: 'Manly Man of God', author: 'Katharine Strange', coverImage: '/static/UI/8.png' },
  { id: '9', title: 'Dojo Dilemmas', author: 'Joseph Henry Cucci', coverImage: '/static/UI/9.png' },
  { id: '10', title: 'What Makes You Special', author: 'Britt Hallowell', coverImage: '/static/UI/10.png' },
];

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState('Popular');

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {dummyBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
            />
          ))}
        </div>
      </div>

      <div className="w-[240px] flex flex-col gap-4">
        <StatCard
          icon={Book}
          value="2341"
          label="Books"
          iconBgColor="bg-brand-yellow"
        />
        <StatCard
          icon={Users}
          value="28646"
          label="Book Authors"
          iconBgColor="bg-blue-400"
        />
      </div>
    </div>
  );
}

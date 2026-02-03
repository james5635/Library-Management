'use client';

import BookCard from '@/components/BookCard';

const bookmarkedBooks = [
    { id: '1', title: 'Searching For Her', author: 'Rick Mofina', coverImage: '/static/UI/1.png' },
    { id: '2', title: 'For Love I Will', author: 'C. D. Sterling', coverImage: '/static/UI/2.png' },
    { id: '3', title: 'Knot by Knot', author: 'Davis Moore', coverImage: '/static/UI/3.png' },
    { id: '4', title: 'The Happiness Handbook', author: 'Landon Carter', coverImage: '/static/UI/4.png' },
    { id: '5', title: 'What Makes You Special', author: 'Britt Hallowell', coverImage: '/static/UI/5.png' },
    { id: '6', title: 'Dalia Does a Mitzvah', author: 'Jenna D.', coverImage: '/static/UI/6.png' },
];

export default function BookmarkPage() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
            {bookmarkedBooks.map((book) => (
                <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    coverImage={book.coverImage}
                    showButtons={true}
                />
            ))}
        </div>
    );
}

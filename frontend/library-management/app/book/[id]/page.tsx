'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { api, STORAGE_BASE_URL } from '@/lib/api';
import { Heart, Lock, BookOpen, ThumbsUp, MessageCircle, Send, Sparkles, CalendarClock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookViewerPage() {
    const params = useParams();
    const [book, setBook] = useState<any>(null);
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [checkingAccess, setCheckingAccess] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');
    const [showSummary, setShowSummary] = useState(false);
    const [summary, setSummary] = useState('');
    const [loadingSummary, setLoadingSummary] = useState(false);
    const { user } = useAuth();
    const { t } = useLanguage();

    const userEmail = user?.email || "chanrojame@example.com";
    const userName = user?.staffName || "User";

    useEffect(() => {
        if (params.id) {
            const isbn = params.id as string;

            api.books.getOne(isbn).then(setBook).catch(console.error);
            api.assets.getByBook(isbn).then(data => { setAssets(data); setLoading(false); }).catch(() => setLoading(false));
            api.loans.checkActive(userEmail, isbn).then(res => { setHasAccess(res.hasActiveLoan); setCheckingAccess(false); }).catch(() => setCheckingAccess(false));
            api.bookmarks.check(userEmail, isbn).then(res => setIsBookmarked(res.isBookmarked)).catch(console.error);
            api.interactions.getLikes(isbn, userEmail).then(res => { setLiked(res.liked); setLikeCount(res.count); }).catch(console.error);
            api.interactions.getComments(isbn).then(setComments).catch(console.error);
        }
    }, [params.id, userEmail]);

    const handleToggleBookmark = async () => {
        try {
            const res = await api.bookmarks.toggle(userEmail, params.id as string);
            setIsBookmarked(res.status === 'added');
        } catch (err) { console.error(err); }
    };

    const handleToggleLike = async () => {
        try {
            const res = await api.interactions.toggleLike(params.id as string, userEmail);
            setLiked(res.liked);
            setLikeCount(res.count);
        } catch (err) { console.error(err); }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const comment = await api.interactions.addComment(params.id as string, {
                email: userEmail, name: userName, content: newComment
            });
            setComments([comment, ...comments]);
            setNewComment('');
        } catch (err) { console.error(err); }
    };

    const handleSummarize = async () => {
        setShowSummary(true);
        setLoadingSummary(true);
        try {
            const res = await api.ai.summarize(params.id as string);
            setSummary(res.summary);
        } catch (err) {
            setSummary('Failed to generate summary.');
        } finally {
            setLoadingSummary(false);
        }
    };

    const handleBorrow = async () => {
        try {
            await api.loans.create({
                book: { isbn: params.id },
                reader: { email: userEmail },
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: 'BORROWED'
            });
            setHasAccess(true);
        } catch (err) {
            alert("Failed to borrow book.");
        }
    };

    const handleReserve = async () => {
        try {
            await api.reservations.create(params.id as string, userEmail);
            alert("Book reserved successfully!");
        } catch (err) {
            alert("Failed to reserve book.");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-400">{t.loading}</div>;
    if (!book) return <div className="p-8 text-center text-red-400">Book not found.</div>;

    const digitalContentUrl = assets.find(a => a.contentUrl)?.contentUrl;
    const isPdf = digitalContentUrl?.toLowerCase().endsWith('.pdf');
    const getFullUrl = (path: string) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `${STORAGE_BASE_URL}${path}`;
    };
    const fullContentUrl = getFullUrl(digitalContentUrl);
    const fullCoverUrl = getFullUrl(book?.coverImage) || "/static/UI/2.png";

    if (checkingAccess) return <div className="p-8 text-center text-gray-400">Verifying access...</div>;

    if (!hasAccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400">
                    <Lock size={40} />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{book.title}</h2>
                    <p className="text-gray-500 max-w-md">{book.description?.substring(0, 200)}...</p>
                    {book.status && (
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full w-fit mx-auto ${
                            book.status === 'AVAILABLE' ? 'bg-green-50 text-green-600' :
                            book.status === 'BORROWED' ? 'bg-orange-50 text-orange-600' :
                            book.status === 'RESERVED' ? 'bg-blue-50 text-blue-600' :
                            'bg-red-50 text-red-600'
                        }`}>
                            {t[book.status.toLowerCase() as keyof typeof t] || book.status}
                        </span>
                    )}
                </div>
                <div className="flex gap-3">
                    <button onClick={handleBorrow}
                        className="bg-brand-teal text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                        <BookOpen size={20} /> {t.borrowNow}
                    </button>
                    {book.status === 'BORROWED' && (
                        <button onClick={handleReserve}
                            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                            <CalendarClock size={20} /> {t.reserveBook}
                        </button>
                    )}
                </div>
                <button onClick={handleSummarize}
                    className="text-purple-500 font-semibold text-sm flex items-center gap-1 hover:underline">
                    <Sparkles size={16} /> {t.summarize}
                </button>
                {showSummary && (
                    <div className="max-w-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-2xl p-6 text-left text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {loadingSummary ? 'Generating summary...' : summary}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 py-4 max-w-[1200px] mx-auto">
            {/* Action Bar */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button onClick={handleToggleLike}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-bold ${
                            liked ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 text-pink-500' 
                                  : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-pink-200 hover:text-pink-500'
                        }`}>
                        <ThumbsUp size={16} fill={liked ? "currentColor" : "none"} />
                        {likeCount} {t.like}
                    </button>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MessageCircle size={14} /> {comments.length} {t.comments}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleSummarize}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 text-purple-600 text-sm font-bold hover:bg-purple-100 transition-colors">
                        <Sparkles size={16} /> {t.summarize}
                    </button>
                    <button onClick={handleToggleBookmark}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-bold ${
                            isBookmarked ? 'bg-brand-red border-brand-red text-white'
                                         : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-brand-red hover:text-brand-red'
                        }`}>
                        <Heart size={16} fill={isBookmarked ? "currentColor" : "none"} />
                        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>
                </div>
            </div>

            {/* AI Summary */}
            {showSummary && (
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-2xl p-6 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {loadingSummary ? (
                        <div className="flex items-center gap-2 text-purple-500">
                            <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                            Generating AI summary...
                        </div>
                    ) : summary}
                </div>
            )}

            {/* Reader - Only show if not PHYSICAL and has content URL */}
            {book?.bookType !== 'PHYSICAL' && isPdf && fullContentUrl && (
                <div className="w-full h-[80vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-8">
                    <iframe src={fullContentUrl || ''} className="w-full h-full border-none" title="PDF Viewer" />
                </div>
            )}
            
            {(book?.bookType === 'PHYSICAL' || !isPdf) && (
                <div className="flex justify-center gap-8 mt-8">
                    <div className="flex-1 max-w-[500px] aspect-[1/1.4] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 p-8 flex flex-col gap-6 relative">
                        {book?.bookType === 'PHYSICAL' && (
                            <div className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                Physical Book Only
                            </div>
                        )}
                        <div className="text-[10px] text-gray-400 font-medium">{book?.title || 'Untitled'}</div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{book?.title || 'Document'}</h2>
                        {fullCoverUrl && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                                <Image src={fullCoverUrl} alt="Cover" fill className="object-cover" />
                            </div>
                        )}
                        <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-serif">
                            {book?.description || "No description available for this book."}
                        </div>
                        {book?.bookType === 'PHYSICAL' && (
                            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 text-xs rounded-xl text-center border border-yellow-100 dark:border-yellow-800">
                                This book is only available physically. Please visit the library to borrow it.
                            </div>
                        )}
                        <div className="mt-auto text-center text-[10px] text-gray-400">- 1 -</div>
                    </div>
                </div>
            )}

            {/* Comments Section */}
            <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-8">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <MessageCircle size={20} /> {t.comments} ({comments.length})
                </h3>

                {/* Add Comment */}
                <div className="flex gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {userName[0]}
                    </div>
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            placeholder={t.writeComment}
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                            className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 border-none text-gray-700 dark:text-gray-200"
                        />
                        <button onClick={handleAddComment}
                            className="px-4 py-2 bg-brand-teal text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                            <Send size={16} />
                        </button>
                    </div>
                </div>

                {/* Comment List */}
                <div className="flex flex-col gap-4">
                    {comments.map((c, i) => (
                        <div key={i} className="flex gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 text-xs font-bold flex-shrink-0">
                                {(c.readerName || c.readerEmail)?.[0] || '?'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{c.readerName || c.readerEmail}</span>
                                    <span className="text-[10px] text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{c.content}</p>
                            </div>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <div className="text-center text-gray-400 py-8 text-sm">No comments yet. Be the first to comment!</div>
                    )}
                </div>
            </div>
        </div>
    );
}

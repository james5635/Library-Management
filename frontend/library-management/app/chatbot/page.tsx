'use client';

import { Mic, SendHorizontal, Bot, User, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { api } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! 👋 I'm the Library AI Assistant. I can help you with:\n\n• **Book recommendations** - Ask me to suggest books\n• **Book summaries** - Click 'Summarize' on any book page\n• **Library information** - Ask about borrowing policies, hours, etc.\n• **Reading suggestions** - Tell me what genres you like\n\nHow can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();
    const { user } = useAuth();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        
        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const res = await api.ai.ask(userMessage);
            setMessages(prev => [...prev, { role: 'assistant', content: res.response }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatContent = (content: string) => {
        return content.split('\n').map((line, i) => {
            // Bold text
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
                <span key={i}>
                    {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
                        }
                        return <span key={j}>{part}</span>;
                    })}
                    {i < content.split('\n').length - 1 && <br />}
                </span>
            );
        });
    };

    return (
        <div className="h-[calc(100vh-180px)] flex flex-col max-w-[800px] mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Sparkles size={20} className="text-white" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t.aiAssistant}</h2>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Powered by Library AI</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 pr-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                            msg.role === 'user' 
                                ? 'bg-gradient-to-br from-teal-400 to-teal-600 text-white' 
                                : 'bg-gradient-to-br from-violet-400 to-purple-600 text-white'
                        }`}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user'
                                ? 'bg-brand-teal text-white rounded-tr-sm'
                                : 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-tl-sm border border-gray-100 dark:border-gray-800'
                        }`}>
                            {formatContent(msg.content)}
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center">
                            <Bot size={16} className="text-white" />
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="h-[80px] flex items-center">
                <div className="w-full h-14 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center px-5 gap-3 shadow-sm focus-within:ring-2 focus-within:ring-brand-teal/30 transition-all">
                    <input
                        type="text"
                        placeholder={t.askAnything}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 text-sm"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                        className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-teal-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <SendHorizontal size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

'use client';

import { SendHorizontal, Bot, User, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm the Library AI Assistant. I can help you with:\n\n- **Book recommendations** - Ask me to suggest books\n- **Book summaries** - Click 'Summarize' on any book page\n- **Library information** - Ask about borrowing policies, hours, etc.\n- **Reading suggestions** - Tell me what genres you like\n\nHow can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        
        const userMessage = input.trim();
        setInput('');
        setLoading(true);

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        let assistantIndex = -1;
        setMessages(prev => {
            assistantIndex = prev.length;
            return [...prev, { role: 'assistant', content: '' }];
        });

        try {
            const response = await fetch('http://localhost:8080/api/ai/ask/stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userMessage })
            });

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                let fullResponse = '';
                
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    const chunk = decoder.decode(value);
                    
                    if (chunk.includes('[END]')) {
                        fullResponse += chunk.replace('[END]', '');
                        break;
                    }
                    if (chunk.includes('[ERROR]')) {
                        fullResponse = chunk.replace('[ERROR]', '');
                        break;
                    }
                    
                    fullResponse += chunk;
                    
                    setMessages(prev => {
                        const updated = [...prev];
                        updated[assistantIndex] = { role: 'assistant', content: fullResponse };
                        return updated;
                    });
                }
                
                setMessages(prev => {
                    const updated = [...prev];
                    updated[assistantIndex] = { role: 'assistant', content: fullResponse };
                    return updated;
                });
            }
        } catch (err) {
            setMessages(prev => {
                const updated = [...prev];
                updated[assistantIndex] = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
                return updated;
            });
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

    return (
        <div className="h-[calc(100vh-180px)] flex flex-col max-w-[800px] mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Sparkles size={20} className="text-white" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Chat Assistant</h2>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">AI Powered</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 pr-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        {msg.role === 'assistant' && msg.content && (
                            <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-violet-400 to-purple-600 text-white">
                                <Bot size={16} />
                            </div>
                        )}
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user'
                                ? 'bg-brand-teal text-white rounded-tr-sm'
                                : msg.content
                                ? 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-tl-sm border border-gray-100 dark:border-gray-800'
                                : ''
                        }`}>
                            {msg.role === 'assistant' && msg.content ? (
                                <div className="prose prose-sm dark:prose-invert max-w-none [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_em]:italic">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            ) : msg.role === 'user' ? (
                                <span className="whitespace-pre-wrap">{msg.content}</span>
                            ) : null}
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-violet-400 to-purple-600 text-white">
                            <Bot size={16} />
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

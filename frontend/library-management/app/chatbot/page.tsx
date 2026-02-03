'use client';

import { Mic, SendHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function ChatbotPage() {
    const [messages, setMessages] = useState([
        { role: 'user', content: 'what is java language?' },
        { role: 'assistant', content: 'Java is a high-level, object-oriented programming language created by Sun Microsystems (now owned by Oracle). It is designed to be platform-independent, meaning a Java program can run on different operating systems without modification by using the Java Virtual Machine (JVM).\n\nJava is widely used to build web applications, mobile apps (especially Android), desktop software, enterprise systems, and server-side applications. It emphasizes security, reliability, and performance, with features such as automatic memory management (garbage collection), strong typing, and a rich standard library.\nBecause of its "write once, run anywhere" principle, strong community support, and scalability,\n\nJava is commonly used in large systems like banking software, enterprise platforms, and cloud services.' }
    ]);

    return (
        <div className="h-[calc(100vh-180px)] flex flex-col max-w-[800px] mx-auto">
            <div className="flex-1 overflow-y-auto py-8 flex flex-col gap-8">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user'
                                ? 'bg-gray-100 text-gray-800 rounded-tr-none'
                                : 'text-gray-700 whitespace-pre-wrap'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-[100px] flex items-center px-4">
                <div className="w-full h-16 bg-gray-100 rounded-full border border-gray-200 flex items-center px-6 gap-4">
                    <input
                        type="text"
                        placeholder="Ask anything"
                        className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder:text-gray-400"
                    />
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Mic size={24} />
                    </button>
                    <button className="text-gray-400 hover:text-brand-teal transition-colors">
                        <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                            <SendHorizontal size={20} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

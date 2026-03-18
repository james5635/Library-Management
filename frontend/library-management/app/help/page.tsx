'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { HelpCircle, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function HelpPage() {
    const { t } = useLanguage();
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        { q: "How do I borrow a book?", a: "You can find a book in the catalog, click on it, and then click 'Reserve'. Physical copies must be picked up at the front desk, while digital copies are available entirely online." },
        { q: "Can I read e-books purely online?", a: "Yes, any book that is labeled as DIGITAL or BOTH has a 'Read Online' feature that allows you to view the PDF right in your browser." },
        { q: "How do I return a book?", a: "Physical books must be dropped off at the library return bin. If you want to view the list of books you have borrowed, navigate to your Profile." },
        { q: "What does the AI chatbot do?", a: "The AI chatbot can answer general questions and recommend books. Additionally, on any book detail page, you can ask the AI Assistant for an automated summary of the text." },
        { q: "My profile image is broken?", a: "To update your profile image, click on your Profile picture in the Navigation bar, select 'Profile', and upload a new picture directly from your computer." },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black mb-2 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                <HelpCircle className="text-brand-teal" size={40} />
                Help & Support
            </h1>
            <p className="text-gray-500 mb-10 text-lg">Frequently asked questions and application licensing details.</p>

            <div className="grid gap-12">
                {/* FAQ Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full text-left p-5 flex justify-between items-center bg-transparent hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                    <span className="font-bold text-gray-800 dark:text-gray-200">{faq.q}</span>
                                    <ChevronDown className={`text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="p-5 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                        <div className="pt-4">{faq.a}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* License Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
                        <FileText className="text-gray-400" /> License Information
                    </h2>
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
{`MIT License

Copyright (c) 2026 Sou Chanrojame

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
                    </div>
                </section>
            </div>
        </div>
    );
}

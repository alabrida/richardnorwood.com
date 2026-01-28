'use client';

import { useState } from 'react';
import { ChatMessage } from '@/components/pro-tools/ChatMessage';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! I am your AI Strategy Assistant. I have analyzed your assessment data. How can I help you optimize your revenue engine today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSend(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();

            setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the strategy engine." }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-[600px] border border-[var(--color-border)] rounded-[var(--radius-xl)] bg-[var(--color-card)] overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} role={msg.role} content={msg.content} />
                ))}
                {loading && (
                    <div className="flex items-center gap-2 text-[var(--color-muted)] text-sm ml-4">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce delay-75" />
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce delay-150" />
                        Thinking...
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-background)]">
                <form onSubmit={handleSend} className="flex gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask strategically..."
                        className="flex-1 px-4 py-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium rounded-[var(--radius-lg)] disabled:opacity-50"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

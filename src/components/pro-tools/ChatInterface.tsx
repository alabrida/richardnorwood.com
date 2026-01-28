"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Using standard input for simplicity if needed
import { Send, Sparkles } from "lucide-react";
import { ChatMessage } from "@/components/pro-tools/ChatMessage";
import { motion, AnimatePresence } from "motion/react";

export function ChatInterface() {
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant", content: string }>>([
        { role: "assistant", content: "Hello! I analyze your revenue architecture. How can I help you optimize your engine today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        // Simulation of AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Based on your audit data, the biggest leak is in the Conversion stage. You should implement an automated invoice chaser."
            }]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[600px] bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-zinc-950/50 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-sm text-white">Revenue Architect AI</span>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <ChatMessage key={i} role={msg.role} content={msg.content} />
                ))}
                {isLoading && (
                    <div className="flex w-full gap-4 p-4 bg-white/5 rounded-2xl">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-orange-500/10 text-orange-500">
                            <Bot className="h-4 w-4 animate-bounce" />
                        </div>
                        <div className="flex items-center gap-1">
                            <motion.div className="w-2 h-2 bg-zinc-500 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
                            <motion.div className="w-2 h-2 bg-zinc-500 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                            <motion.div className="w-2 h-2 bg-zinc-500 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-zinc-950/50">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about your revenue leaks..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-zinc-500"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 bg-orange-600 hover:bg-orange-500 text-white rounded-lg"
                        disabled={isLoading}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}

// Minimal icon component to avoid circular dependency if needed or just use lucide
import { Bot } from "lucide-react";

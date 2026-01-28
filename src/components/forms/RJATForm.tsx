"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // We'll need to ensure we have a basic Input component or use standard input
import { ArrowRight, Globe, Mail } from "lucide-react";
import { motion } from "motion/react";

interface RJATFormProps {
    onSubmit: (data: { url: string; email: string }) => void;
    isLoading: boolean;
}

export function RJATForm({ onSubmit, isLoading }: RJATFormProps) {
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ url, email });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-md mx-auto"
        >
            <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="space-y-2">
                    <label htmlFor="url" className="text-sm font-medium text-zinc-300 ml-1">Website URL</label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                        <input
                            type="url"
                            id="url"
                            required
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 py-3 pl-10 pr-4 text-white placeholder-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-300 ml-1">Business Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 py-3 pl-10 pr-4 text-white placeholder-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 text-base font-semibold bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)] mt-2"
                >
                    {isLoading ? "Starting Engine..." : "Start Analysis"}
                    {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>

                <p className="text-xs text-center text-zinc-500 mt-4">
                    By clicking Start, you agree to receive your report via email.
                </p>
            </form>
        </motion.div>
    );
}

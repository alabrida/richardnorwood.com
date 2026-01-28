"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import content from "@/content/contact.json";
import { cn } from "@/lib/utils";

export function ContactForm() {
    const { form } = content;
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Simple state form handling
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-zinc-900/30 border border-emerald-500/30 rounded-2xl text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Message Received</h3>
                <p className="text-zinc-400">{form.success}</p>
                <Button
                    variant="outline"
                    className="mt-6 border-zinc-700 text-zinc-300 hover:text-white"
                    onClick={() => setIsSuccess(false)}
                >
                    Send Another
                </Button>
            </div>
        );
    }

    return (
        <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-display font-bold text-white mb-6">{form.title}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-zinc-300">{form.fields.name.label}</label>
                        <input
                            id="name"
                            required
                            type="text"
                            placeholder={form.fields.name.placeholder}
                            className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-zinc-300">{form.fields.email.label}</label>
                        <input
                            id="email"
                            required
                            type="email"
                            placeholder={form.fields.email.placeholder}
                            className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-zinc-300">{form.fields.company.label}</label>
                    <input
                        id="company"
                        type="text"
                        placeholder={form.fields.company.placeholder}
                        className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="inquiry" className="text-sm font-medium text-zinc-300">{form.fields.inquiry.label}</label>
                    <select
                        id="inquiry"
                        className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none"
                    >
                        {form.fields.inquiry.options.map((opt, idx) => (
                            <option key={idx} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-zinc-300">{form.fields.message.label}</label>
                    <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder={form.fields.message.placeholder}
                        className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full py-6 text-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)]"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        form.submit
                    )}
                </Button>
            </form>
        </div>
    );
}

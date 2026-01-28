"use client";

import content from "@/content/contact.json";

export function CalendlyEmbed() {
    const { calendly } = content;

    return (
        <div className="flex flex-col h-full">
            <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{calendly.title}</h3>
                <p className="text-zinc-400">{calendly.description}</p>
            </div>

            <div className="flex-grow w-full min-h-[600px] bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden relative">
                <iframe
                    src="https://calendly.com/richardnorwood?background_color=09090b&text_color=ffffff&primary_color=10b981"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Select a Date & Time - Calendly"
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            </div>
        </div>
    );
}

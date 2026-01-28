'use client';

import { useState } from 'react';
import { LandingPreview } from '@/components/pro-tools/LandingPreview';
import { toast } from 'sonner';

export function LandingPageGenerator() {
    const [loading, setLoading] = useState(false);
    const [html, setHtml] = useState('');
    const [topic, setTopic] = useState('');

    async function handleGenerate(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/generate-landing', {
                method: 'POST',
                body: JSON.stringify({ topic })
            });
            const data = await res.json();
            setHtml(data.html);
            toast.success('Landing page generated!');
        } catch (error) {
            toast.error('Failed to generate page');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[600px]">
            {/* Controls */}
            <div className="lg:col-span-1 p-6 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)] flex flex-col gap-6">
                <div>
                    <h3 className="text-xl font-bold mb-4">Generator Controls</h3>
                    <label className="block text-sm font-medium mb-2">Campaign Focus</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Q1 webinar for SaaS founders"
                        className="w-full px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] mb-4"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full py-3 bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] text-white font-bold rounded-[var(--radius-lg)] transition-all shadow-lg"
                    >
                        {loading ? 'Generating...' : 'Generate Page'}
                    </button>
                </div>

                <div className="mt-auto pt-6 border-t border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-muted)] mb-4">
                        This tool uses your assessment data to write copy that addresses your specific revenue leaks.
                    </p>
                </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-2 rounded-[var(--radius-xl)] bg-[var(--color-background)] border border-[var(--color-border)] overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-card)]">
                    <div className="text-sm font-bold">Preview</div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                </div>
                <div className="flex-1 bg-white relative">
                    {html ? (
                        <LandingPreview html={html} />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            Generate a page to see preview
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

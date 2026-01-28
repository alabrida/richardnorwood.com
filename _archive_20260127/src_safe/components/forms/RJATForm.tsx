'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface RJATFormProps {
    onSubmit: (data: { url: string; companyName: string; email: string }) => void;
    isLoading: boolean;
}

export function RJATForm({ onSubmit, isLoading }: RJATFormProps) {
    const [url, setUrl] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url || !companyName || !email) {
            toast.error('Please fill in all fields');
            return;
        }
        onSubmit({ url, companyName, email });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
                <label htmlFor="url" className="block text-sm font-medium mb-1">Website URL</label>
                <input
                    type="url"
                    id="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
            </div>

            <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name</label>
                <input
                    type="text"
                    id="companyName"
                    placeholder="Acme Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 text-lg font-bold text-white bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] rounded-[var(--radius-xl)] shadow-[0_0_20px_rgba(255,102,0,0.3)] transition-all disabled:opacity-50"
            >
                {isLoading ? 'Initializing...' : 'Start Deep Scan'}
            </button>
        </form>
    );
}

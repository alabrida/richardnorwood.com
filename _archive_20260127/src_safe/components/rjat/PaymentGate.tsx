'use client';

import Link from 'next/link';

export function PaymentGate({ onUnlock }: { onUnlock: () => void }) {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-block px-4 py-1 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] text-sm font-bold mb-4">
                    Analysis Complete
                </div>
                <h2 className="text-3xl font-bold mb-4">Your Revenue Engine Report is Ready</h2>
                <p className="text-[var(--color-muted)]">
                    We found 12 critical leaks in your funnel. Unlock the full report to see the fixes.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Snapshot */}
                <div className="p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] opacity-50 relative pointer-events-none">
                    <h3 className="text-xl font-bold mb-2">Basic Snapshot</h3>
                    <div className="text-3xl font-bold mb-4">Free</div>
                    <p className="text-sm mb-6">High-level score only.</p>
                    <button className="w-full py-3 bg-[var(--color-border)] text-[var(--color-muted)] rounded-[var(--radius-lg)]">
                        Current Plan
                    </button>
                </div>

                {/* Full Report */}
                <div className="p-8 rounded-[var(--radius-xl)] border border-[var(--color-primary)] bg-[var(--color-card)] relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        RECOMMENDED
                    </div>

                    <h3 className="text-xl font-bold mb-2">Deep Audit Report</h3>
                    <div className="text-3xl font-bold mb-4 text-gradient">$499</div>
                    <p className="text-[var(--color-muted)] mb-6">
                        Full leak detection, priority fixes, and tactical roadmap.
                    </p>

                    <ul className="space-y-3 mb-8 text-sm">
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Full 5-Stage Scorecard
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Top 5 Priority Leaks
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            90-Day Action Plan
                        </li>
                    </ul>

                    <button
                        onClick={onUnlock}
                        className="w-full py-3 bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] text-white font-bold rounded-[var(--radius-lg)] shadow-lg transition-all"
                    >
                        Unlock Full Report
                    </button>
                    <p className="text-xs text-center mt-3 text-[var(--color-muted)]">
                        One-time payment. 100% money-back guarantee.
                    </p>
                </div>
            </div>
        </div>
    );
}

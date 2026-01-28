'use client';

import { BlurGate } from '@/components/dashboard/BlurGate';
import { ScoreRadarChart } from '@/components/dashboard/ScoreRadarChart';

export function ResultsPreview({ onUnlock }: { onUnlock: () => void }) {
    const mockRadarData = [
        { stage: 'Awareness', score: 2, fullMark: 3 },
        { stage: 'Consideration', score: 1, fullMark: 3 },
        { stage: 'Decision', score: 3, fullMark: 3 },
        { stage: 'Conversion', score: 1.5, fullMark: 3 },
        { stage: 'Retention', score: 1, fullMark: 3 },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Initial Scan Results</h2>
                <p className="text-[var(--color-muted)]">
                    We've generated a high-level snapshot of your revenue engine.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)]">
                    <h3 className="text-xl font-bold mb-6">Engine Health</h3>
                    <ScoreRadarChart data={mockRadarData} />
                </div>

                <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-card)] border border-[var(--color-border)]">
                    <h3 className="text-xl font-bold mb-6">Critical Leaks Detected</h3>
                    <BlurGate
                        isLocked={true}
                        title="Unlock Full Diagnostics"
                        description="Upgrade to see exactly where you are losing revenue."
                        ctaText="Unlock Report"
                        ctaHref="#"
                    >
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-16 bg-[var(--color-background)] rounded mb-2" />
                            ))}
                        </div>
                    </BlurGate>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={onUnlock}
                    className="px-8 py-4 text-lg font-bold text-white bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] rounded-[var(--radius-xl)] transition-colors"
                >
                    See Full Report & Fixes
                </button>
            </div>
        </div>
    );
}

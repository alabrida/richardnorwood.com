'use client';

import { Container } from '@/components/layout';

export function RubricPreviewSection() {
    return (
        <section className="py-24 bg-[var(--color-card)] border-y border-[var(--color-border)]">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">The Revenue Intelligence Matrix</h2>
                    <p className="text-[var(--color-muted)] max-w-2xl mx-auto">
                        We don't guess. We inspect the vitals of your business against our proprietary 40-point diagnostic rubric.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--color-border)] bg-[var(--color-card)]">
                                <th className="p-6 font-mono text-sm text-[var(--color-muted)] uppercase tracking-wider">Stage</th>
                                <th className="p-6 font-mono text-sm text-[var(--color-muted)] uppercase tracking-wider">Signal Category</th>
                                <th className="p-6 font-mono text-sm text-[var(--color-muted)] uppercase tracking-wider">Detection Logic</th>
                                <th className="p-6 font-mono text-sm text-[var(--color-muted)] uppercase tracking-wider">Weight</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)] font-mono text-sm">
                            {/* Row 1 */}
                            <tr className="hover:bg-[var(--color-primary)]/5 transition-colors group">
                                <td className="p-6 font-bold text-[var(--color-awareness)]">1. Awareness</td>
                                <td className="p-6 font-bold">Active Multi-Platform Presence</td>
                                <td className="p-6 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)]">
                                    Platform count &gt; 2 AND Recency &lt; 7 days
                                </td>
                                <td className="p-6 text-[var(--color-muted)]">15%</td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-[var(--color-primary)]/5 transition-colors group">
                                <td className="p-6 font-bold text-[var(--color-awareness)]">1. Awareness</td>
                                <td className="p-6 font-bold">SEO/URL Authority</td>
                                <td className="p-6 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)]">
                                    Domain rank &lt; 50 AND Meta Quality Score &gt; 80
                                </td>
                                <td className="p-6 text-[var(--color-muted)]">12%</td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-[var(--color-consideration)]/5 transition-colors group">
                                <td className="p-6 font-bold text-[var(--color-consideration)]">2. Consideration</td>
                                <td className="p-6 font-bold">Evidence-Based Content</td>
                                <td className="p-6 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)]">
                                    Case Study Page (HTTP 200) AND Freshness &lt; 30 days
                                </td>
                                <td className="p-6 text-[var(--color-muted)]">20%</td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="hover:bg-[var(--color-decision)]/5 transition-colors group">
                                <td className="p-6 font-bold text-[var(--color-decision)]">3. Decision</td>
                                <td className="p-6 font-bold">Reputation Management</td>
                                <td className="p-6 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)]">
                                    GMB Link Valid AND Review Response Rate &gt; 90%
                                </td>
                                <td className="p-6 text-[var(--color-muted)]">20%</td>
                            </tr>
                            {/* Row 5 */}
                            <tr className="hover:bg-[var(--color-conversion)]/5 transition-colors group">
                                <td className="p-6 font-bold text-[var(--color-conversion)]">4. Conversion</td>
                                <td className="p-6 font-bold">Speed to Lead ($Δt1$)</td>
                                <td className="p-6 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)]">
                                    Response Time &lt; 5 Minutes
                                </td>
                                <td className="p-6 text-[var(--color-muted)]">Critical</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="p-4 bg-[var(--color-card)] border-t border-[var(--color-border)] text-center">
                        <span className="text-sm text-[var(--color-muted)]">
                            + 35 more data points...
                        </span>
                    </div>
                </div>
            </Container>
        </section>
    );
}

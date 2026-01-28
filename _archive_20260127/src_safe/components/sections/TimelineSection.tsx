'use client';

import { Container } from '@/components/layout';
import content from '@/content/services.json';

export function TimelineSection() {
    return (
        <section className="py-24">
            <Container>
                <h2 className="text-3xl font-bold text-center mb-16">{content.timeline.title}</h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-border)] -translate-x-1/2" />

                    <div className="space-y-12">
                        {content.timeline.phases.map((phase, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={phase.phase} className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Dot */}
                                    <div className="relative z-10 w-8 h-8 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-background)]" />

                                    {/* Content */}
                                    <div className={`flex-1 md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-12 md:pl-0`}>
                                        <div className="text-[var(--color-accent)] font-bold mb-1">{phase.duration}</div>
                                        <h3 className="text-xl font-bold mb-2">{phase.phase}</h3>
                                        <p className="text-[var(--color-muted)]">{phase.description}</p>
                                    </div>

                                    <div className="hidden md:block flex-1" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}

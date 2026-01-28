'use client';

import { Container } from '@/components/layout';
import content from '@/content/homepage.json';

export function AboutSection() {
    return (
        <section id="about" className="py-24 md:py-32 bg-[var(--color-card)] border-t border-[var(--color-border)]">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Placeholder */}
                    <div className="aspect-square rounded-[var(--radius-2xl)] bg-[var(--color-border)] overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <div className="absolute bottom-6 left-6 z-20">
                            <p className="text-white font-bold text-xl">{content.about.name}</p>
                            <p className="text-white/80 text-sm">{content.about.title}</p>
                        </div>
                        {/* Replace with actual Next/Image later */}
                        <div className="w-full h-full bg-[var(--color-muted)]/20 flex items-center justify-center">
                            <span className="text-[var(--color-muted)]">Image: {content.about.name}</span>
                        </div>
                    </div>

                    {/* Copy */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            {content.about.title}
                        </h2>
                        <div className="prose prose-invert prose-lg text-[var(--color-muted)] mb-8">
                            <p>{content.about.bio}</p>
                        </div>
                        <a
                            href="/contact"
                            className="inline-flex items-center text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-hover)] transition-colors group"
                        >
                            Start a Conversation
                            <svg
                                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}

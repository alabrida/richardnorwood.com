'use client';

import { Container } from '@/components/layout';
import content from '@/content/homepage.json';
import { motion } from 'framer-motion';

const LOGOS = [
    {
        name: "Stripe",
        svg: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="h-8 md:h-10">
                <path d="M13.97 12.38C13.97 7.72 17.65 6.47 20 6.47C22.09 6.47 24.18 7.35 25.4 8.23L26.65 3.32C24.8 2.37 22.4 1.83 19.97 1.83C12.4 1.83 8.35 6.09 8.35 12.24C8.35 19.94 18.9 19 18.9 23.47C18.9 26.66 14.28 27.26 12 27.26C9.37 27.26 6.8 26.04 5.27 24.59L3.5 29.56C5.8 31.06 9.13 32.06 12 32.06C20.6 32.06 24.7 27.06 24.7 21.03C24.7 12.21 13.97 13.91 13.97 12.38ZM35 31.42H40.7V10.12H35V31.42ZM37.9 7.82C39.8 7.82 41.35 6.27 41.35 4.37C41.35 2.47 39.8 0.92 37.9 0.92C36 0.92 34.45 2.47 34.45 4.37C34.45 6.27 36 7.82 37.9 7.82ZM52.4 10.12H46.7V31.43H52.4V19.38C52.4 16.48 54.1 14.88 56.5 14.88C57.3 14.88 57.9 14.98 58.4 15.18V9.78C57.8 9.58 56.8 9.48 56 9.48C54.1 9.48 52.4 10.38 51.5 11.78V10.12H52.4ZM64.5 10.12H58.8V31.43H64.5V10.12ZM61.7 7.82C63.6 7.82 65.15 6.27 65.15 4.37C65.15 2.47 63.6 0.92 61.7 0.92C59.8 0.92 58.25 2.47 58.25 4.37C58.25 6.27 59.8 7.82 61.7 7.82ZM83.9 10.12H78.2V35.42H83.9V26.02C84.8 27.52 86.8 28.12 88.3 28.12C93 28.12 96.5 24.42 96.5 19.12C96.5 13.82 93 10.12 88.3 10.12C86.7 10.12 84.9 10.92 83.9 11.92V10.12ZM87.2 23.32C84.9 23.32 83.3 21.62 83.3 19.12C83.3 16.62 84.9 14.92 87.2 14.92C89.5 14.92 91.1 16.62 91.1 19.12C91.1 21.62 89.5 23.32 87.2 23.32ZM107 20.32H98.6C98.8 22.82 100.9 23.82 102.7 23.82C104.1 23.82 105.3 23.22 106.1 22.32L109.8 24.82C108.3 27.12 105.7 28.22 102.7 28.22C97.5 28.22 93.3 24.52 93.3 19.12C93.3 14.12 97.4 10.12 102 10.12C106.3 10.12 109.2 13.52 109.2 18.52C109.2 19.22 109.12 19.92 109 20.32H107ZM102 14.42C100.2 14.42 98.7 15.62 98.5 17.02H104.8C104.6 15.62 103.52 14.42 102 14.42Z" />
            </svg>
        )
    },
    {
        name: "Vercel",
        svg: (
            <svg viewBox="0 0 1155 1000" fill="currentColor" className="h-8 md:h-10">
                <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
            </svg>
        )
    },
    {
        name: "Linear",
        svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 md:h-10">
                <path d="M12.75 3.03l-1.5 0.77a.75.75 0 0 0-.36.37l-6.81 16.89l-1.07.24a.75.75 0 0 0-.57.91a.75.75 0 0 0 .91.57l1.49-.33l.23 0a.75.75 0 0 0 .63-.44l.84-2.07l11.19-2.52l2.67 1.34a.75.75 0 0 0 1.05-.28a.75.75 0 0 0-.34-1.01l-18.41-9.2l1.35-.69l17.7 8.85l-11.2 2.52l-2.04-4.8l10.08-4.32l.62-.27l-5.46-13.44a.75.75 0 0 0-1.01-.39z" />
            </svg>
        )
    }
];

export function SocialProofSection() {
    return (
        <section className="py-24 border-t border-[var(--color-border)] bg-[var(--color-background)]">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">{content.socialProof.title}</h2>
                    <p className="text-[var(--color-muted)]">
                        {content.socialProof.subhead}
                    </p>
                </div>

                {/* Logos */}
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mb-24">
                    {LOGOS.map((logo) => (
                        <div key={logo.name} className="text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors">
                            {logo.svg}
                        </div>
                    ))}
                    {/* Repeat for perceived density */}
                    {LOGOS.map((logo) => (
                        <div key={`${logo.name}-2`} className="text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors hidden md:block">
                            {logo.svg}
                        </div>
                    ))}
                </div>

                {/* Case Study Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.socialProof.caseStudies.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass rounded-[var(--radius-xl)] p-8 hover:border-[var(--color-primary)] transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 font-mono text-6xl font-bold text-[var(--color-primary)] translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform">
                                {index + 1}
                            </div>

                            <div className="relative z-10">
                                <span className="inline-block text-xs font-mono text-[var(--color-primary)] mb-2 uppercase tracking-widest bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                                    {study.label}
                                </span>
                                <div className="text-5xl font-bold text-white mb-4 tracking-tight">
                                    {study.metric}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                                    {study.title}
                                </h3>
                                <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                                    {study.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

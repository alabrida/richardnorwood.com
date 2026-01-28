'use client';

import { Container } from '@/components/layout';
import Link from 'next/link';
import { LiquidTiltCard } from '@/components/ui/LiquidTiltCard';

const SAAS_PLANS = [
    {
        name: "Free",
        price: "$0",
        period: "/forever",
        desc: "For curiosity seekers.",
        features: [
            "Revenue Journey Assessment",
            "Blurred Dashboard Results",
            "Basic Readiness Score"
        ],
        cta: "Start Audit",
        href: "/calculator",
        primary: false
    },
    {
        name: "Standard",
        price: "$97",
        period: "/month",
        desc: "For serious operators.",
        features: [
            "Unblurred Dashboard",
            "Historical Data Tracking",
            "Custom Rubric Access",
            "Basic Strategy Chat"
        ],
        cta: "Start Trial",
        href: "/signup?plan=standard",
        primary: false
    },
    {
        name: "Pro (High Value DIY)",
        price: "$297",
        period: "/month",
        desc: "For builders & bootstrappers.",
        features: [
            "Everything in Standard",
            "Landing Page Generator",
            "DIY Content Library",
            "Smart Recommendations Engine",
            "Priority Support"
        ],
        cta: "Get Pro Access",
        href: "/signup?plan=pro",
        primary: true
    }
];

export default function PricingPage() {
    return (
        <div className="pt-32 pb-24">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl font-bold mb-6">Choose Your Weapon</h1>
                    <p className="text-xl text-[var(--color-muted)]">
                        Whether you want to build it yourself with our tools (**The Platform**) or have us build it for you (**The Partnership**), we have a tier for your stage of maturity.
                    </p>
                </div>

                {/* SaaS Section */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-[var(--color-border)]" />
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--color-muted)]">The Platform (SaaS)</h2>
                        <div className="h-px flex-1 bg-[var(--color-border)]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {SAAS_PLANS.map((plan, i) => (
                            <LiquidTiltCard
                                key={i}
                                neonColor={plan.primary ? 'var(--color-primary)' : 'var(--color-border)'}
                                className={`flex flex-col ${plan.primary ? 'shadow-glow' : ''}`}
                            >
                                <div className="p-8 h-full flex flex-col">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                        <p className="text-[var(--color-muted)] text-sm">{plan.desc}</p>
                                    </div>
                                    <div className="mb-8">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-[var(--color-muted)]">{plan.period}</span>
                                    </div>
                                    <ul className="space-y-4 mb-8 flex-1">
                                        {plan.features.map((feat, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <svg className={`w-5 h-5 mt-0.5 ${plan.primary ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={plan.href}
                                        className={`block w-full py-3 text-center rounded-[var(--radius-lg)] font-bold transition-all ${plan.primary
                                            ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white'
                                            : 'bg-[var(--color-border)] hover:bg-[var(--color-muted)]/20'
                                            }`}
                                    >
                                        {plan.cta}
                                    </Link>
                                </div>
                            </LiquidTiltCard>
                        ))}
                    </div>
                </div>

                {/* Service Section */}
                <div className="rounded-[var(--radius-2xl)] glass p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6">Need the Architect?</h2>
                        <p className="text-[var(--color-muted)] max-w-2xl mx-auto mb-8">
                            For established businesses, we offer the **90-Day Revenue Journey Partnership**.
                            We install the engine, you drive the car.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <LiquidTiltCard neonColor="var(--color-decision)" className="w-full md:w-auto min-w-[300px]">
                                <div className="p-6 text-left">
                                    <div className="font-bold text-[var(--color-decision)] mb-1">Tier 2: The Blueprint</div>
                                    <div className="text-2xl font-bold mb-4">Retainer</div>
                                    <ul className="text-sm text-[var(--color-muted)] space-y-2">
                                        <li>• Co-Created Battle Plan</li>
                                        <li>• Weekly Strategy Classes</li>
                                    </ul>
                                </div>
                            </LiquidTiltCard>
                            <LiquidTiltCard neonColor="var(--color-conversion)" className="w-full md:w-auto min-w-[300px]">
                                <div className="p-6 text-left">
                                    <div className="font-bold text-[var(--color-conversion)] mb-1">Tier 1: The Build</div>
                                    <div className="text-2xl font-bold mb-4">$9,000+</div>
                                    <ul className="text-sm text-[var(--color-muted)] space-y-2">
                                        <li>• Full Engine Installation</li>
                                        <li>• Done-For-You Assets</li>
                                    </ul>
                                </div>
                            </LiquidTiltCard>
                        </div>
                        <div className="mt-12">
                            <Link href="/contact" className="px-8 py-4 bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] text-white font-bold rounded-full transition-all shadow-lg">
                                Apply for Partnership
                            </Link>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
}

import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import content from "@/content/case-studies.json";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        slug: string;
    }>
}

export function generateStaticParams() {
    return content.map((study) => ({
        slug: study.slug,
    }));
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const study = content.find((s) => s.slug === slug);

    if (!study) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <Container>
                    <Link href="/case-studies" className="inline-flex items-center text-sm text-zinc-500 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Evidence Locker
                    </Link>

                    <div className="max-w-4xl mx-auto">
                        <div className="mb-12">
                            <div className="flex gap-2 mb-6">
                                {study.tags.map(tag => (
                                    <span key={tag} className="text-xs font-mono px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded border border-indigo-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                                {study.title}
                            </h1>
                            <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl border-l-2 border-indigo-500 pl-6">
                                {study.summary}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-16 border-y border-white/10 py-8 bg-white/5 rounded-xl px-8">
                            {study.stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-3xl md:text-5xl font-bold text-white mb-1 tracking-tighter">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs uppercase tracking-widest text-zinc-500">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            {study.content.map((section, index) => (
                                <section key={index} className="mb-12">
                                    <h2 className="text-2xl font-bold text-white mb-4">
                                        {section.title}
                                    </h2>
                                    <p className="text-zinc-400">
                                        {section.body}
                                    </p>
                                </section>
                            ))}
                        </div>

                        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Ready to build your engine?</h3>
                            <Link
                                href="/audit"
                                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
                            >
                                Start Engine Diagnostic
                            </Link>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}

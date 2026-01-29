import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import content from "@/content/case-studies.json";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CaseStudiesPage() {
    return (
        <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <Container>
                    <div className="max-w-2xl mb-16">
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                            Evidence Locker.
                        </h1>
                        <p className="text-xl text-zinc-400">
                            We don't rely on luck. We rely on physics. Here is the data-driven proof of our Revenue Architecture.
                        </p>
                    </div>

                    <BentoGrid className="max-w-7xl mx-auto">
                        {content.map((study, i) => (
                            <Link href={`/case-studies/${study.slug}`} key={i} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                                <BentoGridItem
                                    title={study.title}
                                    description={
                                        <div className="mt-2">
                                            <p className="text-zinc-400 mb-4 line-clamp-3">{study.summary}</p>
                                            <div className="flex gap-2 mb-4">
                                                {study.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] uppercase font-mono px-2 py-1 bg-white/5 rounded border border-white/10 text-zinc-400">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex gap-4 border-t border-white/5 pt-4">
                                                {study.stats.map(stat => (
                                                    <div key={stat.label}>
                                                        <div className="text-lg font-bold text-white">{stat.value}</div>
                                                        <div className="text-[10px] uppercase text-zinc-500">{stat.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                    header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 mb-4 group-hover/bento:border-indigo-500/30 transition-colors" />}
                                    className="h-full bg-zinc-900/40 border-white/10 hover:bg-zinc-900/60"
                                    icon={<ArrowRight className="h-4 w-4 text-zinc-500" />}
                                />
                            </Link>
                        ))}
                    </BentoGrid>
                </Container>
            </main>
            <Footer />
        </div>
    );
}

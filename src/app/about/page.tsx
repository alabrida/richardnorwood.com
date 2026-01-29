import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden selection:bg-indigo-500/30">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        {/* Hero / Intro */}
                        <div className="mb-16">
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-8">
                                The Architect Behind <br />
                                <span className="text-zinc-500">The Revenue Engine.</span>
                            </h1>
                            <p className="text-xl text-zinc-400 leading-relaxed">
                                I don't just build websites; I engineer systems. For over a decade, I've helped modern enterprises stop guessing and start scaling by rigorously applying the principles of revenue architecture.
                            </p>
                        </div>

                        {/* Philosophy Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                            <div className="glass p-8 rounded-2xl border border-white/10">
                                <h3 className="text-2xl font-display font-bold text-white mb-4">Engineering Over Luck</h3>
                                <p className="text-zinc-400">
                                    Most companies treat revenue like a lottery. They hope for viral hits or lucky breaks. I treat it like a machine. Every input (content, ads, outreach) must have a predictable output (leads, sales, retention).
                                </p>
                            </div>
                            <div className="glass p-8 rounded-2xl border border-white/10">
                                <h3 className="text-2xl font-display font-bold text-white mb-4">The 5-Stage Standard</h3>
                                <p className="text-zinc-400">
                                    My methodology is built on the 5-Stage Revenue Journey: Awareness, Consideration, Decision, Delivery, and Advocacy. If any gear in this engine is broken, the whole machine stalls.
                                </p>
                            </div>
                        </div>

                        {/* Bio / Background */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-display font-bold text-white mb-6">Background</h2>
                            <p className="text-zinc-400 mb-6">
                                Richard Norwood is a Revenue Engine Architect based in [City, State]. With a background deeply rooted in both technical systems and strategic marketing, Richard bridges the gap between code and commerce.
                            </p>
                            <p className="text-zinc-400 mb-6">
                                He has partnered with startups and Fortune 500 companies alike to dismantle broken sales funnels and rebuild them as robust, data-driven engines. His work focuses on integrating high-performance web development with precise user journey mapping.
                            </p>
                            <p className="text-zinc-400">
                                When not architecting revenue systems, Richard is likely exploring the frontiers of Agentic AI and its application in automating complex business logic.
                            </p>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}

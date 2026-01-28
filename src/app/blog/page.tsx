import { getAllPosts } from "@/lib/wp";
import { BlogHero } from "@/components/sections/BlogHero";
import { BlogCard } from "@/components/ui/BlogCard";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default async function BlogIndexPage() {
    const posts = await getAllPosts();

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden selection:bg-violet-500/30">
            <Header />
            <main className="flex-grow">
                <BlogHero />

                <section className="pb-32">
                    <Container>
                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
                                <p className="text-zinc-400">Check back later for new updates.</p>
                            </div>
                        )}
                    </Container>
                </section>
            </main>
            <Footer />
        </div>
    );
}

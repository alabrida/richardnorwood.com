import { getPostBySlug, getAllPosts } from "@/lib/wp";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import "@/styles/prose.css"; // We'll create a small CSS file for prose styles if not using plugin

// Generate static params for ISR
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden selection:bg-violet-500/30">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <article>
                    {/* Header */}
                    <Container className="max-w-3xl mb-12">
                        <Link href="/blog" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-8 text-sm group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Insights
                        </Link>

                        <div className="flex items-center text-sm text-violet-400 mb-6 font-medium">
                            <Calendar className="w-4 h-4 mr-2" />
                            {date}
                        </div>

                        <h1
                            className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-8"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />

                        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={post._embedded['wp:featuredmedia'][0].source_url}
                                alt={post.title.rendered}
                                className="w-full h-auto aspect-video object-cover rounded-2xl border border-zinc-800"
                            />
                        )}
                    </Container>

                    {/* Content */}
                    <Container className="max-w-3xl">
                        <div
                            className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-violet-400 hover:prose-a:text-violet-300 prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                        />
                    </Container>
                </article>
            </main>
            <Footer />
        </div>
    );
}

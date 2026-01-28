import { Container } from '@/components/layout';
import { getPosts, BlogPost } from '@/lib/wordpress';
import Link from 'next/link';

// Placeholder for missing image
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%2394a3b8'%3EBlog Post Image%3C/text%3E%3C/svg%3E";

export default async function BlogIndexPage() {
    const posts = await getPosts();

    return (
        <main className="py-20 md:py-32">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                        Revenue Intelligence
                    </h1>
                    <p className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto">
                        Insights, strategies, and tactics to optimize your commercial engine.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 border rounded-[var(--radius-xl)] border-dashed border-[var(--color-border)]">
                        <p className="text-[var(--color-muted)]">No posts found. Connect WordPress API.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                                <article className="h-full flex flex-col bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-xl)] overflow-hidden transition-all hover:border-[var(--color-primary)] hover:shadow-lg">
                                    {/* Image */}
                                    <div className="aspect-video bg-[var(--color-muted)]/10 relative overflow-hidden">
                                        <img
                                            src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || PLACEHOLDER_IMAGE}
                                            alt={post.title.rendered}
                                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="text-xs font-bold text-[var(--color-primary)] mb-3">
                                            {new Date(post.date).toLocaleDateString()}
                                        </div>
                                        <h2
                                            className="text-xl font-bold mb-3 line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />
                                        <div
                                            className="text-[var(--color-muted)] text-sm line-clamp-3 mb-4 flex-1"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        />
                                        <span className="text-[var(--color-primary)] font-medium text-sm group-hover:underline">
                                            Read Article →
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </main>
    );
}

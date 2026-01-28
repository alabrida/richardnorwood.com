import { Container } from '@/components/layout';
import { getPostBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Placeholder for missing image
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%2394a3b8'%3EBlog Post Image%3C/text%3E%3C/svg%3E";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="py-20 md:py-32">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link href="/blog" className="text-[var(--color-primary)] hover:underline font-medium">
                            ← Back to Intelligence
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className="text-sm font-bold text-[var(--color-primary)] mb-4 uppercase tracking-wider">
                            {new Date(post.date).toLocaleDateString()}
                        </div>
                        <h1
                            className="text-3xl md:text-5xl font-bold mb-8 leading-tight"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />

                        {/* Hero Image */}
                        <div className="aspect-video w-full rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-muted)]/10 mb-8">
                            <img
                                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || PLACEHOLDER_IMAGE}
                                alt={post.title.rendered}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </header>

                    {/* Content */}
                    <article
                        className="prose prose-invert prose-lg max-w-none 
                prose-headings:text-[var(--color-foreground)] 
                prose-p:text-[var(--color-muted)]
                prose-a:text-[var(--color-primary)] hover:prose-a:text-[var(--color-primary-hover)]
                prose-strong:text-[var(--color-foreground)]
                prose-code:text-[var(--color-accent)]
                prose-blockquote:border-[var(--color-primary)] prose-blockquote:bg-[var(--color-card)] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    />

                    {/* Footer CTA */}
                    <div className="mt-16 p-8 bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-xl)] text-center">
                        <h3 className="text-2xl font-bold mb-4">Want to apply this to your business?</h3>
                        <p className="text-[var(--color-muted)] mb-8">
                            Take our 5-minute audit to benchmark your revenue engine.
                        </p>
                        <Link
                            href="/calculator"
                            className="inline-block px-8 py-4 text-lg font-bold text-white bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] rounded-[var(--radius-xl)] transition-colors"
                        >
                            Audit Your Engine
                        </Link>
                    </div>
                </div>
            </Container>
        </main>
    );
}

import Link from "next/link";
import { WPPost } from "@/lib/wp";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar } from "lucide-react";

// Helper to strip HTML tags for excerpt preview
function stripHtml(html: string) {
    return html.replace(/<[^>]*>?/gm, '');
}

export function BlogCard({ post }: { post: WPPost }) {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Link href={`/blog/${post.slug}`} className="group relative block h-full">
            <div className="relative h-full overflow-hidden rounded-2xl bg-zinc-900/30 border border-white/5 transition-all duration-300 hover:border-violet-500/50 hover:bg-zinc-900/50 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] flex flex-col">

                {/* Image Placeholder or Actual Image */}
                <div className="aspect-video w-full overflow-hidden bg-zinc-800 relative">
                    {featuredImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={featuredImage}
                            alt={post.title.rendered}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center bg-zinc-950">
                            <span className="text-zinc-700 font-display font-bold text-2xl opacity-20 group-hover:opacity-30 transition-opacity">
                                RN
                            </span>
                        </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-xs text-violet-400 mb-3 font-medium">
                        <Calendar className="w-3 h-3 mr-1.5" />
                        {date}
                    </div>

                    <h3
                        className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-violet-200 transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">
                        {stripHtml(post.excerpt.rendered)}
                    </p>

                    <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="w-4 h-4 ml-2 text-violet-500" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

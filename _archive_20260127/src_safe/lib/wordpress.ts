export interface BlogPost {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string }>;
        author?: Array<{ name: string }>;
    };
}

const WP_API_URL = process.env.WP_API_URL;

export async function getPosts(): Promise<BlogPost[]> {
    if (!WP_API_URL) return [];

    try {
        const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=9`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
    } catch (error) {
        console.error('WordPress API Error:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!WP_API_URL) return null;

    try {
        const res = await fetch(`${WP_API_URL}/posts?_embed&slug=${slug}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) throw new Error('Failed to fetch post');
        const posts = await res.json();
        return posts[0] || null;
    } catch (error) {
        console.error('WordPress API Error:', error);
        return null;
    }
}

export interface WPPost {
    id: number;
    date: string;
    slug: string;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
        }>;
    };
}

const WP_API_URL = process.env.WP_API_URL;

if (!WP_API_URL) {
    console.error("WP_API_URL is not defined in .env.local");
}

export async function getAllPosts(): Promise<WPPost[]> {
    if (!WP_API_URL) return [];

    try {
        // Fetch posts with embedded media (for featured images)
        const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=10`, {
            next: { revalidate: 3600 }, // ISR: Revalidate every hour
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching ALL posts:", error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
    if (!WP_API_URL) return null;

    try {
        const res = await fetch(`${WP_API_URL}/posts?_embed&slug=${slug}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch post by slug: ${res.statusText}`);
        }

        const posts = await res.json();
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
}

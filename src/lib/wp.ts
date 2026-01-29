import { ENDPOINTS } from "./api/endpoints";

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

export async function getAllPosts(): Promise<WPPost[]> {
    try {
        // Fetch posts with embedded media (for featured images)
        const res = await fetch(`${ENDPOINTS.WORDPRESS.POSTS}?_embed&per_page=10`, {
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
    try {
        const res = await fetch(`${ENDPOINTS.WORDPRESS.POSTS}?_embed&slug=${slug}`, {
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

// WordPress API client utilities.
// These functions are used by the /api/blog route handler (server-side only).
// They are NOT 'use server' actions — they are plain async functions.

import type { WPPost, WPCategory, NormalizedPost } from './types';

const WP_API_URL = process.env.WP_API_URL;

export async function fetchPosts(): Promise<NormalizedPost[]> {
  if (!WP_API_URL) return [];

  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];

    const posts: WPPost[] = await res.json();
    if (!posts || posts.length === 0) return [];

    return posts.map(normalizePost);
  } catch {
    return [];
  }
}

export async function fetchPost(slug: string): Promise<NormalizedPost | null> {
  if (!WP_API_URL) return null;

  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;

    const posts: WPPost[] = await res.json();
    if (!posts || posts.length === 0) return null;

    return normalizePost(posts[0]);
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<WPCategory[]> {
  if (!WP_API_URL) return [];
  try {
    const res = await fetch(`${WP_API_URL}/categories`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function normalizePost(wp: WPPost): NormalizedPost {
  const authorName = wp._embedded?.author?.[0]?.name || 'Unknown Author';

  let categoryName = 'Uncategorized';
  if (wp._embedded?.['wp:term']) {
    const categories = wp._embedded['wp:term'].find(
      (terms) => terms.length > 0 && terms[0].taxonomy === 'category'
    );
    if (categories && categories.length > 0) {
      categoryName = categories[0].name;
    }
  }

  const rawExcerpt = wp.excerpt?.rendered || '';
  const cleanExcerpt =
    rawExcerpt.replace(/<[^>]*>?/gm, '').trim() ||
    `${rawExcerpt.substring(0, 100)}...`;

  return {
    id: String(wp.id),
    title: wp.title?.rendered || 'Untitled',
    excerpt: cleanExcerpt,
    body: wp.content?.rendered || '',
    date: wp.date || new Date().toISOString(),
    slug: wp.slug,
    author: authorName,
    category: categoryName,
  };
}

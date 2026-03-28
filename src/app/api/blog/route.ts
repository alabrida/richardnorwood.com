import { NextRequest, NextResponse } from 'next/server';
import type { NormalizedPost } from '@/lib/wordpress/types';
import blogStub from '@/../content/blog-stub.json';

const WP_API_URL = process.env.WP_API_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const slug = searchParams.get('slug');

  // Single post by slug
  if (slug) {
    const post = await fetchSinglePost(slug);
    return NextResponse.json(post);
  }

  // All posts
  const posts = await fetchAllPosts();
  return NextResponse.json(posts);
}

async function fetchAllPosts(): Promise<NormalizedPost[]> {
  if (!WP_API_URL) return blogStub;

  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return blogStub;

    const posts = await res.json();
    if (!posts || posts.length === 0) return blogStub;

    return posts.map(normalizeWPPost);
  } catch {
    return blogStub;
  }
}

async function fetchSinglePost(slug: string): Promise<NormalizedPost | null> {
  const stubPost = blogStub.find((p) => p.slug === slug);

  if (!WP_API_URL) return stubPost || null;

  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return stubPost || null;

    const posts = await res.json();
    if (!posts || posts.length === 0) return stubPost || null;

    return normalizeWPPost(posts[0]);
  } catch {
    return stubPost || null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeWPPost(wp: any): NormalizedPost {
  const authorName = wp._embedded?.author?.[0]?.name || 'Unknown Author';

  let categoryName = 'Uncategorized';
  if (wp._embedded?.['wp:term']) {
    const categories = wp._embedded['wp:term'].find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (terms: any[]) => terms.length > 0 && terms[0].taxonomy === 'category'
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

import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/wp';
import { SITE_URL, siteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/pricing',
    '/contact',
    '/calculator',
    '/blog',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: route === '' ? SITE_URL : siteUrl(route),
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const wpPosts = await getAllPosts();
  const blogRoutes = wpPosts.map((post) => ({
    url: siteUrl(`/blog/${post.slug}`),
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const revenueJourneyStages = [
    'awareness',
    'consideration',
    'decision',
    'conversion',
    'retention',
  ].map((stage) => ({
    url: siteUrl(`/revenue-journey/${stage}`),
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...revenueJourneyStages];
}

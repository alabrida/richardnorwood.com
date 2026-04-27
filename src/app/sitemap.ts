import { MetadataRoute } from 'next';
import blogData from '../../content/blog-stub.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://richardnorwood.com';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/pricing',
    '/contact',
    '/calculator',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
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
    url: `${baseUrl}/revenue-journey/${stage}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...revenueJourneyStages];
}

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://richardnorwood.com';

  const staticRoutes = [
    '',
    '/services',
    '/pricing',
    '/contact',
    '/calculator',
    '/login',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // In a real app, you would fetch blog posts here and add them to the sitemap
  // const blogRoutes = posts.map(post => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: post.date, ... }))

  return [...staticRoutes];
}

import React from 'react'
import BlogCard from '@/components/blog/BlogCard'
import PageHero from '@/components/sections/PageHero'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/metadata'
import { getAllPosts, decodeHtml } from '@/lib/wp'

export const metadata = buildMetadata({
  title: 'Field Notes | Richard Norwood, PMP',
  description: 'Practical insights on Revenue Architecture, commercial systems, and building stronger buyer journeys.',
  path: '/blog',
})

export default async function BlogIndex() {
  const wpPosts = await getAllPosts()
  
  // Map WordPress REST API format to the expected UI format
  const blogData = wpPosts.map(post => ({
    id: post.id,
    title: decodeHtml(post.title.rendered),
    slug: post.slug,
    date: post.date,
    excerpt: decodeHtml(post.excerpt.rendered.replace(/<[^>]*>?/gm, '')), // strip html tags and decode
    category: 'Field Notes', // Fallback since WP meta wasn't registered
    author: 'Richard Norwood'
  }))

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: metadata.title,
    description: metadata.description,
    url: 'https://www.richardnorwood.com/blog',
    blogPost: blogData.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://www.richardnorwood.com/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        '@id': 'https://www.richardnorwood.com/#person'
      }
    }))
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.richardnorwood.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Field Notes',
        item: 'https://www.richardnorwood.com/blog'
      }
    ]
  }

  return (
    <main>
      <JsonLd data={[blogSchema, breadcrumbSchema]} />
      <PageHero
        title="Field Notes"
        subtitle="Practical insights on Revenue Architecture, commercial systems, and building stronger buyer journeys."
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 var(--space-4) var(--space-16)' }}>
        {blogData.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-8)' }}>
            {blogData.map((post, idx) => (
              <BlogCard key={post.id} post={post} idx={idx} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No field notes published yet.</p>
        )}
      </div>
    </main>
  )
}

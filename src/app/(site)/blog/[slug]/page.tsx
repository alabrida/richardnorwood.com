import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/metadata'
import { getAllPosts, getPostBySlug } from '@/lib/wp'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { AuthorBio } from '@/components/blog/AuthorBio'
import { BrandDoctrine } from '@/components/blog/BrandDoctrine'
import styles from './BlogPost.module.css'

// Generate static params for all posts to ensure edge delivery
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return buildMetadata({
    title: `${post.title.rendered} | Field Notes — Richard Norwood, PMP`,
    description: post.excerpt.rendered.replace(/<[^>]*>?/gm, ''),
    path: `/blog/${post.slug}`,
    type: 'article',
  })
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
  
  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>?/gm, '')
  const title = post.title.rendered
  const author = 'Richard Norwood'
  const category = 'Field Notes'

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: cleanExcerpt,
    datePublished: post.date,
    author: {
      '@id': 'https://richardnorwood.com/#person'
    },
    url: `https://richardnorwood.com/blog/${post.slug}`
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://richardnorwood.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Field Notes',
        item: 'https://richardnorwood.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `https://richardnorwood.com/blog/${post.slug}`
      }
    ]
  }

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-20) var(--space-4) var(--space-24)' }}>
      <JsonLd data={[blogPostingSchema, breadcrumbSchema]} />
      <Link href="/blog" style={{ color: 'var(--color-text-subtle)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-12)' }}>
        ← Back to Field Notes
      </Link>

      <div className={styles.blogLayout}>
        <TableOfContents />

        <article className={styles.blogContent}>
          <header style={{ marginBottom: 'var(--space-12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <span style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
                {category}
              </span>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <span style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-sm)' }}>
                {formattedDate}
              </span>
            </div>
            <h1 
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-text)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-6)' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-surface-elevated)' }} />
              <div>
                <div style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>{author}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Guide & Revenue Architecture Advisor</div>
              </div>
            </div>
          </header>

          <div 
            className={styles.article}
            style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
          />

          <AuthorBio />
          <BrandDoctrine />
        </article>
      </div>
    </main>
  )
}

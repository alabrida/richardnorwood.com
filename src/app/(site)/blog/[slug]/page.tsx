import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import blogData from '../../../../../content/blog-stub.json'
import styles from './BlogPost.module.css'

// Generate static params for all stubbed posts to ensure edge delivery
export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogData.find((p) => p.slug === params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | Alabrida Field Notes`,
    description: post.excerpt,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogData.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-20) var(--space-4) var(--space-24)' }}>
      <Link href="/blog" style={{ color: 'var(--color-text-subtle)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-12)' }}>
        ← Back to Field Notes
      </Link>

      <article>
        <header style={{ marginBottom: 'var(--space-12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <span style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
              {post.category}
            </span>
            <span style={{ color: 'var(--color-border)' }}>|</span>
            <span style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-sm)' }}>
              {formattedDate}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-text)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-6)' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            {/* Hardcoded Avatar Placeholder */}
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-surface-elevated)' }} />
            <div>
              <div style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>{post.author}</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Chief Revenue Architect</div>
            </div>
          </div>
        </header>

        {/* Note: In production with MDX, this is sanitized or rendered via a specific React-Markdown component */}
        <div 
          className={styles.article}
          style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}
          dangerouslySetInnerHTML={{ __html: post.body }} 
        />
      </article>
    </main>
  )
}

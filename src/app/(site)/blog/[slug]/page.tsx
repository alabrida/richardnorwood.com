import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/metadata'
import { getAllPosts, getPostBySlug } from '@/lib/wp'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { AuthorBio } from '@/components/blog/AuthorBio'
import { BrandDoctrine } from '@/components/blog/BrandDoctrine'
import StarRating from '@/components/blog/StarRating'
import styles from './BlogPost.module.css'
import Image from 'next/image'

// Generate static params for all posts to ensure edge delivery
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return buildMetadata({
    title: `${post.title.rendered} | Field Notes — Richard Norwood, PMP`,
    description: post.excerpt.rendered.replace(/<[^>]*>?/gm, ''),
    path: `/blog/${post.slug}`,
    type: 'article',
  })
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
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
      '@id': 'https://richardnorwood.com/#person',
      'name': 'Richard Norwood',
      'image': 'https://richardnorwood.com/images/author_pic.jpg'
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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-20) var(--space-4) var(--space-24)' }}>
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
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-surface-elevated)', overflow: 'hidden', position: 'relative' }}>
                <Image 
                  src="/images/author_pic.jpg" 
                  alt="Richard Norwood" 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ color: 'var(--color-text)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {author}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <a 
                      href="https://www.credly.com/badges/08947dff-1909-4bc0-97c5-3228020092f8/public_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.badgeLink}
                      data-benefit="Ensures structured delivery and project accountability."
                    >
                      PMP
                    </a>
                    <a 
                      href="https://coursera.org/share/380889997f4b4bcf04d4a250d5ce7df9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.badgeLink}
                      data-benefit="Uncovers hidden revenue leaks via statistical analysis."
                    >
                      GDA
                    </a>
                  </div>
                </div>
                <div style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Revenue Architect</div>
              </div>
            </div>
            
            <StarRating postId={post.id} />
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
    </div>
  )
}

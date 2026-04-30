'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface PostProps {
  post: {
    title: string
    slug: string
    date: string
    excerpt: string
    category: string
  }
  idx: number
}

export default function BlogCard({ post, idx }: PostProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'border-color var(--duration-default), transform var(--duration-default)'
      }}
      className="blogCard"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <span style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-xs)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
          {post.category}
        </span>
        <span style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-sm)' }}>
          {formattedDate}
        </span>
      </div>

      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: 'var(--color-text)', marginBottom: 'var(--space-4)', lineHeight: 'var(--leading-tight)' }}>
          {post.title}
        </h2>
      </Link>
      
      <p style={{ color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)', flexGrow: 1 }}>
        {post.excerpt}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-surface-elevated)', overflow: 'hidden', position: 'relative' }}>
          <Image 
            src="/images/author_pic.jpg" 
            alt="Richard Norwood" 
            fill 
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <div style={{ color: 'var(--color-text)', fontSize: 'var(--text-xs)', fontWeight: 'bold' }}>Richard Norwood</div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '10px' }}>Revenue Architect</div>
        </div>
      </div>

      <Link 
        href={`/blog/${post.slug}`}
        style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}
      >
        Read Full Field Note →
      </Link>

      <style jsx>{`
        .blogCard:hover {
          border-color: var(--color-secondary);
          transform: translateY(-4px);
        }
      `}</style>
    </motion.article>
  )
}

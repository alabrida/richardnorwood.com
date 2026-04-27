import React from 'react'
import BlogCard from '@/components/blog/BlogCard'
import blogData from '../../../../content/blog-stub.json'

export const metadata = {
  title: 'Field Notes | Richard Norwood, PMP',
  description: 'Practical insights on Revenue Architecture, commercial systems, and building stronger buyer journeys.',
}

export default function BlogIndex() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-24) var(--space-4) var(--space-16)' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>
          Field Notes
        </h1>
        <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-xl)', maxWidth: 700, margin: '0 auto' }}>
          Practical insights on Revenue Architecture, commercial systems, and building stronger buyer journeys.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-8)' }}>
        {blogData.map((post, idx) => (
          <BlogCard key={post.id} post={post} idx={idx} />
        ))}
      </div>
    </main>
  )
}

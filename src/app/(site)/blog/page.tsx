import React from 'react'
import BlogCard from '@/components/blog/BlogCard'
import blogData from '../../../../content/blog-stub.json'

export const metadata = {
  title: 'Field Notes | Alabrida Revenue Architecture',
  description: 'Deep-dives into Revenue Architecture, system orchestration, and mitigating commercial leaks.',
}

export default function BlogIndex() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-24) var(--space-4) var(--space-16)' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>
          Alabrida Field Notes
        </h1>
        <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-xl)', maxWidth: 700, margin: '0 auto' }}>
          Tactical deployment strategies, engineering schematics, and case studies on sovereign commercial orchestration.
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

import React from 'react'
import BlogCard from '@/components/blog/BlogCard'
import PageHero from '@/components/sections/PageHero'
import blogData from '../../../../content/blog-stub.json'

export const metadata = {
  title: 'Field Notes | Richard Norwood, PMP',
  description: 'Practical insights on Revenue Architecture, commercial systems, and building stronger buyer journeys.',
}

export default function BlogIndex() {
  return (
    <main>
      <PageHero
        title="Field Notes"
        subtitle="Practical insights on Revenue Architecture, commercial systems, and building stronger buyer journeys."
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 var(--space-4) var(--space-16)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-8)' }}>
          {blogData.map((post, idx) => (
            <BlogCard key={post.id} post={post} idx={idx} />
          ))}
        </div>
      </div>
    </main>
  )
}

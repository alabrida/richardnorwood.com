'use client'

import React, { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 1. Find all h2 and h3 in the article
    const article = document.querySelector('article')
    if (!article) return

    const elements = Array.from(article.querySelectorAll('h2, h3'))
    
    const parsedHeadings: Heading[] = elements.map((elem, index) => {
      // Ensure element has an ID
      if (!elem.id) {
        elem.id = `heading-${index}-${elem.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      }
      return {
        id: elem.id,
        text: elem.textContent || '',
        level: parseInt(elem.tagName.replace('H', ''), 10)
      }
    })

    setHeadings(parsedHeadings)

    // 2. Set up Intersection Observer for active state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    elements.forEach((elem) => observer.observe(elem))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="toc-container" aria-label="Table of contents">
      <div className="toc-sticky">
        <h4 style={{ 
          fontSize: 'var(--text-sm)', 
          textTransform: 'uppercase', 
          letterSpacing: 'var(--tracking-wide)', 
          color: 'var(--color-text)', 
          marginBottom: 'var(--space-4)',
          fontWeight: 'bold'
        }}>
          Table of Contents
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {headings.map((heading) => (
            <li 
              key={heading.id} 
              style={{ 
                paddingLeft: heading.level === 3 ? 'var(--space-4)' : '0' 
              }}
            >
              <a 
                href={`#${heading.id}`}
                style={{
                  color: activeId === heading.id ? 'var(--color-primary)' : 'var(--color-text-subtle)',
                  textDecoration: 'none',
                  fontSize: 'var(--text-sm)',
                  transition: 'color 0.2s ease',
                  display: 'block',
                  lineHeight: '1.4'
                }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .toc-container {
          display: none;
        }
        
        /* Show inline on mobile (collapsible could be added here, but showing it normally top of post) */
        @media (max-width: 1024px) {
          .toc-container {
            display: block;
            margin-bottom: var(--space-8);
            padding: var(--space-6);
            background: var(--color-surface-elevated);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
          }
          .toc-sticky {
            position: static;
          }
        }

        /* Sticky sidebar on desktop */
        @media (min-width: 1025px) {
          .toc-container {
            display: block;
          }
          .toc-sticky {
            position: sticky;
            top: var(--space-24);
            max-height: calc(100vh - var(--space-32));
            overflow-y: auto;
            padding-right: var(--space-4);
          }
        }
      `}</style>
    </nav>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
      <div className="toc-card">
        <h4 className="toc-title">
          Table of Contents
        </h4>
        <ul className="toc-list">
          {headings.map((heading) => (
            <li 
              key={heading.id} 
              className={`toc-item ${heading.level === 3 ? 'toc-indent' : ''}`}
            >
              <a 
                href={`#${heading.id}`}
                className={`toc-link ${activeId === heading.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {activeId === heading.id && (
                  <motion.span 
                    layoutId="active-indicator"
                    className="active-indicator"
                  />
                )}
                <span className="toc-text">{heading.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .toc-container {
          display: none;
        }

        /* Mobile View: Inline card at top of post */
        @media (max-width: 1024px) {
          .toc-container {
            display: block;
            margin-bottom: var(--space-8);
          }
          .toc-card {
            background: var(--color-surface-elevated);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: var(--space-6);
          }
        }

        /* Desktop View: Floating sticky sidebar */
        @media (min-width: 1025px) {
          .toc-container {
            display: block;
            height: 100%;
            position: relative;
          }
          .toc-card {
            position: sticky;
            top: 100px;
            z-index: 100;
            background: var(--glass-bg-heavy);
            backdrop-filter: blur(var(--glass-blur));
            -webkit-backdrop-filter: blur(var(--glass-blur));
            border: 1px solid var(--color-border);
            border-radius: var(--radius-xl);
            padding: var(--space-8);
            max-height: calc(100vh - 140px);
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: border-color var(--duration-default);
          }
          .toc-card:hover {
            border-color: rgba(32, 201, 151, 0.3);
          }
        }

        .toc-title {
          font-family: var(--font-heading);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-subtle);
          margin-bottom: var(--space-6);
          font-weight: 800;
        }

        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .toc-item {
          position: relative;
        }

        .toc-indent {
          padding-left: var(--space-4);
        }

        .toc-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: var(--text-sm);
          transition: all var(--duration-fast);
          display: flex;
          align-items: center;
          gap: var(--space-2);
          line-height: 1.4;
          position: relative;
        }

        .toc-link:hover {
          color: var(--color-accent);
        }

        .toc-link.active {
          color: var(--color-accent);
          font-weight: bold;
        }

        .active-indicator {
          position: absolute;
          left: -12px;
          width: 3px;
          height: 100%;
          background: var(--color-accent);
          border-radius: var(--radius-full);
          box-shadow: 0 0 10px var(--color-accent);
        }

        .toc-text {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </nav>
  )
}

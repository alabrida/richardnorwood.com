'use client';

import React from 'react';
import Link from 'next/link';
import BlogCard from '@/components/blog/BlogCard';
import styles from './BlogTeaser.module.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
}

interface BlogTeaserProps {
  posts: Post[];
}

export default function BlogTeaser({ posts }: BlogTeaserProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className={styles.teaserSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Latest Insights</h2>
            <p className={styles.subtitle}>Practical strategy for orchestrating commercial growth.</p>
          </div>
          <Link href="/blog" className={styles.viewAll}>
            View All Field Notes →
          </Link>
        </div>

        <div className={styles.grid}>
          {posts.slice(0, 3).map((post, idx) => (
            <BlogCard key={post.id} post={post} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

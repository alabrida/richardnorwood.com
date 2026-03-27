'use client';

import { useState, useCallback, useMemo } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import faqData from '@/../content/faq.json';
import styles from './HelpCenter.module.css';

export default function HelpCenter(_props: AppProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const toggleItem = useCallback((q: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(q)) next.delete(q);
      else next.add(q);
      return next;
    });
  }, []);

  const filteredTopics = useMemo(() => {
    if (!search.trim()) return faqData.categories[activeCategory].topics;
    const q = search.toLowerCase();
    return faqData.categories[activeCategory].topics.filter(
      (t) =>
        t.question.toLowerCase().includes(q) ||
        t.answer.toLowerCase().includes(q)
    );
  }, [activeCategory, search]);

  return (
    <div className={styles.helpCenter}>
      {/* Hero */}
      <div className={styles.heroBar}>
        <span style={{ fontSize: '20px' }}>❓</span>
        <span className={styles.heroTitle}>Help and Support Center</span>
      </div>

      {/* Search */}
      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          placeholder="Search for help..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.searchBtn}>Search</button>
      </div>

      <div className={styles.body}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {faqData.categories.map((cat, i) => (
            <button
              key={cat.name}
              className={`${styles.catItem} ${activeCategory === i ? styles.active : ''}`}
              onClick={() => { setActiveCategory(i); setSearch(''); }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {filteredTopics.map((topic) => (
            <div key={topic.question} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleItem(topic.question)}
              >
                <span
                  className={`${styles.faqArrow} ${
                    openItems.has(topic.question) ? styles.open : ''
                  }`}
                >
                  ▶
                </span>
                {topic.question}
              </button>
              {openItems.has(topic.question) && (
                <div className={styles.faqAnswer}>{topic.answer}</div>
              )}
            </div>
          ))}
          {filteredTopics.length === 0 && (
            <div style={{ color: '#808080', fontSize: '12px' }}>
              No results found. Try a different search term.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const helpCenterConfig: AppConfig = {
  id: 'help-center',
  title: 'Help and Support Center',
  icon: '/icons/help.png',
  defaultSize: { width: 650, height: 450 },
  minSize: { width: 400, height: 300 },
  component: HelpCenter,
};

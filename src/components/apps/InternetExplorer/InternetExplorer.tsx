'use client';

import { useState, useCallback } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import blogData from '@/../content/blog-stub.json';
import styles from './InternetExplorer.module.css';

type View = 'list' | 'article';

export default function InternetExplorer({ onTitleChange }: AppProps) {
  const [view, setView] = useState<View>('list');
  const [selectedPost, setSelectedPost] = useState<(typeof blogData)[0] | null>(null);
  const [url, setUrl] = useState('http://blog.richardnorwood.com/');

  const openPost = useCallback(
    (post: (typeof blogData)[0]) => {
      setSelectedPost(post);
      setView('article');
      setUrl(`http://blog.richardnorwood.com/${post.slug}`);
      onTitleChange?.(`${post.title} - Internet Explorer`);
    },
    [onTitleChange]
  );

  const goHome = useCallback(() => {
    setView('list');
    setSelectedPost(null);
    setUrl('http://blog.richardnorwood.com/');
    onTitleChange?.('Revenue Architect Blog - Internet Explorer');
  }, [onTitleChange]);

  const menus: MenuGroup[] = [
    {
      label: '&File',
      items: [
        { label: '&New Window', shortcut: 'Ctrl+N', disabled: true },
        { label: '&Open...', shortcut: 'Ctrl+O', disabled: true },
        { label: '&Save As...', disabled: true },
        { label: '', separator: true },
        { label: '&Print...', shortcut: 'Ctrl+P', disabled: true },
        { label: '', separator: true },
        { label: '&Close', onClick: () => {} },
      ],
    },
    {
      label: '&Edit',
      items: [
        { label: 'Cu&t', shortcut: 'Ctrl+X', disabled: true },
        { label: '&Copy', shortcut: 'Ctrl+C', disabled: true },
        { label: '&Paste', shortcut: 'Ctrl+V', disabled: true },
        { label: '', separator: true },
        { label: 'Select &All', shortcut: 'Ctrl+A', disabled: true },
        { label: '&Find on This Page...', shortcut: 'Ctrl+F', disabled: true },
      ],
    },
    {
      label: '&View',
      items: [
        { label: '&Toolbar', checked: true, disabled: true },
        { label: '&Status Bar', checked: true, disabled: true },
        { label: '', separator: true },
        { label: '&Source', disabled: true },
      ],
    },
    {
      label: 'F&avorites',
      items: [
        { label: '&Revenue Architect Blog', onClick: goHome },
        { label: '&RJAT Assessment', disabled: true },
        { label: '&Book a Strategy Call', disabled: true },
      ],
    },
    {
      label: '&Help',
      items: [
        { label: '&About Internet Explorer', disabled: true },
      ],
    },
  ];

  return (
    <div className={styles.ie}>
      <MenuBar menus={menus} />

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button className={styles.toolBtn} onClick={goHome} title="Back">◀</button>
        <button className={styles.toolBtn} disabled title="Forward">▶</button>
        <button className={styles.toolBtn} disabled title="Stop">✕</button>
        <button className={styles.toolBtn} onClick={goHome} title="Refresh">↻</button>
        <div className={styles.toolSep} />
        <button className={styles.toolBtn} onClick={goHome} title="Home">🏠</button>
      </div>

      {/* Address Bar */}
      <div className={styles.addressBar}>
        <span className={styles.addressLabel}>Address</span>
        <input
          className={styles.addressInput}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              goHome();
            }
          }}
        />
        <button className={styles.goBtn} onClick={goHome}>Go</button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {view === 'list' && (
          <>
            <h1 style={{ fontSize: '20px', color: '#003399', marginBottom: '8px' }}>
              Revenue Architect Blog
            </h1>
            <ul className={styles.blogList}>
              {blogData.map((post) => (
                <li key={post.id} className={styles.blogItem}>
                  <div
                    className={styles.blogTitle}
                    onClick={() => openPost(post)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openPost(post)}
                  >
                    {post.title}
                  </div>
                  <div className={styles.blogMeta}>
                    By {post.author} • {new Date(post.date).toLocaleDateString()} • {post.category}
                  </div>
                  <div className={styles.blogExcerpt}>{post.excerpt}</div>
                </li>
              ))}
            </ul>
          </>
        )}

        {view === 'article' && selectedPost && (
          <>
            <span className={styles.backLink} onClick={goHome} role="link" tabIndex={0}>
              ← Back to Blog
            </span>
            <h1 style={{ fontSize: '20px', color: '#003399', marginBottom: '4px' }}>
              {selectedPost.title}
            </h1>
            <div className={styles.blogMeta}>
              By {selectedPost.author} • {new Date(selectedPost.date).toLocaleDateString()} • {selectedPost.category}
            </div>
            <div
              className={styles.articleBody}
              dangerouslySetInnerHTML={{ __html: selectedPost.body }}
            />
          </>
        )}
      </div>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <span>Done</span>
      </div>
    </div>
  );
}

export const internetExplorerConfig: AppConfig = {
  id: 'internet-explorer',
  title: 'Revenue Architect Blog - Internet Explorer',
  icon: '/icons/ie6.png',
  defaultSize: { width: 800, height: 600 },
  minSize: { width: 400, height: 300 },
  component: InternetExplorer,
};

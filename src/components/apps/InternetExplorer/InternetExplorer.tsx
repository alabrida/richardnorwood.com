'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import type { NormalizedPost } from '@/lib/wordpress/types';
import styles from './InternetExplorer.module.css';

type View = 'list' | 'article';

export default function InternetExplorer({ onTitleChange }: AppProps) {
  const [view, setView] = useState<View>('list');
  const [posts, setPosts] = useState<NormalizedPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<NormalizedPost | null>(null);
  const [url, setUrl] = useState('http://blog.richardnorwood.com/');
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  // Stable ref for onTitleChange to avoid infinite loops
  const titleRef = useRef(onTitleChange);
  useEffect(() => { titleRef.current = onTitleChange; }, [onTitleChange]);

  // Fetch posts from the API route on mount (once only)
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function load() {
      try {
        const res = await fetch('/api/blog');
        const data: NormalizedPost[] = await res.json();
        setPosts(data);
      } catch {
        // If the API route itself fails, we'll show an empty list
        setPosts([]);
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const goHome = useCallback(() => {
    setView('list');
    setSelectedPost(null);
    setUrl('http://blog.richardnorwood.com/');
    setIsLoading(false);
    titleRef.current?.('Revenue Architect Blog - Internet Explorer');
  }, []);

  const openPost = useCallback((post: NormalizedPost) => {
    setSelectedPost(post);
    setView('article');
    setUrl(`http://blog.richardnorwood.com/${post.slug}`);
    titleRef.current?.(`${post.title} - Internet Explorer`);
  }, []);

  const navigateAddress = useCallback(async () => {
    const cleanUrl = url.replace(/https?:\/\//, '').replace(/\/$/, '');

    if (cleanUrl === 'blog.richardnorwood.com' || cleanUrl === 'www.richardnorwood.com') {
      goHome();
      return;
    }

    const slugMatch = url.match(/blog\.richardnorwood\.com\/([^/]+)/);
    if (slugMatch && slugMatch[1]) {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/blog?slug=${encodeURIComponent(slugMatch[1])}`);
        const post: NormalizedPost | null = await res.json();
        if (post) {
          setSelectedPost(post);
          setView('article');
          titleRef.current?.(`${post.title} - Internet Explorer`);
        } else {
          goHome();
        }
      } catch {
        goHome();
      }
      setIsLoading(false);
    } else {
      goHome();
    }
  }, [url, goHome]);

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
        { label: '&Revenue EKG', disabled: true },
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
        <button className={styles.toolBtn} onClick={navigateAddress} title="Refresh">↻</button>
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
              navigateAddress();
            }
          }}
        />
        <button className={styles.goBtn} onClick={navigateAddress}>Go</button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingIcon}>⏳</div>
            <div>Connecting to site...</div>
          </div>
        ) : (
          <>
            {view === 'list' && (
              <>
                <h1 className={styles.pageTitle}>
                  Revenue Architect Blog
                </h1>
                <ul className={styles.blogList}>
                  {posts.map((post) => (
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
                <span
                  className={styles.backLink}
                  onClick={goHome}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && goHome()}
                >
                  ← Back to Blog
                </span>
                <h1 className={styles.pageTitle}>
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
          </>
        )}
      </div>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <span>{isLoading ? 'Opening page http://blog.richardnorwood.com/...' : 'Done'}</span>
      </div>
    </div>
  );
}

export const internetExplorerConfig: AppConfig = {
  id: 'internet-explorer',
  title: 'Acquisition Channels',
  icon: '/icons/icons/compass.png',
  defaultSize: { width: 800, height: 600 },
  minSize: { width: 400, height: 300 },
  component: InternetExplorer,
};

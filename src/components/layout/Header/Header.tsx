'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';
import { useWMSStore } from '@/lib/wms/WindowManager';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobileDrawer from './MobileDrawer';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const headerVisible = useWMSStore((s) => s.headerVisible);
  const isDesktopView = pathname === '/desktop';
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isDesktopView) setHideHeader(latest > 0.75);
    else setHideHeader(false);
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const toggleDrawer = useCallback(() => setDrawerOpen(prev => !prev), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  if (isDesktopView && (!headerVisible || isMobile)) return null;

  const headerClass = isDesktopView 
      ? `${styles.header} ${scrolled ? styles.scrolled : ''}` 
      : `${styles.traditionalHeader} ${scrolled ? styles.scrolled : ''}`;

  return (
    <>
      <motion.header
        className={headerClass}
        initial={isDesktopView ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={isDesktopView ? { y: hideHeader ? -120 : 0, opacity: hideHeader ? 0 : 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/" className={styles.logo} aria-label="Richard Norwood — Home">
          <span className={styles.logoMark}>RN</span>
          <span className={styles.logoText}>Richard Norwood<span className={styles.logoAccent}>, PMP</span></span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>{item.label}</Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href={isDesktopView ? "/calculator" : "/desktop"} className={styles.ctaButton}>
            <span className={styles.ctaPulse} aria-hidden="true" />
            {isDesktopView ? "Run Diagnostic" : "Experience the Engine"}
          </Link>

          <button className={styles.menuButton} onClick={toggleDrawer} aria-label={drawerOpen ? 'Close menu' : 'Open menu'} aria-expanded={drawerOpen}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <motion.path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" animate={drawerOpen ? { d: 'M4 4L16 16' } : { d: 'M3 5H17' }} />
              <motion.path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" animate={drawerOpen ? { opacity: 0 } : { opacity: 1 }} />
              <motion.path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" animate={drawerOpen ? { d: 'M4 16L16 4' } : { d: 'M3 15H17' }} />
            </svg>
          </button>
        </div>
      </motion.header>

      <MobileDrawer isOpen={drawerOpen} onClose={closeDrawer} navItems={NAV_ITEMS} isDesktopView={isDesktopView} />
    </>
  );
}

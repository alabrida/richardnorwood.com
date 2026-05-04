'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MobileDrawer from './MobileDrawer';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const headerClass = `${styles.traditionalHeader} ${scrolled ? styles.scrolled : ''}`;

  return (
    <>
      <motion.header
        className={headerClass}
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
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
          <Link href="/contact" className={styles.ctaButton}>
            <span className={styles.ctaPulse} aria-hidden="true" />
            <span className={styles.buttonText}>Book a Call</span>
          </Link>
          
          <Link href="/calculator" className={styles.secondaryHeaderCta}>
            <span className={styles.buttonText}>Health Check</span>
          </Link>

          <button className={styles.menuButton} onClick={toggleDrawer} aria-label={drawerOpen ? 'Close menu' : 'Open menu'} aria-expanded={drawerOpen}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d={drawerOpen ? 'M4 4L16 16' : 'M3 5H17'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={drawerOpen ? 0 : 1} />
              <path d={drawerOpen ? 'M4 16L16 4' : 'M3 15H17'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </motion.header>

      <MobileDrawer isOpen={drawerOpen} onClose={closeDrawer} navItems={NAV_ITEMS} />
    </>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Logo ── */}
        <Link href="/" className={styles.logo} aria-label="Richard Norwood — Home">
          <span className={styles.logoMark}>RN</span>
          <span className={styles.logoText}>
            Richard Norwood<span className={styles.logoAccent}>, PMP</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <Link href="/login" className={styles.loginLink}>
            Login
          </Link>
          <Link href="/calculator" className={styles.ctaButton}>
            <span className={styles.ctaPulse} aria-hidden="true" />
            Get Your EKG
          </Link>

          {/* Mobile hamburger */}
          <button
            className={styles.menuButton}
            onClick={toggleDrawer}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <motion.path
                d="M3 5H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={drawerOpen ? { d: 'M4 4L16 16' } : { d: 'M3 5H17' }}
                transition={{ duration: 0.25 }}
              />
              <motion.path
                d="M3 10H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={drawerOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.path
                d="M3 15H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={drawerOpen ? { d: 'M4 16L16 4' } : { d: 'M3 15H17' }}
                transition={{ duration: 0.25 }}
              />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className={styles.drawerOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeDrawer}
              aria-hidden="true"
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className={styles.drawerHeader}>
                <span className={styles.drawerTitle}>Menu</span>
                <button
                  className={styles.closeButton}
                  onClick={closeDrawer}
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className={styles.drawerNav} aria-label="Mobile navigation">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={styles.drawerLink}
                      onClick={closeDrawer}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + NAV_ITEMS.length * 0.05, duration: 0.3 }}
                >
                  <Link
                    href="/login"
                    className={styles.drawerLink}
                    onClick={closeDrawer}
                  >
                    Login
                  </Link>
                </motion.div>
              </nav>

              <Link
                href="/calculator"
                className={styles.drawerCta}
                onClick={closeDrawer}
              >
                Get Your EKG
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useWMSStore } from '@/lib/wms/WindowManager';
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

  // We only want the floating capsule interaction during the XP clone
  const isDesktop = pathname === '/desktop';

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Only auto-hide the header if it's the floating one (XP clone interaction)
    if (isDesktop) {
      setHideHeader(latest > 0.75);
    } else {
      setHideHeader(false); // Never hide the traditional header based on scroll progress
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Hide the global header on the immersive XP Clone boot screen
  if (isDesktop && !headerVisible) return null;

  // Determine the interactive context
  const headerClass = isDesktop 
      ? `${styles.header} ${scrolled ? styles.scrolled : ''}` 
      : `${styles.traditionalHeader} ${scrolled ? styles.scrolled : ''}`;

  const initialAnimation = isDesktop ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 };
  const animateAnimation = isDesktop 
      ? { y: hideHeader ? -120 : 0, opacity: hideHeader ? 0 : 1 } 
      : { y: 0, opacity: 1 };

  return (
    <>
      <motion.header
        className={headerClass}
        initial={initialAnimation}
        animate={animateAnimation}
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
          <Link href={isDesktop ? "/calculator" : "/desktop"} className={styles.ctaButton}>
            <span className={styles.ctaPulse} aria-hidden="true" />
            {isDesktop ? "Run Diagnostic" : "Experience the Engine"}
          </Link>

          {/* Mobile hamburger */}
          <button
            className={styles.menuButton}
            onClick={toggleDrawer}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen ? 'true' : 'false'}
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
          <motion.div
            className={styles.drawerOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            aria-hidden="true"
          >
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              onClick={(e) => e.stopPropagation()} // Prevent clicking inside drawer from closing it
            >
              <div className={styles.drawerHeader}>
                <span className={styles.drawerTitle}>Menu</span>
                <button
                  className={styles.closeDrawerButton}
                  onClick={closeDrawer}
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className={styles.drawerBody}>
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link href={item.href} onClick={closeDrawer} className={styles.drawerLink}>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className={styles.drawerFooter}>
                <Link href={isDesktop ? "/calculator" : "/desktop"} onClick={closeDrawer} className={styles.drawerCta}>
                  {isDesktop ? "Run Diagnostic" : "Experience the Engine"}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

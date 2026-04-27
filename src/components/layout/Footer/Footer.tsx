'use client';

import React from 'react';
import Link from 'next/link';
import NewsletterForm from './NewsletterForm';
import styles from './Footer.module.css';

const HEADER_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const SYSTEM_LINKS = [
  { label: 'Client Portal', href: '/portal' },
  { label: 'Blog', href: '/blog' },
  { label: 'Health Check', href: '/calculator' },
  { label: 'The Guide', href: '/about' },
];

export default function Footer() {
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={styles.footerHeaderWrapper}>
        <div className={styles.footerHeader}>
          <Link href="/" className={styles.brandLogo}>
            <span className={styles.logoMark}>RN</span>
            <span className={styles.logoText}>Richard Norwood</span>
          </Link>
          <nav className={styles.footerNav} aria-label="Footer main navigation">
            {HEADER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerNavLink}>{link.label}</Link>
            ))}
          </nav>
          <Link href="/calculator" className={styles.footerCta}>Take the Assessment</Link>
        </div>
      </div>

      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.brand}>
            <NewsletterForm embedded />
            <div className={styles.socials}>
              <div className={`${styles.pmpBadge} ${styles.pmpBadgeEmbedded}`}>
                <span className={styles.pmpDot} aria-hidden="true" /> PMP Certified
              </div>
              <a href="https://www.linkedin.com/in/richardnorwoodpmp/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://x.com/richnorwoodpmp" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X (Twitter)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>

          <div className={styles.videoColumn}>
            <div className={styles.videoWrapper}>
              <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1" title="Revenue Architect Intro" frameBorder="0" allowFullScreen className={styles.videoFrame}></iframe>
            </div>
          </div>

          <div className={styles.navColumn}>
            <span className={styles.navColumnTitle}>Resources</span>
            {SYSTEM_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navColumnLink}>{link.label}</Link>
            ))}
            <div className={styles.seoHeadingContainer}>
              <h2 className={styles.seoHeading}>Revenue Architecture &<br />Commercial Strategy</h2>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span className={styles.copyright}>&copy; {new Date().getFullYear()} Richard Norwood, PMP. All rights reserved.</span>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className={styles.stageBar} aria-hidden="true" />
    </footer>
  );
}

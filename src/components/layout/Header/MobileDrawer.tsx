'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileDrawer.module.css';

interface NavItem {
  label: string;
  href: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileDrawer({ isOpen, onClose, navItems }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.drawerOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Menu</span>
              <button
                className={styles.closeDrawerButton}
                onClick={onClose}
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
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link href={item.href} onClick={onClose} className={styles.drawerLink}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className={styles.drawerFooter}>
              <Link 
                href="/calculator" 
                onClick={onClose} 
                className={styles.drawerCta}
              >
                Run the Assessment
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

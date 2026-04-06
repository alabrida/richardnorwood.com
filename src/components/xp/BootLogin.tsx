'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import styles from './BootLogin.module.css';

interface BootLoginProps {
  onEnterDesktop: (mode: 'guest' | 'signin') => void;
}

export default function BootLogin({ onEnterDesktop }: BootLoginProps) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleGuestEntry = () => {
    setIsVisible(false);
    setTimeout(() => onEnterDesktop('guest'), 600);
  };

  const handleClientLogin = () => {
    router.push('/login');
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="entry"
          className={styles.entryScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Divider */}
          <div className={`${styles.divider} ${styles.topDivider}`}></div>
          
          <div className={styles.container}>
            
            {/* Left Panel: Branding */}
            <div className={styles.leftPanel}>
              <div className={styles.logo}>
                Richard Norwood<br/>
                <span className={styles.logoAccent}>Revenue Architect</span>
              </div>
            </div>

            {/* Right Panel: Profiles */}
            <div className={styles.rightPanel}>
              
              <button className={styles.userProfile} onClick={handleGuestEntry}>
                <div className={styles.avatar}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#003399" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Guest</span>
                  <span className={styles.userDetails}>Explore the Desktop</span>
                </div>
              </button>

              <button className={styles.userProfile} onClick={handleClientLogin}>
                <div className={styles.avatar}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="#003399" aria-hidden="true">
                    <path d="M12.65 10A5.99 5.99 0 0 0 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 0 0 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Client Portal</span>
                  <span className={styles.userDetails}>Secure Client Login</span>
                </div>
              </button>

            </div>
          </div>
          
          {/* Bottom Divider */}
          <div className={`${styles.divider} ${styles.bottomDivider}`}></div>

          <div className={styles.footerBar}>
            <button className={styles.powerButton} onClick={() => window.location.href = '/'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
              </svg>
              Turn Off Computer
            </button>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

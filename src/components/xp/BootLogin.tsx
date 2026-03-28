'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './BootLogin.module.css';

interface BootLoginProps {
  onEnterDesktop: (mode: 'guest' | 'signin') => void;
}

export default function BootLogin({ onEnterDesktop }: BootLoginProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible && false) return null; // Let Framer Motion handle unmount gracefully

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
          <div className={styles.container}>
            <div className={styles.logo}>
              Richard Norwood, <span className={styles.logoAccent}>PMP</span>
            </div>
            
            <div className={styles.videoWrapper}>
              {/* Replace src with the actual YouTube embed link once uploaded */}
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1" 
                title="Revenue Architect Intro" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className={styles.videoFrame}
              ></iframe>
            </div>

            <div className={styles.consentBox}>
              <div className={styles.consentRow}>
                <label className={styles.consentLabel}>
                  We use cookies for necessary operations and analytics to establish our Managed Nervous System. 
                  You may opt out, but doing so may limit personalized experiences.
                </label>
              </div>

              <div className={styles.buttonContainer}>
                <button 
                  className={styles.enterButton} 
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onEnterDesktop('guest'), 500);
                  }}
                >
                  Accept & Enter
                </button>
                <button 
                  className={`${styles.enterButton} ${styles.declineButton}`}
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onEnterDesktop('guest'), 500);
                  }}
                >
                  Decline & Enter
                </button>
              </div>
            </div>
            
            <div className={styles.copyright}>
              © 2025 Richard Norwood • Revenue Architect
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

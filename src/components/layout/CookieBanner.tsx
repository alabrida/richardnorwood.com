'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem('rn-cookie-consent');
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (status: 'accepted' | 'declined') => {
    localStorage.setItem('rn-cookie-consent', status);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.bannerContainer}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className={styles.bannerInner}>
            <div className={styles.textContent}>
              <h4 className={styles.title}>Cookie Consent</h4>
              <p className={styles.disclaimer}>
                We use cookies for essential site operations and analytics to improve your experience. 
                You may opt out, but doing so may limit personalized features.
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.acceptButton}
                onClick={() => handleConsent('accepted')}
              >
                Accept
              </button>
              <button 
                className={styles.declineButton}
                onClick={() => handleConsent('declined')}
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

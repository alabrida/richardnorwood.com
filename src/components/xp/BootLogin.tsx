'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './BootLogin.module.css';

interface BootLoginProps {
  onEnterDesktop: (mode: 'guest' | 'signin') => void;
}

export default function BootLogin({ onEnterDesktop }: BootLoginProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  const handleEnter = useCallback(() => {
    // Only allow enter if cookies are accepted, or just proceed anyway?
    // "need to add a cookie consent banner instead" implies they should accept or acknowledge it.
    // If they haven't checked it, we can alert them, or we can just make the Enter button disabled until checked.
    if (!cookiesAccepted) {
      alert("Please accept the cookie consent to enter the site.");
      return;
    }
    setIsVisible(false);
    // Slight delay to allow fade out before unmounting
    setTimeout(() => {
      onEnterDesktop('guest');
    }, 500);
  }, [cookiesAccepted, onEnterDesktop]);

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
                <input
                  type="checkbox"
                  id="cookie-consent"
                  checked={cookiesAccepted}
                  onChange={(e) => setCookiesAccepted(e.target.checked)}
                />
                <label htmlFor="cookie-consent" className={styles.consentLabel}>
                  I accept the use of cookies for necessary site operations, analytics, and personalized experiences. 
                  (Revenue Architecture demands perception, so we use trackers to establish our Managed Nervous System).
                </label>
              </div>

              <button 
                className={styles.enterButton} 
                onClick={handleEnter}
                disabled={!cookiesAccepted}
              >
                Enter Desktop
              </button>
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

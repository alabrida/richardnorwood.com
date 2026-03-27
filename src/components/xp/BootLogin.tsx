'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './BootLogin.module.css';

type ScreenState = 'boot' | 'login' | 'desktop';

interface BootLoginProps {
  onEnterDesktop: (mode: 'guest' | 'signin') => void;
}

export default function BootLogin({ onEnterDesktop }: BootLoginProps) {
  const [screen, setScreen] = useState<ScreenState>('boot');
  const [emailConsent, setEmailConsent] = useState(true);

  // ── Boot timer ──
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGuest = useCallback(() => {
    onEnterDesktop('guest');
  }, [onEnterDesktop]);

  const handleSignIn = useCallback(() => {
    // Stage 3 wires this to Supabase OAuth
    console.log('[Auth Stub] Sign In clicked — OAuth not yet wired');
    console.log('[Auth Stub] Email consent:', emailConsent);
    onEnterDesktop('signin');
  }, [onEnterDesktop, emailConsent]);

  if (screen === 'desktop') return null;

  return (
    <AnimatePresence mode="wait">
      {screen === 'boot' && (
        <motion.div
          key="boot"
          className={styles.bootScreen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.logo}>
            Revenue <span className={styles.logoAccent}>Architect</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressDots} />
          </div>
          <div className={styles.copyright}>
            © 2025 Richard Norwood • Revenue Architect
          </div>
        </motion.div>
      )}

      {screen === 'login' && (
        <motion.div
          key="login"
          className={styles.loginScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.loginHeader}>To begin, click your user name</div>

          <div className={styles.userList}>
            {/* Guest */}
            <button className={styles.userCard} onClick={handleGuest}>
              <div className={styles.userAvatar}>
                <span>👤</span>
              </div>
              <span className={styles.userName}>Guest</span>
              <span className={styles.userHint}>Browse without signing in</span>
            </button>

            {/* Sign In */}
            <button className={styles.userCard} onClick={handleSignIn}>
              <div className={styles.userAvatar}>
                <span>🔐</span>
              </div>
              <span className={styles.userName}>Sign In</span>
              <span className={styles.userHint}>Google or Apple account</span>
            </button>
          </div>

          {/* Email consent */}
          <div className={styles.consentRow}>
            <input
              type="checkbox"
              id="email-consent"
              checked={emailConsent}
              onChange={(e) => setEmailConsent(e.target.checked)}
            />
            <label htmlFor="email-consent" className={styles.consentLabel}>
              I agree to receive occasional emails about revenue optimization insights
              and product updates. You can unsubscribe at any time.
            </label>
          </div>

          <div className={styles.loginFooter}>
            After you log on, you can add or change accounts.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

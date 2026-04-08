'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BSOD.module.css';

interface BSODProps {
  errorCode?: string;
  message?: string;
}

export default function BSOD({
  errorCode = 'REVENUE_KERNEL_PANIC',
  message = 'A fatal exception has occurred at the intersection of your\nfunnel and your pipeline. The current revenue process will\nbe terminated.',
}: BSODProps) {
  const router = useRouter();

  const handleRestart = useCallback(() => {
    router.push('/');
  }, [router]);

  // "Press any key to restart"
  useEffect(() => {
    const handler = (e: KeyboardEvent | MouseEvent) => {
      e.preventDefault();
      handleRestart();
    };
    window.addEventListener('keydown', handler);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('click', handler);
    };
  }, [handleRestart]);

  return (
    <div className={styles.bsod}>
      <div className={styles.content}>
        <div className={styles.header}>
          Richard Norwood Revenue OS
        </div>
        <br />
        <div className={styles.errorText}>
          A problem has been detected and your revenue engine has been
          shut down to prevent damage to your pipeline.
        </div>
        <br />
        <div className={styles.errorText}>
          {message}
        </div>
        <br />
        <div className={styles.errorText}>
          If this is the first time you&apos;ve seen this Stop error screen,
          restart your browser. If this screen appears again, follow
          these steps:
        </div>
        <br />
        <div className={styles.errorText}>
          Check to make sure you haven&apos;t accidentally navigated off the
          revenue map. Visit richardnorwood.com for recalibration.
        </div>
        <br />
        <div className={styles.errorText}>
          Technical information:
        </div>
        <br />
        <div className={styles.technical}>
          *** STOP: 0x000000ED (0x{errorCode.length.toString(16).toUpperCase().padStart(8, '0')}, 0x00000000, 0x00000000, 0x00000000)
        </div>
        <br />
        <div className={styles.technical}>
          *** {errorCode}
        </div>
        <br />
        <br />
        <div className={styles.restart}>
          Press any key to restart_
          <span className={styles.cursor}>█</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import styles from './ErrorDialog.module.css';

interface ErrorDialogProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onClose?: () => void;
}

export default function ErrorDialog({
  title = 'Error',
  message,
  onRetry,
  onClose,
}: ErrorDialogProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.titleBar}>
          <span className={styles.titleText}>{title}</span>
          {onClose && (
            <button className={styles.closeBtn} onClick={onClose}>✕</button>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.icon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="14" fill="#FF0000" stroke="#990000" strokeWidth="2" />
              <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold" fontFamily="Arial">✕</text>
            </svg>
          </div>
          <div className={styles.message}>{message}</div>
        </div>
        <div className={styles.buttons}>
          {onRetry && (
            <button className={styles.btn} onClick={onRetry}>Retry</button>
          )}
          <button className={styles.btn} onClick={onClose || (() => window.location.reload())}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

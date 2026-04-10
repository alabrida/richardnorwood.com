'use client';

import React from 'react';
import styles from './NewsletterForm.module.css';

interface NewsletterFormProps {
  embedded?: boolean;
}

export default function NewsletterForm({ embedded = false }: NewsletterFormProps) {
  return (
    <div className={`${styles.newsletter} ${embedded ? styles.newsletterEmbedded : ''}`}>
      <span className={styles.newsletterLabel}>Stay Updated</span>
      <p className={`${styles.tagline} ${embedded ? styles.taglineEmbedded : ''}`}>
        Weekly insights on revenue architecture and commercial strategy.
      </p>
      <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="you@company.com"
          className={styles.newsletterInput}
          aria-label="Email for newsletter"
          required
        />
        <button type="submit" className={styles.newsletterButton}>
          Subscribe
        </button>
      </form>
    </div>
  );
}

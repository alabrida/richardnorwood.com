'use client';

import React from 'react';
import styles from './NewsletterForm.module.css';

interface NewsletterFormProps {
  embedded?: boolean;
}

export default function NewsletterForm({ embedded = false }: NewsletterFormProps) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={`${styles.newsletter} ${embedded ? styles.newsletterEmbedded : ''}`}>
      <span className={styles.newsletterLabel}>
        {status === 'success' ? 'Subscription Confirmed' : 'Stay Updated'}
      </span>
      <p className={`${styles.tagline} ${embedded ? styles.taglineEmbedded : ''}`}>
        {status === 'success' 
          ? 'Welcome to the Field Notes list. You will receive insights shortly.' 
          : 'Weekly insights on revenue architecture and commercial strategy.'}
      </p>
      {status !== 'success' && (
        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={status === 'error' ? 'Please try again' : 'you@company.com'}
            className={`${styles.newsletterInput} ${status === 'error' ? styles.inputError : ''}`}
            aria-label="Email for newsletter"
            required
            disabled={status === 'loading'}
          />
          <button type="submit" className={styles.newsletterButton} disabled={status === 'loading'}>
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
}

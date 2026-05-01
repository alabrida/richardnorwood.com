'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './BlueprintForm.module.css';

export default function BlueprintForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to capture lead');

      const data = await response.json();
      setStatus('success');
      
      // After success, redirect to the actual PDF
      setTimeout(() => {
        window.location.href = data.downloadUrl;
      }, 1000);
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMessage}>
        <h3>Access Granted.</h3>
        <p>Redirecting you to the Blueprint...</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your professional email"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button} disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Verifying...' : 'Get Instant Access'}
        </button>
      </div>
      <p className={styles.privacyNote}>
        Zero spam. Just the system. By clicking, you agree to receive the blueprint and occasional revenue insights.
      </p>
    </form>
  );
}

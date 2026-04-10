'use client';

import React, { useState, useCallback } from 'react';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import { playSound, showBalloonTip, submitForm } from '@/lib/apps/helpers';
import styles from './OutlookExpress.module.css';

interface ComposeViewProps {
  onSend: () => void;
  onCancel: () => void;
  menus: MenuGroup[];
}

export default function ComposeView({ onSend, onCancel, menus }: ComposeViewProps) {
  const [composeTo, setComposeTo] = useState('richard@richardnorwood.com');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = useCallback(async () => {
    if (!composeSubject && !composeBody) return;
    setSending(true);
    await submitForm('/api/contact', {
      to: composeTo,
      subject: composeSubject,
      body: composeBody,
    });
    setSending(false);
    playSound('youve-got-mail');
    showBalloonTip("You've Got Mail!", 'Your message has been sent successfully.');
    onSend();
  }, [composeTo, composeSubject, composeBody, onSend]);

  return (
    <div className={shared.outlook}>
      <MenuBar menus={menus} />
      <div className={shared.toolbar}>
        <button className={shared.toolBtn} onClick={handleSend} disabled={sending}>
          <span className={shared.toolIcon}>📤</span>
          {sending ? 'Sending...' : 'Send'}
        </button>
        <button className={shared.toolBtn} onClick={onCancel}>
          <span className={shared.toolIcon}>✕</span>
          Cancel
        </button>
      </div>
      <div className={styles.compose}>
        <div className={styles.composeFields}>
          <div className={styles.composeFieldRow}>
            <label>To:</label>
            <input value={composeTo} onChange={(e) => setComposeTo(e.target.value)} />
          </div>
          <div className={styles.composeFieldRow}>
            <label>Subject:</label>
            <input value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} />
          </div>
        </div>
        <textarea
          className={styles.composeBody}
          value={composeBody}
          onChange={(e) => setComposeBody(e.target.value)}
          placeholder="Type your message here..."
          autoFocus
        />
      </div>
    </div>
  );
}

        />
      </div>
    </div>
  );
}

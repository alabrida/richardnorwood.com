'use client';

import { useState, useCallback } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import { playSound, showBalloonTip, submitForm } from '@/lib/apps/helpers';
import emailData from '@/../content/emails.json';
import styles from './OutlookExpress.module.css';

type View = 'inbox' | 'compose';

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  body: string;
  read: boolean;
  folder: string;
}

export default function OutlookExpress({ onTitleChange }: AppProps) {
  const [view, setView] = useState<View>('inbox');
  const [emails, setEmails] = useState<Email[]>(emailData.inbox);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [activeFolder, setActiveFolder] = useState('Inbox');

  // Compose state
  const [composeTo, setComposeTo] = useState('richard@richardnorwood.com');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [sending, setSending] = useState(false);

  const folders = [
    { name: 'Inbox', icon: '📥', count: emails.filter((e) => !e.read).length },
    { name: 'Outbox', icon: '📤', count: 0 },
    { name: 'Sent Items', icon: '📨', count: 0 },
    { name: 'Drafts', icon: '📝', count: 0 },
    { name: 'Deleted Items', icon: '🗑️', count: 0 },
  ];

  const selectEmail = useCallback(
    (email: Email) => {
      setSelectedEmail(email);
      // Mark as read
      setEmails((prev) =>
        prev.map((e) => (e.id === email.id ? { ...e, read: true } : e))
      );
    },
    []
  );

  const openCompose = useCallback(() => {
    setView('compose');
    onTitleChange?.('New Message - Outlook Express');
  }, [onTitleChange]);

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
    setView('inbox');
    setComposeTo('richard@richardnorwood.com');
    setComposeSubject('');
    setComposeBody('');
    onTitleChange?.('Inbox - Outlook Express');
  }, [composeTo, composeSubject, composeBody, onTitleChange]);

  const cancelCompose = useCallback(() => {
    setView('inbox');
    onTitleChange?.('Inbox - Outlook Express');
  }, [onTitleChange]);

  const menus: MenuGroup[] = [
    {
      label: '&File',
      items: [
        { label: '&New Mail Message', shortcut: 'Ctrl+N', onClick: openCompose },
        { label: '', separator: true },
        { label: '&Close', onClick: () => {} },
      ],
    },
    {
      label: '&Edit',
      items: [
        { label: '&Copy', shortcut: 'Ctrl+C', disabled: true },
        { label: 'Select &All', shortcut: 'Ctrl+A', disabled: true },
      ],
    },
    {
      label: '&View',
      items: [
        { label: '&Current View', disabled: true },
        { label: '&Layout...', disabled: true },
      ],
    },
    {
      label: '&Tools',
      items: [
        { label: '&Accounts...', disabled: true },
        { label: '&Message Rules', disabled: true },
      ],
    },
    {
      label: '&Help',
      items: [
        { label: '&About Outlook Express', disabled: true },
      ],
    },
  ];

  if (view === 'compose') {
    return (
      <div className={styles.outlook}>
        <MenuBar menus={menus} />
        <div className={styles.toolbar}>
          <button className={styles.toolBtn} onClick={handleSend} disabled={sending}>
            <span className={styles.toolIcon}>📤</span>
            {sending ? 'Sending...' : 'Send'}
          </button>
          <button className={styles.toolBtn} onClick={cancelCompose}>
            <span className={styles.toolIcon}>✕</span>
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

  return (
    <div className={styles.outlook}>
      <MenuBar menus={menus} />

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button className={styles.toolBtn} onClick={openCompose}>
          <span className={styles.toolIcon}>✉️</span>
          New Mail
        </button>
        <button className={styles.toolBtn} disabled>
          <span className={styles.toolIcon}>↩️</span>
          Reply
        </button>
        <button className={styles.toolBtn} disabled>
          <span className={styles.toolIcon}>↩️</span>
          Reply All
        </button>
        <button className={styles.toolBtn} disabled>
          <span className={styles.toolIcon}>➡️</span>
          Forward
        </button>
      </div>

      {/* 3-Pane Body */}
      <div className={styles.body}>
        {/* Folder Pane */}
        <div className={styles.folderPane}>
          {folders.map((folder) => (
            <button
              key={folder.name}
              className={`${styles.folderItem} ${activeFolder === folder.name ? styles.active : ''}`}
              onClick={() => setActiveFolder(folder.name)}
            >
              <span className={styles.folderIcon}>{folder.icon}</span>
              {folder.name}
              {folder.count > 0 && (
                <span className={styles.unreadBadge}>({folder.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Right Pane */}
        <div className={styles.rightPane}>
          {/* Message List */}
          <div className={styles.messageList}>
            {emails
              .filter((e) => e.folder === activeFolder)
              .map((email) => (
                <button
                  key={email.id}
                  className={`${styles.messageRow} ${
                    selectedEmail?.id === email.id ? styles.selected : ''
                  } ${!email.read ? styles.unread : ''}`}
                  onClick={() => selectEmail(email)}
                >
                  <span className={styles.msgIcon}>{email.read ? '📧' : '📩'}</span>
                  <span className={styles.msgFrom}>{email.from.split('<')[0].trim()}</span>
                  <span className={styles.msgSubject}>{email.subject}</span>
                  <span className={styles.msgDate}>
                    {new Date(email.date).toLocaleDateString()}
                  </span>
                </button>
              ))}
          </div>

          {/* Preview Pane */}
          <div className={styles.previewPane}>
            {selectedEmail ? (
              <>
                <div className={styles.previewHeader}>
                  <div className={styles.previewField}>
                    <span className={styles.previewFieldLabel}>From: </span>
                    {selectedEmail.from}
                  </div>
                  <div className={styles.previewField}>
                    <span className={styles.previewFieldLabel}>To: </span>
                    {selectedEmail.to}
                  </div>
                  <div className={styles.previewField}>
                    <span className={styles.previewFieldLabel}>Subject: </span>
                    {selectedEmail.subject}
                  </div>
                  <div className={styles.previewField}>
                    <span className={styles.previewFieldLabel}>Date: </span>
                    {new Date(selectedEmail.date).toLocaleString()}
                  </div>
                </div>
                <div className={styles.previewBody}>{selectedEmail.body}</div>
              </>
            ) : (
              <div className={styles.emptyPreview}>Select a message to read</div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <span>{emails.filter((e) => !e.read).length} unread message(s)</span>
      </div>
    </div>
  );
}

export const outlookExpressConfig: AppConfig = {
  id: 'outlook-express',
  title: 'Inbox - Outlook Express',
  icon: '/icons/outlook.png',
  defaultSize: { width: 700, height: 500 },
  minSize: { width: 500, height: 350 },
  component: OutlookExpress,
};

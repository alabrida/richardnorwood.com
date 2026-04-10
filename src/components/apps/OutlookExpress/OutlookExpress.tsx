'use client';

import { useState, useCallback, useMemo } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import emailData from '@/../content/emails.json';
import styles from './OutlookExpress.module.css';
import ComposeView from './ComposeView';
import { Email, OutlookView, Folder } from './types';

export default function OutlookExpress({ onTitleChange }: AppProps) {
  const [view, setView] = useState<OutlookView>('inbox');
  const [emails, setEmails] = useState<Email[]>(emailData.inbox);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [activeFolder, setActiveFolder] = useState('Inbox');

  const folders: Folder[] = useMemo(() => [
    { name: 'Inbox', icon: '📥', count: emails.filter((e) => !e.read).length },
    { name: 'Outbox', icon: '📤', count: 0 },
    { name: 'Sent Items', icon: '📨', count: 0 },
    { name: 'Drafts', icon: '📝', count: 0 },
    { name: 'Deleted Items', icon: '🗑️', count: 0 },
  ], [emails]);

  const selectEmail = useCallback((email: Email) => {
    setSelectedEmail(email);
    setEmails((prev) => prev.map((e) => (e.id === email.id ? { ...e, read: true } : e)));
  }, []);

  const openCompose = useCallback(() => {
    setView('compose');
    onTitleChange?.('New Message - Outlook Express');
  }, [onTitleChange]);

  const closeCompose = useCallback(() => {
    setView('inbox');
    onTitleChange?.('Inbox - Outlook Express');
  }, [onTitleChange]);

  const menus: MenuGroup[] = [
    { label: '&File', items: [{ label: '&New Mail Message', shortcut: 'Ctrl+N', onClick: openCompose }, { label: '', separator: true }, { label: '&Close', onClick: () => {} }] },
    { label: '&Edit', items: [{ label: '&Copy', shortcut: 'Ctrl+C', disabled: true }, { label: 'Select &All', shortcut: 'Ctrl+A', disabled: true }] },
    { label: '&View', items: [{ label: '&Current View', disabled: true }, { label: '&Layout...', disabled: true }] },
    { label: '&Tools', items: [{ label: '&Accounts...', disabled: true }, { label: '&Message Rules', disabled: true }] },
    { label: '&Help', items: [{ label: '&About Outlook Express', disabled: true }] },
  ];

  if (view === 'compose') return <ComposeView onSend={closeCompose} onCancel={closeCompose} menus={menus} />;

  return (
    <div className={styles.outlook}>
      <MenuBar menus={menus} /><div className={styles.toolbar}>
        <button className={styles.toolBtn} onClick={openCompose}><span className={styles.toolIcon}>✉️</span>New Mail</button>
        <button className={styles.toolBtn} disabled><span className={styles.toolIcon}>↩️</span>Reply</button>
        <button className={styles.toolBtn} disabled><span className={styles.toolIcon}>↩️</span>Reply All</button>
        <button className={styles.toolBtn} disabled><span className={styles.toolIcon}>➡️</span>Forward</button>
      </div>
      <div className={styles.body}>
        <div className={styles.folderPane}>
          {folders.map((f) => (
            <button key={f.name} className={`${styles.folderItem} ${activeFolder === f.name ? styles.active : ''}`} onClick={() => setActiveFolder(f.name)}>
              <span className={styles.folderIcon}>{f.icon}</span>{f.name}{f.count > 0 && <span className={styles.unreadBadge}>({f.count})</span>}
            </button>
          ))}
        </div>
        <div className={styles.rightPane}>
          <div className={styles.messageList}>
            {emails.filter((e) => e.folder === activeFolder).map((e) => (
              <button key={e.id} className={`${styles.messageRow} ${selectedEmail?.id === e.id ? styles.selected : ''} ${!e.read ? styles.unread : ''}`} onClick={() => selectEmail(e)}>
                <span className={styles.msgIcon}>{e.read ? '📧' : '📩'}</span><span className={styles.msgFrom}>{e.from.split('<')[0].trim()}</span>
                <span className={styles.msgSubject}>{e.subject}</span><span className={styles.msgDate}>{new Date(e.date).toLocaleDateString()}</span>
              </button>
            ))}
          </div>
          <div className={styles.previewPane}>
            {selectedEmail ? (
              <><div className={styles.previewHeader}>
                  <div className={styles.previewField}><span className={styles.previewFieldLabel}>From: </span>{selectedEmail.from}</div>
                  <div className={styles.previewField}><span className={styles.previewFieldLabel}>To: </span>{selectedEmail.to}</div>
                  <div className={styles.previewField}><span className={styles.previewFieldLabel}>Subject: </span>{selectedEmail.subject}</div>
                  <div className={styles.previewField}><span className={styles.previewFieldLabel}>Date: </span>{new Date(selectedEmail.date).toLocaleString()}</div>
                </div><div className={styles.previewBody}>{selectedEmail.body}</div></>
            ) : <div className={styles.emptyPreview}>Select a message to read</div>}
          </div>
        </div>
      </div>
      <div className={styles.statusBar}><span>{emails.filter((e) => !e.read).length} unread message(s)</span></div>
    </div>
  );
}

export const outlookExpressConfig: AppConfig = {
  id: 'outlook-express', title: 'Lifecycle Messaging', icon: '/icons/icons/briefcase.png',
  defaultSize: { width: 700, height: 500 }, minSize: { width: 500, height: 350 }, component: OutlookExpress,
};

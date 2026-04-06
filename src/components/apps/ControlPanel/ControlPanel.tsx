'use client';

import { useState, useCallback } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import styles from './ControlPanel.module.css';

interface CPItem {
  id: string;
  icon: string;
  label: string;
  description: string;
}

const ITEMS: CPItem[] = [
  { id: 'user-accounts', icon: '👤', label: 'User Accounts', description: 'Manage your account and partnership settings' },
  { id: 'display', icon: '🖥️', label: 'Display', description: 'Change Luna theme color (Blue/Silver/Olive)' },
  { id: 'sounds', icon: '🔊', label: 'Sounds and Audio', description: 'Toggle sound effects on/off' },
  { id: 'internet', icon: '🌐', label: 'Internet Options', description: 'Privacy and cookie preferences' },
  { id: 'accessibility', icon: '♿', label: 'Accessibility', description: 'Reduced motion and contrast settings' },
  { id: 'add-remove', icon: '📦', label: 'Add/Remove Programs', description: 'View installed applications' },
];

export default function ControlPanel(_props: AppProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleDoubleClick = useCallback((id: string) => {
    // Stage 3: will open settings dialogs
    setSelected(id);
  }, []);

  return (
    <div className={styles.controlPanel}>
      <div className={styles.header}>
        <span style={{ fontSize: '18px' }}>⚙️</span>
        <span className={styles.headerTitle}>Control Panel</span>
      </div>
      <div className={styles.body}>
        <div className={styles.navPane}>
          <div className={styles.navTitle}>See Also</div>
          <div className={styles.navItem}>🏠 My Computer</div>
          <div className={styles.navItem}>❓ Help and Support</div>
        </div>
        <div className={styles.grid}>
          {ITEMS.map((item) => (
            <button
              key={item.id}
              className={`${styles.item} ${selected === item.id ? styles.selected : ''}`}
              onClick={() => setSelected(item.id)}
              onDoubleClick={() => handleDoubleClick(item.id)}
            >
              <span className={styles.itemIcon}>{item.icon}</span>
              <div className={styles.itemInfo}>
                <div className={styles.itemLabel}>{item.label}</div>
                <div className={styles.itemDesc}>{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const controlPanelConfig: AppConfig = {
  id: 'control-panel',
  title: 'Control Panel',
  icon: '/icons/controlpanel.png',
  defaultSize: { width: 600, height: 400 },
  minSize: { width: 400, height: 280 },
  component: ControlPanel,
};

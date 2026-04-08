'use client';

import { useState, useCallback, useEffect } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import { SoundManager } from '@/lib/sounds/SoundManager';
import styles from './ControlPanel.module.css';

type Panel = 'home' | 'display' | 'sounds';

const THEMES = [
  { id: 'blue', label: 'Luna Blue', color: '#003399' },
  { id: 'silver', label: 'Luna Silver', color: '#848484' },
  { id: 'olive', label: 'Luna Olive', color: '#6B7D2E' },
] as const;

interface CPItem {
  id: string;
  icon: string;
  label: string;
  description: string;
  panel?: Panel;
}

const ITEMS: CPItem[] = [
  { id: 'user-accounts', icon: '👤', label: 'User Accounts', description: 'Manage your account and partnership settings' },
  { id: 'display', icon: '🖥️', label: 'Display', description: 'Change Luna theme color (Blue/Silver/Olive)', panel: 'display' },
  { id: 'sounds', icon: '🔊', label: 'Sounds and Audio', description: 'Toggle sound effects on/off', panel: 'sounds' },
  { id: 'internet', icon: '🌐', label: 'Internet Options', description: 'Privacy and cookie preferences' },
  { id: 'accessibility', icon: '♿', label: 'Accessibility', description: 'Reduced motion and contrast settings' },
  { id: 'add-remove', icon: '📦', label: 'Add/Remove Programs', description: 'View installed applications' },
];

function getStoredTheme(): string {
  if (typeof window === 'undefined') return 'blue';
  return localStorage.getItem('xp-theme') || 'blue';
}

function applyTheme(themeId: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('xp-theme', themeId);
  const colors: Record<string, string> = {
    blue: '#003399',
    silver: '#848484',
    olive: '#6B7D2E',
  };
  document.documentElement.style.setProperty('--xp-desktop-bg', colors[themeId] || colors.blue);
  document.documentElement.style.setProperty('--xp-taskbar-bg', themeId === 'blue' ? '#245EDC' : themeId === 'silver' ? '#C0C0C0' : '#6B7D2E');
  document.documentElement.style.setProperty('--xp-start-bg', themeId === 'blue' ? 'linear-gradient(180deg, #3A8FFF 0%, #245EDC 100%)' : themeId === 'silver' ? 'linear-gradient(180deg, #D6D6D6 0%, #A0A0A0 100%)' : 'linear-gradient(180deg, #8EA847 0%, #6B7D2E 100%)');
}

export default function ControlPanel({ onTitleChange }: AppProps) {
  const [panel, setPanel] = useState<Panel>('home');
  const [selected, setSelected] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState(getStoredTheme);
  const [soundMuted, setSoundMuted] = useState(() =>
    typeof window !== 'undefined' ? SoundManager.getInstance().isMuted() : false
  );
  const [volume, setVolume] = useState(() =>
    typeof window !== 'undefined' ? SoundManager.getInstance().getVolume() : 0.5
  );

  // Apply stored theme on mount
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleDoubleClick = useCallback((item: CPItem) => {
    if (item.panel) {
      setPanel(item.panel);
      onTitleChange?.(`${item.label} - Control Panel`);
    }
    setSelected(item.id);
  }, [onTitleChange]);

  const goHome = useCallback(() => {
    setPanel('home');
    onTitleChange?.('Control Panel');
  }, [onTitleChange]);

  const handleThemeChange = useCallback((themeId: string) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
  }, []);

  const handleMuteToggle = useCallback(() => {
    const newMuted = !soundMuted;
    setSoundMuted(newMuted);
    SoundManager.getInstance().setMuted(newMuted);
  }, [soundMuted]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    SoundManager.getInstance().setVolume(val);
  }, []);

  // ── Display panel ──
  if (panel === 'display') {
    return (
      <div className={styles.controlPanel}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={goHome}>← Back</button>
          <span className={styles.headerTitle}>Display Properties</span>
        </div>
        <div className={styles.settingsBody}>
          <div className={styles.settingsSection}>
            <div className={styles.sectionTitle}>Luna Theme</div>
            <div className={styles.themeGrid}>
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  className={`${styles.themeBtn} ${currentTheme === theme.id ? styles.themeActive : ''}`}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  <div className={styles.themeSwatch} style={{ background: theme.color }} />
                  <span>{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Sounds panel ──
  if (panel === 'sounds') {
    return (
      <div className={styles.controlPanel}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={goHome}>← Back</button>
          <span className={styles.headerTitle}>Sounds and Audio</span>
        </div>
        <div className={styles.settingsBody}>
          <div className={styles.settingsSection}>
            <div className={styles.sectionTitle}>Sound Effects</div>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={!soundMuted}
                onChange={handleMuteToggle}
              />
              Enable sound effects
            </label>
          </div>
          <div className={styles.settingsSection}>
            <div className={styles.sectionTitle}>Volume</div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeSlider}
              disabled={soundMuted}
            />
            <span className={styles.volumeLabel}>{Math.round(volume * 100)}%</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Home panel ──
  return (
    <div className={styles.controlPanel}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>⚙️</span>
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
              onDoubleClick={() => handleDoubleClick(item)}
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
  icon: '/icons/icons/steering_wheel.png',
  defaultSize: { width: 600, height: 400 },
  minSize: { width: 400, height: 280 },
  component: ControlPanel,
};

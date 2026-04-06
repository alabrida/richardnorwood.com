'use client';

import type { AppProps, AppConfig } from '@/lib/wms/types';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import styles from './MediaPlayer.module.css';

const PLAYLIST = [
  { id: 1, title: 'Client Testimonial — Tech Startup (312% Growth)', duration: '3:42' },
  { id: 2, title: 'Revenue Journey Overview', duration: '5:15' },
  { id: 3, title: 'Case Study — E-Commerce $2.4M Recovery', duration: '4:28' },
  { id: 4, title: '90-Day Partnership Walkthrough', duration: '7:03' },
];

export default function MediaPlayer(_props: AppProps) {
  const menus: MenuGroup[] = [
    {
      label: '&File',
      items: [
        { label: '&Open...', shortcut: 'Ctrl+O', disabled: true },
        { label: '', separator: true },
        { label: '&Close', onClick: () => {} },
      ],
    },
    {
      label: '&View',
      items: [
        { label: '&Full Screen', disabled: true },
        { label: '&Now Playing', checked: true },
      ],
    },
    {
      label: '&Play',
      items: [
        { label: '&Play/Pause', shortcut: 'Space', disabled: true },
        { label: '&Stop', disabled: true },
      ],
    },
    {
      label: '&Help',
      items: [{ label: '&About Windows Media Player', disabled: true }],
    },
  ];

  return (
    <div className={styles.player}>
      <MenuBar menus={menus} />

      {/* Video Viewport */}
      <div className={styles.viewport}>
        <div className={styles.visualizer}>
          <div className={styles.vizBar} style={{ height: '30%' }} />
          <div className={styles.vizBar} style={{ height: '60%' }} />
          <div className={styles.vizBar} style={{ height: '45%' }} />
          <div className={styles.vizBar} style={{ height: '80%' }} />
          <div className={styles.vizBar} style={{ height: '50%' }} />
          <div className={styles.vizBar} style={{ height: '70%' }} />
          <div className={styles.vizBar} style={{ height: '35%' }} />
          <div className={styles.vizBar} style={{ height: '55%' }} />
          <div className={styles.vizBar} style={{ height: '65%' }} />
          <div className={styles.vizBar} style={{ height: '40%' }} />
        </div>
        <div className={styles.nowPlaying}>Revenue Architect Media</div>
      </div>

      {/* Transport Controls */}
      <div className={styles.transport}>
        <div className={styles.seekBar}>
          <div className={styles.seekFill} style={{ width: '0%' }} />
        </div>
        <div className={styles.controls}>
          <button className={styles.ctrlBtn}>⏮</button>
          <button className={styles.ctrlBtn}>⏪</button>
          <button className={`${styles.ctrlBtn} ${styles.playBtn}`}>▶</button>
          <button className={styles.ctrlBtn}>⏩</button>
          <button className={styles.ctrlBtn}>⏭</button>
          <div style={{ flex: 1 }} />
          <span className={styles.timeDisplay}>0:00 / 0:00</span>
          <button className={styles.ctrlBtn}>🔊</button>
        </div>
      </div>

      {/* Playlist */}
      <div className={styles.playlist}>
        <div className={styles.playlistTitle}>Now Playing</div>
        {PLAYLIST.map((track) => (
          <button key={track.id} className={styles.playlistItem}>
            <span className={styles.trackNum}>{track.id}.</span>
            <span className={styles.trackTitle}>{track.title}</span>
            <span className={styles.trackDuration}>{track.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export const mediaPlayerConfig: AppConfig = {
  id: 'media-player',
  title: 'Windows Media Player',
  icon: '/icons/mediaplayer.png',
  defaultSize: { width: 420, height: 500 },
  minSize: { width: 320, height: 380 },
  component: MediaPlayer,
};

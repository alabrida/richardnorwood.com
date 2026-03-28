'use client';

import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import '@/lib/apps/registerAll';
import BootLogin from '@/components/xp/BootLogin';
import Desktop from '@/components/xp/Desktop';
import Taskbar from '@/components/xp/Taskbar';
import StartMenu from '@/components/xp/StartMenu';
import styles from './DesktopPage.module.css';

type AppPhase = 'boot-login' | 'desktop';

export default function DesktopPage() {
  const [phase, setPhase] = useState<AppPhase>('boot-login');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Guest');
  const workspaceRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      workspaceRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleEnterDesktop = useCallback((mode: 'guest' | 'signin') => {
    setUserName(mode === 'guest' ? 'Guest' : 'User');
    setPhase('desktop');
  }, []);

  const toggleStartMenu = useCallback(() => {
    setStartMenuOpen((prev) => !prev);
  }, []);

  const closeStartMenu = useCallback(() => {
    setStartMenuOpen(false);
  }, []);

  if (phase === 'boot-login') {
    return (
      <div id="xp-workspace" className={styles.xpWorkspace} ref={workspaceRef}>
        <BootLogin onEnterDesktop={handleEnterDesktop} />
      </div>
    );
  }

  return (
    <div id="xp-workspace" className={styles.xpWorkspace} ref={workspaceRef}>
      <Desktop />

      <AnimatePresence>
        {startMenuOpen && (
          <StartMenu onClose={closeStartMenu} userName={userName} />
        )}
      </AnimatePresence>

      <Taskbar 
        onStartClick={toggleStartMenu} 
        startMenuOpen={startMenuOpen} 
        onFullscreenClick={toggleFullscreen}
      />
    </div>
  );
}

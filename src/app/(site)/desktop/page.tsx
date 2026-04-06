'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import '@/lib/apps/registerAll';
import { JsonLd } from '@/components/seo/JsonLd';
import BootLogin from '@/components/xp/BootLogin';
import Desktop from '@/components/xp/Desktop';
import Taskbar from '@/components/xp/Taskbar';
import StartMenu from '@/components/xp/StartMenu';
import { useWMSStore } from '@/lib/wms/WindowManager';
import styles from './DesktopPage.module.css';

type AppPhase = 'boot-login' | 'desktop';

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Revenue Architect — Living Case Study",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Interactive Windows XP case study demonstrating Revenue Architecture methodology and commercial engine diagnostics.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/OnlineOnly"
  }
};

export default function DesktopPage() {
  const [phase, setPhase] = useState<AppPhase>('boot-login');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Guest');
  const workspaceRef = useRef<HTMLDivElement>(null);
  
  const setHeaderVisible = useWMSStore((s) => s.setHeaderVisible);

  useEffect(() => {
    // Hide header on boot, show it when on desktop
    setHeaderVisible(phase === 'desktop');
    // Cleanup when leaving the immersive component entirely
    return () => setHeaderVisible(true);
  }, [phase, setHeaderVisible]);

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
        <JsonLd data={softwareSchema} />
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

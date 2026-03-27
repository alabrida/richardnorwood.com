'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import '@/lib/apps/registerAll';
import BootLogin from '@/components/xp/BootLogin';
import Desktop from '@/components/xp/Desktop';
import Taskbar from '@/components/xp/Taskbar';
import StartMenu from '@/components/xp/StartMenu';

type AppPhase = 'boot-login' | 'desktop';

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>('boot-login');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Guest');

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
    return <BootLogin onEnterDesktop={handleEnterDesktop} />;
  }

  return (
    <>
      <Desktop />

      <AnimatePresence>
        {startMenuOpen && (
          <StartMenu onClose={closeStartMenu} userName={userName} />
        )}
      </AnimatePresence>

      <Taskbar onStartClick={toggleStartMenu} startMenuOpen={startMenuOpen} />
    </>
  );
}

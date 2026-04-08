'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile viewport (< 768px).
 * Uses matchMedia for efficient, listener-based detection.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    // Initialize state properly without triggering synchronous re-render in effect
    if (mql.matches !== isMobile) {
      setIsMobile(mql.matches);
    }

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  return isMobile;
}

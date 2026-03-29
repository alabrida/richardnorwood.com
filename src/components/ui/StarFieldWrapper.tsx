'use client';

import { usePathname } from 'next/navigation';
import StarField from './StarField';

/**
 * Conditionally renders the interactive StarField on all site pages
 * EXCEPT the XP desktop (/desktop) route.
 */
export default function StarFieldWrapper() {
  const pathname = usePathname();

  // Do not render stars on the XP desktop
  if (pathname === '/desktop' || pathname.startsWith('/desktop/')) {
    return null;
  }

  return <StarField />;
}

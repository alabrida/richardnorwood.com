'use client';

import ErrorDialog from '@/components/xp/ErrorDialog';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorDialog
      title="Application Error"
      message={`An unexpected error occurred in the Revenue Engine.\n\n${error.message || 'Unknown error'}\n\nClick Retry to attempt recovery.`}
      onRetry={reset}
      onClose={() => window.location.href = '/'}
    />
  );
}

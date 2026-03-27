import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Revenue Architect — Richard Norwood',
  description:
    'Revenue optimization platform by Richard Norwood — 5-Stage Revenue Journey Assessment, SaaS Dashboard, and Strategic Consulting.',
  icons: {
    icon: '/icons/start-flag.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="xp-shell">{children}</body>
    </html>
  );
}

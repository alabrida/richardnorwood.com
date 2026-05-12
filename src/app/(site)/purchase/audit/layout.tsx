import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit Checkout | Richard Norwood, PMP',
  description: 'Secure checkout for qualified audit access.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PurchaseAuditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

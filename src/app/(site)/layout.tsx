import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="site-body">
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Richard Norwood | Revenue Architecture",
    template: "%s | Richard Norwood"
  },
  description: "Diagnose and fix the leaks in your commercial engine. AI-powered revenue architecture for scaling SaaS companies.",
  keywords: ["Revenue Operations", "SaaS Growth", "Fractional CRO", "Revenue Architecture", "AI Business Audit"],
  authors: [{ name: "Richard Norwood" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://richardnorwood.com",
    title: "Richard Norwood | Revenue Architecture",
    description: "Diagnose and fix the leaks in your commercial engine.",
    siteName: "Richard Norwood",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Norwood | Revenue Architecture",
    description: "Diagnose and fix the leaks in your commercial engine.",
    creator: "@richardnorwood",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

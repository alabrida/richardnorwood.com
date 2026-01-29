
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using Outfit as display font per Manifesto
import "./globals.css";
import { AntigravityParticles } from "@/components/ui/AntigravityParticles";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Richard Norwood | Revenue Engine Architect",
  description: "Architecting Revenue Engines for the modern enterprise. Stop guessing, start scaling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "name": "Richard Norwood",
                  "jobTitle": "Revenue Engine Architect",
                  "url": "https://richardnorwood.com",
                  "sameAs": [
                    "https://www.linkedin.com/in/richardnorwood",
                    "https://twitter.com/richardnorwood"
                  ],
                  "description": "Architecting Revenue Engines for the modern enterprise. Specializing in the 5-Stage Revenue Journey."
                },
                {
                  "@type": "Organization",
                  "name": "Richard Norwood",
                  "url": "https://richardnorwood.com",
                  "logo": "https://richardnorwood.com/logo.png",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "hello@richardnorwood.com",
                    "contactType": "customer service"
                  }
                }
              ]
            })
          }}
        />
        <AntigravityParticles />
        {children}
      </body>
    </html>
  );
}

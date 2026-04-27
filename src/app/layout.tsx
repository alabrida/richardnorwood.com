import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { JsonLd } from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Richard Norwood, PMP — Guide & Revenue Architecture Advisor',
  description: 'Helping agencies and service businesses move from fragmented, hero-led growth toward a commercial system that is visible, governable, and easier to improve over time.',
  metadataBase: new URL('https://richardnorwood.com'),
  openGraph: {
    title: 'Richard Norwood, PMP — Guide & Revenue Architecture Advisor',
    description: 'Helping agencies and service businesses move from fragmented, hero-led growth toward a commercial system that is visible, governable, and easier to improve over time.',
    url: 'https://richardnorwood.com',
    siteName: 'Richard Norwood',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Richard Norwood, PMP — Guide & Revenue Architecture Advisor',
    description: 'Helping agencies and service businesses move from fragmented, hero-led growth toward a commercial system that is visible, governable, and easier to improve over time.',
  },
  icons: {
    icon: '/icons/icons/wheel.png',
  },
};

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://richardnorwood.com/#person",
      "name": "Richard Norwood",
      "jobTitle": "Guide & Revenue Architecture Advisor",
      "description": "Certified PMP and Guide who helps agencies move from fragmented growth to visible, governable commercial systems.",
      "url": "https://richardnorwood.com",
      "sameAs": [
        "https://www.linkedin.com/in/richardnorwoodpmp/",
        "https://github.com/richwood911",
        "https://x.com/richnorwoodpmp",
        "https://www.youtube.com/@richardnorwoodpmp",
        "https://www.instagram.com/richardnorwoodpmp/",
        "https://www.facebook.com/profile.php?id=61574711377210",
        "https://www.tiktok.com/@richardnorwoodpmp",
        "https://share.google/njwSUidXoDAXya4ui"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "PMP Certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Project Management Institute"
          },
          "url": "https://www.credly.com/badges/08947dff-1909-4bc0-97c5-3228020092f8/public_url"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Data Analytics Certificate",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Google"
          },
          "url": "https://coursera.org/share/380889997f4b4bcf04d4a250d5ce7df9"
        }
      ],
      "knowsAbout": [
        "Revenue Architecture",
        "Commercial Strategy",
        "Managed Nervous Systems",
        "Information Fusion",
        "Data Analytics",
        "Governance & Tool Rationalization"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://richardnorwood.com/#organization",
      "name": "Richard Norwood, PMP - Guide & Revenue Architecture Advisor",
      "url": "https://richardnorwood.com",
      "description": "Strategic consulting for revenue architecture, commercial system design, and operational improvement. 90-day to 12-month partnership engagements.",
      "founder": { "@id": "https://richardnorwood.com/#person" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "serviceType": [
        "Revenue Architecture",
        "Commercial Strategy",
        "Project Management",
        "Digital Infrastructure"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Strategic Partnership Tiers",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Phase I: Diagnostic & Stabilization",
            "description": "90-day engagement for commercial system assessment, clarity, and first-layer improvements."
          },
          {
            "@type": "Offer",
            "name": "Phase II: Orchestration",
            "description": "6-month engagement for Managed Nervous System installation and structured follow-through."
          },
          {
            "@type": "Offer",
            "name": "Phase III: Transition",
            "description": "12-month engagement for governance strengthening and deeper architecture readiness."
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://richardnorwood.com/#website",
      "url": "https://richardnorwood.com/",
      "name": "Richard Norwood - Revenue Architect",
      "publisher": {
        "@id": "https://richardnorwood.com/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <JsonLd data={globalSchema} />
      </head>
      <body>{children}</body>
    </html>
  );
}

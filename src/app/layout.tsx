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
  title: 'Richard Norwood, PMP — Revenue Architect',
  description: 'I help agencies and service businesses find friction in their commercial system, fix what matters first, and build a revenue engine their team can actually run.',
  metadataBase: new URL('https://richardnorwood.com'),
  openGraph: {
    title: 'Richard Norwood, PMP — Revenue Architect',
    description: 'I help agencies and service businesses find friction in their commercial system, fix what matters first, and build a revenue engine their team can actually run.',
    url: 'https://richardnorwood.com',
    siteName: 'Richard Norwood',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Richard Norwood, PMP — Revenue Architect',
    description: 'I help agencies and service businesses find friction in their commercial system, fix what matters first, and build a revenue engine their team can actually run.',
  },
  icons: {
    icon: [{ url: '/images/author_pic.jpg', type: 'image/jpeg' }],
  },
};

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://richardnorwood.com/#person",
      "name": "Richard Norwood",
      "jobTitle": "Revenue Architect",
      "image": "https://richardnorwood.com/images/author_pic.jpg",
      "description": "Certified PMP who helps agencies and service businesses build commercial systems that connect marketing, sales, delivery, and retention.",
      "url": "https://richardnorwood.com",
      "sameAs": [
        "https://www.linkedin.com/in/richardnorwoodpmp/",
        "https://github.com/richwood911",
        "https://x.com/richnorwoodpmp",
        "https://www.youtube.com/@richardnorwoodpmp",
        "https://www.instagram.com/richardnorwoodpmp/",
        "https://www.tiktok.com/@richardnorwoodpmp",
        "https://share.google/nPvEH2o5m4Lc7Gfbk"
      ],
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "Jacksonville State University",
          "sameAs": "https://en.wikipedia.org/wiki/Jacksonville_State_University"
        }
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
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Project Management Certificate",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Google"
          },
          "url": "https://www.coursera.org/account/accomplishments/specialization/certificate/SNZ6T6MJZSVH"
        }
      ],
      "knowsAbout": [
        "Revenue Architecture",
        "Commercial Strategy",
        "Buyer Journey Optimization",
        "Cross-Team Alignment",
        "Data Analytics",
        "Governance & Process Design"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://richardnorwood.com/#organization",
      "name": "Richard Norwood, PMP — Revenue Architect",
      "url": "https://richardnorwood.com",
      "description": "Strategic consulting to align, build, and hand off commercial systems that connect marketing, sales, delivery, and retention into one revenue engine.",
      "founder": { "@id": "https://richardnorwood.com/#person" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "serviceType": [
        "Revenue Architecture",
        "Commercial Strategy",
        "Project Management",
        "Buyer Journey Optimization"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Partnership Tiers",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Align",
            "description": "90-day engagement to diagnose the revenue system, establish positioning, and make the first high-impact improvements."
          },
          {
            "@type": "Offer",
            "name": "Build",
            "description": "6-month partnership to install the operating layer — visibility, automation, and cross-team alignment."
          },
          {
            "@type": "Offer",
            "name": "Command",
            "description": "12-month engagement to strengthen governance, simplify the stack, and transition to full team independence."
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://richardnorwood.com/#website",
      "url": "https://richardnorwood.com/",
      "name": "Richard Norwood — Revenue Architect",
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

import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { JsonLd } from '@/components/seo/JsonLd';
import StagePageClient from './StagePageClient';

/* ── Types ── */
interface FAB {
  feature: string;
  advantage: string;
  benefit: string;
}

interface StageNavItem {
  slug: string;
  label: string;
}

interface StageData {
  title: string;
  headline: string;
  tagline: string;
  seo_title: string;
  seo_description: string;
  og_description: string;
  problem_hook: string;
  symptoms: string[];
  solution_summary: string;
  stat_callout: {
    number: string;
    label: string;
    source: string;
  };
  fabs: FAB[];
  cta: string;
  cta_url: string;
  color: string;
  next_stage: StageNavItem | null;
  prev_stage: StageNavItem | null;
}

const STAGES = ['awareness', 'consideration', 'decision', 'conversion', 'retention'] as const;

/* ── Data Loader ── */
async function getRevenueJourneyData(): Promise<Record<string, StageData>> {
  const filePath = path.join(process.cwd(), 'content', 'revenue-journey.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

/* ── Static Params (SSG) ── */
export async function generateStaticParams() {
  return STAGES.map((stage) => ({ stage }));
}

/* ── Dynamic Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ stage: string }>;
}): Promise<Metadata> {
  const { stage } = await params;
  const data = await getRevenueJourneyData();
  const stageData = data[stage];

  if (!stageData) {
    return { title: 'Stage Not Found' };
  }

  return {
    title: stageData.seo_title,
    description: stageData.seo_description,
    openGraph: {
      title: stageData.seo_title,
      description: stageData.og_description,
      url: `https://www.richardnorwood.com/revenue-journey/${stage}`,
      type: 'article',
      siteName: 'Richard Norwood',
    },
    twitter: {
      card: 'summary_large_image',
      title: stageData.seo_title,
      description: stageData.og_description,
    },
    alternates: {
      canonical: `https://www.richardnorwood.com/revenue-journey/${stage}`,
    },
  };
}

/* ── Page ── */
export default async function RevenueJourneyPage({
  params,
}: {
  params: Promise<{ stage: string }>;
}) {
  const { stage } = await params;
  const data = await getRevenueJourneyData();
  const stageData = data[stage];

  if (!stageData) notFound();

  /* ── Structured Data: Service + FAQ ── */
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${stageData.headline} — Revenue Architecture`,
    description: stageData.seo_description,
    provider: {
      '@type': 'Person',
      name: 'Richard Norwood',
      url: 'https://www.richardnorwood.com',
    },
    serviceType: 'Revenue Architecture Consulting',
    areaServed: { '@type': 'Country', name: 'United States' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: stageData.fabs.map((fab) => ({
      '@type': 'Question',
      name: `What does "${fab.feature}" mean for my business?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${fab.advantage} ${fab.benefit}`,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.richardnorwood.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Revenue Journey',
        item: 'https://www.richardnorwood.com/#ideology',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: stageData.headline,
        item: `https://www.richardnorwood.com/revenue-journey/${stage}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <StagePageClient data={stageData} stage={stage} />
    </>
  );
}

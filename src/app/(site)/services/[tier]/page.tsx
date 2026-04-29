import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import IntakeForm from '@/components/forms/IntakeForm';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }) {
  const { tier } = await params;
  const data = await getServicesData();
  const tierData = data.tiers.find((t: any) => t.id === tier);

  if (!tierData) return { title: 'Not Found' };

  return buildMetadata({
    title: `${tierData.name} Partnership | Richard Norwood, PMP`,
    description: tierData.subtitle,
    path: `/services/${tier}`,
    noIndex: true, // Intake funnel page, should not be indexed
  });
}

interface PageProps {
  params: Promise<{ tier: string }>;
}

async function getServicesData() {
  const filePath = path.join(process.cwd(), 'content', 'services.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export default async function ServiceTierPage({ params }: PageProps) {
  const { tier } = await params;
  const data = await getServicesData();
  const tierData = data.tiers.find((t: any) => t.id === tier);

  if (!tierData) notFound();

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-[#060b16]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="relative pt-2">
            {tier === 'build' && (
              <div className="absolute top-0 right-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#f0b429] text-[#060b16] rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_4px_12px_rgba(240,180,41,0.2)]">
                <span>★</span>
                Recommended / Best Value
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#e8edf5] mb-4">
              {tierData.name}
            </h1>
            <p className="text-xl text-[#f0b429] font-medium italic">
              {tierData.subtitle}
            </p>
          </div>
          
          <p className="text-lg text-[#8899b4] leading-relaxed">
            {tierData.description}
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#e8edf5] uppercase tracking-wider">What's Included:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tierData.includes.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-[#5a6a84]">
                  <span className="text-[#20c997] mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:sticky lg:top-32">
          <IntakeForm defaultTier={tier} />
        </div>
      </div>
    </main>
  );
}

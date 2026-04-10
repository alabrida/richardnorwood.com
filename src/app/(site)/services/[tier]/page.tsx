import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import IntakeForm from '@/components/forms/IntakeForm';

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
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
              {tierData.name}
            </h1>
            <p className="text-xl text-secondary font-medium italic">
              {tierData.subtitle}
            </p>
          </div>
          
          <p className="text-lg text-text-muted leading-relaxed">
            {tierData.description}
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-text uppercase tracking-wider">What's Included:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tierData.includes.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-text-subtle">
                  <span className="text-secondary mt-1">✓</span>
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

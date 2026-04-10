import React from 'react';
import { notFound, redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import DiscoveryForm from '@/components/forms/DiscoveryForm';

interface PageProps {
  params: Promise<{ tier: string }>;
  searchParams: Promise<{ email?: string }>;
}

async function getDiscoveryData() {
  const filePath = path.join(process.cwd(), 'content', 'discovery.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export default async function DiscoveryTierPage({ params, searchParams }: PageProps) {
  const { tier } = await params;
  const { email } = await searchParams;

  if (!email) redirect(`/services/${tier}`);

  const data = await getDiscoveryData();
  const discoveryData = data[tier];

  if (!discoveryData) notFound();

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-[#060b16]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f0b429]/10 border border-[#f0b429]/20 rounded-full text-[#f0b429] text-xs font-bold uppercase tracking-widest mb-4">
            Security Clearance Active
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#e8edf5]">
            Refining the Engine
          </h1>
        </div>

        <DiscoveryForm 
          tier={tier} 
          email={email} 
          title={discoveryData.title}
          questions={discoveryData.questions}
        />
      </div>
    </main>
  );
}

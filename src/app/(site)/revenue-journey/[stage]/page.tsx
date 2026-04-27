import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

interface FAB {
  feature: string;
  advantage: string;
  benefit: string;
}

interface StageData {
  title: string;
  headline: string;
  tagline: string;
  fabs: FAB[];
  cta: string;
  cta_url: string;
  color: string;
}

async function getRevenueJourneyData(): Promise<Record<string, StageData>> {
  const filePath = path.join(process.cwd(), 'content', 'revenue-journey.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export default async function RevenueJourneyPage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  const data = await getRevenueJourneyData();
  const stageData = data[stage];

  if (!stageData) notFound();

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-[#060b16] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div 
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10"
            style={{ color: stageData.color, backgroundColor: `${stageData.color}15` }}
          >
            {stageData.title}
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-[#e8edf5]">
            {stageData.headline}
          </h1>
          <p className="text-xl text-[#8899b4] italic">{stageData.tagline}</p>
        </div>

        {/* FAB Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stageData.fabs.map((fab, i) => (
            <div 
              key={i} 
              className="p-8 bg-[#0f1a2e] border border-[rgba(136,153,180,0.15)] rounded-2xl space-y-6 hover:border-secondary/30 transition-colors group"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                style={{ backgroundColor: `${stageData.color}20`, color: stageData.color }}
              >
                0{i + 1}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#8899b4] uppercase tracking-wider">The Feature</h3>
                <p className="text-xl font-heading font-bold text-[#e8edf5]">{fab.feature}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#8899b4] uppercase tracking-wider">The Advantage</h3>
                <p className="text-[#e8edf5] leading-relaxed">{fab.advantage}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#8899b4] uppercase tracking-wider">The Benefit</h3>
                <p className="text-secondary font-medium italic leading-relaxed">{fab.benefit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 bg-gradient-to-b from-[#0f1a2e] to-[#060b16] border border-[rgba(136,153,180,0.15)] rounded-3xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#e8edf5]">
            Ready to strengthen this stage?
          </h2>
          <p className="text-[#8899b4] max-w-2xl mx-auto text-lg">
            See where friction lives and what to fix first in your {stage} phase.
          </p>
          <Link 
            href={stageData.cta_url}
            className="inline-flex items-center gap-2 py-4 px-10 bg-secondary text-[#060b16] font-heading font-bold text-xl rounded-full hover:bg-secondary-dark transition-all shadow-xl hover:shadow-secondary/20"
          >
            {stageData.cta} →
          </Link>
        </div>

        {/* Navigation Back */}
        <div className="mt-12 text-center">
          <Link href="/#ideology" className="text-[#5a6a84] hover:text-[#e8edf5] transition-colors">
            ← Back to Revenue Journey Overview
          </Link>
        </div>
      </div>

      {/* Decorative Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] opacity-10 pointer-events-none"
        style={{ backgroundColor: stageData.color }}
      />
    </main>
  );
}

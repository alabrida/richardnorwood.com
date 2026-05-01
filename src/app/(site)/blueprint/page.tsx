import React from 'react';
import PageHero from '@/components/sections/PageHero';
import Container from '@/components/layout/Container';
import BlueprintForm from '@/components/forms/BlueprintForm';
import { buildMetadata } from '@/lib/metadata';
import blueprintData from '../../../../content/blueprint.json';
import { CheckIcon } from '@heroicons/react/24/solid/index.js';

export const metadata = buildMetadata({
  title: 'Revenue Journey Blueprint | Richard Norwood, PMP',
  description: 'Download the 5-Stage Revenue Journey Blueprint and start identifying structural friction in your commercial engine.',
  path: '/blueprint',
});

export default function BlueprintPage() {
  return (
    <>
      <PageHero 
        title={blueprintData.hero.title} 
        subtitle="The exact structural map I use to diagnose and fix commercial engines. This is the architecture you need to understand before running the Health Check pre-qualifier."
      />
      
      <section style={{ padding: 'var(--space-20) 0', background: 'var(--color-bg)' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>{blueprintData.content.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                display: 'inline-block', 
                textAlign: 'left',
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-subtle)'
              }}>
                {blueprintData.content.items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 'var(--space-2)', display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <CheckIcon style={{ width: '20px', height: '20px', color: 'var(--color-secondary)', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <BlueprintForm />
        </Container>
      </section>
    </>
  );
}

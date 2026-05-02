import React from 'react'
import ContactForm from '@/components/forms/ContactForm'
import GoogleCalendarEmbed from '@/components/ui/GoogleCalendarEmbed'
import { Toaster } from 'sonner'
import GlowCard from '@/components/ui/GlowCard'
import CallButton from '@/components/ui/CallButton'
import PageHero from '@/components/sections/PageHero'
import styles from '@/components/forms/AuthForm.module.css'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Contact | Richard Norwood, PMP',
  description: 'Book a discovery session or send a message to start a conversation about your commercial system.',
  path: '/contact',
})

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Richard Norwood',
    description: metadata.description,
    url: 'https://richardnorwood.com/contact',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://richardnorwood.com/#person'
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://richardnorwood.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: 'https://richardnorwood.com/contact'
      }
    ]
  }

  return (
    <>
      <JsonLd data={[contactSchema, breadcrumbSchema]} />
      <Toaster position="bottom-right" theme="dark" richColors />
      
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 var(--space-4) var(--space-12)' }}>
        
        <PageHero
          title="Start a Conversation"
          subtitle="Whether you need a full commercial diagnosis or you're ready to explore a partnership, send a message below or pick a slot on the calendar."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-12)', alignItems: 'stretch' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
            <GlowCard className={styles.authCard} glowColor="var(--color-secondary)">
              <div className={styles.authContent}>
                <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                  Send a Message
                </h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
                  Tell us about your business and what you're working on. We'll follow up within 24 hours.
                </p>
                
                <ContactForm />
              </div>
            </GlowCard>

            {/* Response Expectations */}
            <GlowCard className={styles.authCard} glowColor="var(--color-primary)">
              <div className={styles.authContent}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>
                  What to Expect
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--text-md)', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>Active partnership clients receive priority response.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <span>All information is kept confidential and handled securely.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                    <span>Expect initial feedback within 24 hours.</span>
                  </li>
                </ul>
              </div>
            </GlowCard>

            <div style={{ padding: '0 var(--space-6)', display: 'flex', justifyContent: 'flex-end' }}>
              <CallButton />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                Book a Discovery Session
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
                Schedule a 20-minute session with Richard Norwood, PMP to discuss your commercial system.
              </p>
            </div>
            
            <div style={{ flexGrow: 1, height: 850 }}>
              <GoogleCalendarEmbed />
            </div>
          </div>

        </div>
      </main>
    </>
  )
}

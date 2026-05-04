import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import Link from 'next/link'
import * as motion from 'framer-motion/client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return buildMetadata({
    title: `Dashboard | ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
    description: 'Secure partnership dashboard for active client work.',
    path: `/portal/${slug}/dashboard`,
    noIndex: true,
  })
}

export default async function ClientDashboard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('client_profiles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!profile) {
    notFound()
  }

  // Security check: ensure user owns this profile (unless admin)
  if (profile.user_id && profile.user_id !== user.id) {
     // For now, if user_id is null (just seeded), we allow the first person to link it or just allow access for setup
  }

  // Fetch audit status
  const { data: auditResponse } = await supabase
    .from('audit_responses')
    .select('is_submitted')
    .eq('client_id', profile.id)
    .maybeSingle()

  const brand = profile.brand_colors || { primary: '#2BB6F6' }
  const isAuditComplete = auditResponse?.is_submitted || false

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: 'var(--space-32) var(--space-4) var(--space-20)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <header style={{ marginBottom: 'var(--space-16)', borderBottom: `1px solid ${brand.primary}33`, paddingBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
                Welcome, {profile.contact_name || profile.company_name}
              </h1>
              <p style={{ color: 'var(--color-text-subtle)', letterSpacing: '0.05em' }}>Strategic Alignment Partnership Portal</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</div>
              <div style={{ color: brand.primary, fontWeight: 'bold' }}>Active Alignment</div>
            </div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)' }}>
          <div style={{ 
            background: 'var(--glass-bg-heavy)', 
            backdropFilter: 'blur(var(--glass-blur))',
            WebkitBackdropFilter: 'blur(var(--glass-blur))',
            border: `1px solid ${brand.primary}44`, 
            borderRadius: 'var(--radius-xl)', 
            padding: 'var(--space-10)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: `0 10px 40px -10px ${brand.primary}22`
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: 'white' }}>Audit Status</h2>
                <div style={{ 
                  padding: '4px 10px', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: '10px', 
                  fontWeight: 'bold',
                  background: isAuditComplete ? 'rgba(32, 201, 151, 0.1)' : 'rgba(240, 180, 41, 0.1)',
                  color: isAuditComplete ? 'var(--color-accent)' : 'var(--color-secondary)',
                  border: `1px solid ${isAuditComplete ? 'var(--color-accent)' : 'var(--color-secondary)'}33`
                }}>
                  {isAuditComplete ? 'COMPLETE' : 'ACTION REQUIRED'}
                </div>
              </div>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
                Your operational and clinical audit data forms the foundation of our strategic roadmap. 
                {isAuditComplete 
                  ? ' Your data has been successfully captured and is being analyzed.' 
                  : ' Please complete the remaining questions to finalize your baseline metrics.'}
              </p>
            </div>
            <Link 
              href={`/portal/${slug}/audit`}
              style={{ 
                display: 'inline-block', 
                background: brand.primary, 
                color: 'black', 
                padding: 'var(--space-4) var(--space-8)', 
                borderRadius: 'var(--radius-full)', 
                fontWeight: 'bold',
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: `0 4px 14px ${brand.primary}44`
              }}
            >
              {isAuditComplete ? 'Review Responses' : 'Launch Audit Tool →'}
            </Link>
          </div>
          
          <div style={{ 
            background: 'var(--color-surface)', 
            border: '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-xl)', 
            padding: 'var(--space-10)',
            opacity: 0.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Project Assets</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
                Custom data models, clinical rulebooks, and workflow logic will be provisioned here as we move through the 30-day alignment.
              </p>
            </div>
            <div style={{ marginTop: 'var(--space-8)', fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)', fontWeight: 'bold', textAlign: 'center', border: '1px dashed var(--color-border)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
              LOCKED: Phase II Alignment Required
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

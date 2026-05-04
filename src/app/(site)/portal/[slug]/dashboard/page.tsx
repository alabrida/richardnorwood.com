import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import Link from 'next/link'
import * as motion from 'framer-motion/client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return buildMetadata({
    title: `Dashboard | Root Impact Wellness`,
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
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    notFound()
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
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 'var(--space-16)', borderBottom: `1px solid ${brand.primary}33`, paddingBottom: 'var(--space-12)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', color: 'white', marginBottom: 'var(--space-2)' }}>
                Root Impact Wellness
              </h1>
              <p style={{ color: brand.primary, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 'var(--text-sm)' }}>
                Strategic Alignment Hub
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Partnership Status</div>
              <div style={{ 
                padding: '6px 12px', 
                borderRadius: 'var(--radius-md)', 
                background: 'rgba(32, 201, 151, 0.1)', 
                color: 'var(--color-accent)', 
                fontWeight: 'bold',
                border: '1px solid rgba(32, 201, 151, 0.2)',
                display: 'inline-block'
              }}>
                Active Alignment
              </div>
            </div>
          </div>
        </motion.header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)', marginBottom: 'var(--space-16)' }}>
          {/* PRIMARY CALL TO ACTION: THE AUDIT */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{ 
              background: 'var(--glass-bg-heavy)', 
              backdropFilter: 'blur(var(--glass-blur))',
              WebkitBackdropFilter: 'blur(var(--glass-blur))',
              border: `2px solid ${brand.primary}`, 
              borderRadius: 'var(--radius-xl)', 
              padding: 'var(--space-10)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: `0 20px 50px -12px ${brand.primary}33`
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: 'white' }}>Immediate Next Step</h3>
                {!isAuditComplete && (
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: brand.primary, boxShadow: `0 0 10px ${brand.primary}` }} />
                )}
              </div>
              <h4 style={{ color: 'white', marginBottom: 'var(--space-2)', fontWeight: 'bold' }}>Operational & Clinical Audit</h4>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
                To architect your revenue engine, we must first map the current friction. Complete the 25-question strategic diagnostic to finalize your baseline metrics.
              </p>
            </div>
            <Link 
              href={`/portal/${slug}/audit`}
              style={{ 
                display: 'block', 
                background: brand.primary, 
                color: 'black', 
                padding: 'var(--space-4) var(--space-8)', 
                borderRadius: 'var(--radius-full)', 
                fontWeight: 'bold',
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: `0 4px 14px ${brand.primary}44`,
                fontSize: 'var(--text-lg)'
              }}
            >
              {isAuditComplete ? 'Review Your Responses' : 'Start Strategic Audit →'}
            </Link>
          </motion.div>
          
          {/* THE PARTNERSHIP ROADMAP */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              background: 'var(--color-surface)', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-xl)', 
              padding: 'var(--space-10)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)', color: 'white' }}>Partnership Roadmap</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <li style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `1px solid ${brand.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: brand.primary }}>1</div>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>Diagnostic EKG (Current)</span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', opacity: 0.4 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>2</div>
                  <span style={{ color: 'var(--color-text-muted)' }}>Engine Orchestration</span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', opacity: 0.4 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>3</div>
                  <span style={{ color: 'var(--color-text-muted)' }}>Unified Commercial Launch</span>
                </li>
              </ul>
              <p style={{ color: 'var(--color-text-subtle)', marginTop: 'var(--space-8)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>
                Next Phase unlocks: Custom data models and clinical rulebooks.
              </p>
            </div>
            <div style={{ marginTop: 'var(--space-8)', fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)', fontWeight: 'bold', textAlign: 'center', border: '1px dashed var(--color-border)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
              Awaiting Audit Completion
            </div>
          </motion.div>
        </div>

        {/* SUPPORT / CONTACT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center', padding: 'var(--space-8)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}
        >
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            Need technical support with the portal? <a href="mailto:mail@alabrida.org" style={{ color: brand.primary, fontWeight: 'bold', textDecoration: 'none' }}>Contact the Architect</a>
          </p>
        </motion.div>
      </div>
    </main>
  )
}

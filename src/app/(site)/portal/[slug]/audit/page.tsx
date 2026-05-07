import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { notFound, redirect } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import MultiStepAuditForm from '@/components/forms/MultiStepAuditForm'
import { normalizeAuditResponses } from '@/lib/audit'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return buildMetadata({
    title: `Clinical Audit | ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
    description: 'Secure clinical and operational audit for active client work.',
    path: `/portal/${slug}/audit`,
    noIndex: true,
  })
}

export default async function AuditPage({ params }: { params: Promise<{ slug: string }> }) {
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

  const admin = createAdminClient()
  const { data: auditResponse } = admin
    ? await admin
        .from('audit_responses')
        .select('responses, is_submitted')
        .eq('client_id', profile.id)
        .maybeSingle()
    : { data: null }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: 'var(--space-32) var(--space-4) var(--space-20)' }}>
      <MultiStepAuditForm
        profile={profile}
        initialResponses={normalizeAuditResponses(auditResponse?.responses)}
        initialIsSubmitted={Boolean(auditResponse?.is_submitted)}
      />
    </main>
  )
}

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalContent from '@/components/sections/PortalContent'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Client Portal | Richard Norwood, PMP',
  description: 'Access your partnership dashboard, project assets, and communication channels.',
  path: '/portal',
  noIndex: true,
})

export default async function PortalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch client profile for logged-in user
  const { data: profile } = await supabase
    .from('client_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  // Auto-redirect to their specific dashboard if profile exists
  if (profile?.slug) {
    redirect(`/portal/${profile.slug}/dashboard`)
  }

  return <PortalContent user={user} profile={profile} />
}

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalContent from '@/components/sections/PortalContent'

export const metadata = {
  title: 'Client Portal - Richard Norwood, PMP',
  description: 'Access your partnership dashboard, project assets, and communication channels.',
}

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
    .single()

  return <PortalContent user={user} profile={profile} />
}

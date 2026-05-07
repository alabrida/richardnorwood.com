import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { normalizeUuid, readJsonObject, sanitizeJsonObject } from '@/lib/api/security'

export async function POST(req: Request) {
  try {
    const body = await readJsonObject(req)
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const clientId = normalizeUuid(body.client_id)
    const responses = sanitizeJsonObject(body.responses, 3000)
    const isSubmitted = body.is_submitted === true

    if (!clientId || !responses) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error: profileError } = await supabase
      .from('client_profiles')
      .select('id')
      .eq('id', clientId)
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const admin = createAdminClient()
    if (!admin) {
      console.error('Audit save misconfigured: Supabase admin client is unavailable')
      return NextResponse.json({ error: 'Database service is not configured' }, { status: 503 })
    }

    const updatedAt = new Date().toISOString()
    const { data: savedAudit, error: saveError } = await admin
      .from('audit_responses')
      .upsert({
        client_id: profile.id,
        responses,
        is_submitted: isSubmitted,
        updated_at: updatedAt,
      }, { onConflict: 'client_id' })
      .select('id, updated_at')
      .single()

    if (saveError || !savedAudit) {
      console.error('Audit save database write failed:', saveError)
      return NextResponse.json({ error: 'Failed to save audit' }, { status: 502 })
    }

    return NextResponse.json({ success: true, updated_at: savedAudit.updated_at || updatedAt })
  } catch (error) {
    console.error('Audit save error:', error)
    return NextResponse.json({ error: 'Failed to save audit' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { escapeHtml, normalizeUuid, readJsonObject, sanitizeJsonObject } from '@/lib/api/security'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await readJsonObject(req)
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const clientId = normalizeUuid(body.client_id)
    const responses = sanitizeJsonObject(body.responses, 3000)

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
      .select('id, slug, company_name')
      .eq('id', clientId)
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const safeCompanyName = escapeHtml(profile.company_name)
    const safeSlug = encodeURIComponent(profile.slug)

    const emailContent = `
      <h1>Audit Completed: ${safeCompanyName}</h1>
      <p>A new clinical and operational audit has been submitted.</p>
      
      <h2>Responses:</h2>
      <pre>${escapeHtml(JSON.stringify(responses, null, 2))}</pre>
      
      <p>View details in the portal: https://www.richardnorwood.com/portal/${safeSlug}/dashboard</p>
    `

    await resend.emails.send({
      from: 'System <notifications@richardnorwood.com>',
      to: 'mail@alabrida.org',
      subject: `Audit Completed: ${profile.company_name}`,
      html: emailContent
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}

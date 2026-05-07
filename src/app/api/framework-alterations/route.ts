import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { EMAIL_MONITOR_RECIPIENT, monitorBcc } from '@/lib/email/monitoring'
import { escapeHtml, normalizeText, normalizeUuid, readJsonObject } from '@/lib/api/security'

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('Framework alterations email misconfigured: RESEND_API_KEY is missing')
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 })
    }

    const body = await readJsonObject(request)
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const clientId = normalizeUuid(body.client_id)
    const message = normalizeText(body.message, 5000)

    if (!clientId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!user.email) {
      return NextResponse.json({ error: 'Authenticated user email is missing' }, { status: 400 })
    }

    const { data: profile, error: profileError } = await supabase
      .from('client_profiles')
      .select('id, company_name, contact_name')
      .eq('id', clientId)
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const safeCompanyName = escapeHtml(profile.company_name)
    const safeContactName = escapeHtml(profile.contact_name || 'Client')
    const safeUserEmail = escapeHtml(user.email)
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br />')
    const subject = `${profile.company_name} framework alterations`

    const resend = new Resend(resendApiKey)
    const { error } = await resend.batch.send([
      {
        from: 'System <notifications@richardnorwood.com>',
        to: EMAIL_MONITOR_RECIPIENT,
        subject,
        replyTo: user.email,
        text: [
          `${profile.company_name} framework alterations`,
          '',
          `Client contact: ${profile.contact_name || 'Client'}`,
          `Client email: ${user.email}`,
          '',
          message,
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111; line-height: 1.6;">
            <h1 style="margin-bottom: 8px;">Framework Alterations: ${safeCompanyName}</h1>
            <p style="margin-top: 0;">${safeContactName} submitted requested alterations to the first contractor framework draft.</p>
            <div style="background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <p style="margin: 0;"><strong>Client email:</strong> ${safeUserEmail}</p>
              <p style="margin: 16px 0 0;">${safeMessage}</p>
            </div>
          </div>
        `,
      },
      {
        from: 'Richard Norwood <notifications@richardnorwood.com>',
        to: user.email,
        bcc: monitorBcc(user.email),
        subject: `${profile.company_name} framework alterations received`,
        text: [
          `Thank you, ${profile.contact_name || 'Client'}.`,
          '',
          'Your requested alterations to the first contractor framework draft have been received.',
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111; line-height: 1.6;">
            <h1 style="margin-bottom: 8px;">Alterations Received</h1>
            <p style="margin-top: 0;">Thank you, ${safeContactName}. Your requested alterations to the first contractor framework draft have been received.</p>
          </div>
        `,
      },
    ])

    if (error) {
      console.error('Resend Error (framework alterations):', error)
      return NextResponse.json({ error: 'Failed to submit alterations' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Framework alterations error:', error)
    return NextResponse.json({ error: 'Failed to submit alterations' }, { status: 500 })
  }
}

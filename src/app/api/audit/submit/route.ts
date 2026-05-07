import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { escapeHtml, normalizeUuid, readJsonObject, sanitizeJsonObject } from '@/lib/api/security'
import { createAuditResponsesPdf } from '@/lib/audit-pdf'
import { EMAIL_MONITOR_RECIPIENT, monitorBcc } from '@/lib/email/monitoring'
import { siteUrl } from '@/lib/site'

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('Audit notification misconfigured: RESEND_API_KEY is missing')
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 })
    }

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

    if (!user.email) {
      return NextResponse.json({ error: 'Authenticated user email is missing' }, { status: 400 })
    }

    const { data: profile, error: profileError } = await supabase
      .from('client_profiles')
      .select('id, slug, company_name, contact_name')
      .eq('id', clientId)
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const admin = createAdminClient()
    if (!admin) {
      console.error('Audit submit misconfigured: Supabase admin client is unavailable')
      return NextResponse.json({ error: 'Database service is not configured' }, { status: 503 })
    }

    const { data: savedAudit, error: saveError } = await admin
      .from('audit_responses')
      .upsert({
        client_id: profile.id,
        responses,
        is_submitted: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'client_id' })
      .select('id')
      .single()

    if (saveError || !savedAudit) {
      console.error('Audit submit database save failed:', saveError)
      return NextResponse.json({ error: 'Failed to save audit before notification' }, { status: 502 })
    }

    const safeCompanyName = escapeHtml(profile.company_name)
    const safeContactName = escapeHtml(profile.contact_name || 'Client')
    const safeUserEmail = escapeHtml(user.email)
    const dashboardUrl = siteUrl(`/portal/${encodeURIComponent(profile.slug)}/dashboard`)
    const safeDashboardUrl = escapeHtml(dashboardUrl)
    const responseCount = Object.keys(responses).length
    const submittedAt = new Date()
    const pdfContent = createAuditResponsesPdf({
      companyName: profile.company_name,
      contactName: profile.contact_name || 'Client',
      submittedAt,
      responses,
    })
    const attachment = {
      filename: `${profile.slug}-audit-responses.pdf`,
      content: pdfContent,
      contentType: 'application/pdf',
    }
    const isRootImpactWellness = profile.slug === 'root-impact-wellness'
    const subject = isRootImpactWellness
      ? 'Root Impact Wellness audit completed'
      : `Audit Completed: ${profile.company_name}`

    const systemText = [
      `${profile.company_name} audit completed`,
      '',
      `Client contact: ${profile.contact_name || 'Client'}`,
      `Client email: ${user.email}`,
      `Response fields captured: ${responseCount}`,
      '',
      `Review the secure dashboard: ${dashboardUrl}`,
      '',
      'The submitted responses are attached as a PDF.',
    ].join('\n')

    const systemHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111; line-height: 1.6;">
        <h1 style="margin-bottom: 8px;">Audit Completed: ${safeCompanyName}</h1>
        <p style="margin-top: 0;">${safeContactName} submitted the clinical and operational audit.</p>

        <div style="background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 24px 0;">
          <p style="margin: 0;"><strong>Response fields captured:</strong> ${responseCount}</p>
          <p style="margin: 8px 0 0;"><strong>Client email:</strong> ${safeUserEmail}</p>
          <p style="margin: 8px 0 0; color: #555;">The full submitted responses are attached as a PDF.</p>
        </div>

        <a href="${safeDashboardUrl}" style="display: inline-block; background: #20c997; color: #06111f; padding: 12px 18px; border-radius: 6px; font-weight: bold; text-decoration: none;">
          Open Client Dashboard
        </a>
      </div>
    `

    const clientText = [
      `Thank you, ${profile.contact_name || 'Client'}.`,
      '',
      `Your ${profile.company_name} audit has been submitted successfully.`,
      `Response fields captured: ${responseCount}`,
      '',
      'A PDF copy of your submitted responses is attached for your records.',
      '',
      `You can review your secure dashboard here: ${dashboardUrl}`,
    ].join('\n')

    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111; line-height: 1.6;">
        <h1 style="margin-bottom: 8px;">Audit Submitted</h1>
        <p style="margin-top: 0;">Thank you, ${safeContactName}. Your ${safeCompanyName} audit has been submitted successfully.</p>

        <div style="background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 24px 0;">
          <p style="margin: 0;"><strong>Response fields captured:</strong> ${responseCount}</p>
          <p style="margin: 8px 0 0; color: #555;">A PDF copy of your submitted responses is attached for your records.</p>
        </div>

        <a href="${safeDashboardUrl}" style="display: inline-block; background: #20c997; color: #06111f; padding: 12px 18px; border-radius: 6px; font-weight: bold; text-decoration: none;">
          Open Secure Dashboard
        </a>
      </div>
    `

    const resend = new Resend(resendApiKey)
    const { error } = await resend.batch.send([
      {
        from: 'System <notifications@richardnorwood.com>',
        to: EMAIL_MONITOR_RECIPIENT,
        subject,
        replyTo: user.email,
        text: systemText,
        html: systemHtml,
        attachments: [attachment],
      },
      {
        from: 'Richard Norwood <notifications@richardnorwood.com>',
        to: user.email,
        bcc: monitorBcc(user.email),
        subject: `${profile.company_name} audit submission confirmation`,
        text: clientText,
        html: clientHtml,
        attachments: [attachment],
      },
    ])

    if (error) {
      console.error('Resend Error (audit notification):', error)
      return NextResponse.json({ success: true, notification_sent: false })
    }

    return NextResponse.json({ success: true, notification_sent: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}

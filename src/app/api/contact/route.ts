import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { normalizeEmail, normalizeOptionalText, normalizeText, normalizeUrl, readJsonObject } from '@/lib/api/security'

export async function POST(request: Request) {
  try {
    const body = await readJsonObject(request)
    if (!body) {
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
    }

    const data = {
      name: normalizeText(body.name, 160),
      email: normalizeEmail(body.email),
      company: normalizeOptionalText(body.company, 200),
      inquiryType: normalizeOptionalText(body.inquiryType, 80),
      website: normalizeUrl(body.website),
      message: normalizeOptionalText(body.message, 3000),
    }

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ success: false, error: 'Name, valid email, and message are required' }, { status: 400 })
    }

    // 1. Store in Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('website_leads')
      .insert([{
        full_name: data.name,
        email: data.email,
        business_url: data.website,
        message: data.message,
        source: 'contact_form'
      }])

    if (dbError) {
      console.error('Supabase Error (website_leads):', dbError)
    }

    // 2. Dispatch to n8n
    const webhookUrl = process.env.N8N_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('Missing N8N_WEBHOOK_URL configuration')
      // Degrade gracefully if not configured
      return NextResponse.json({ success: true, message: 'Simulated success (Missing Webhook)' })
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        receivedAt: new Date().toISOString(),
        source: 'contact_form'
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to dispatch webhook')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}

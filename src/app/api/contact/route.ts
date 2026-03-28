import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // The webhook URL is stored securely in environment variables
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

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // 1. Store in Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('website_leads')
      .insert([{
        email,
        source: 'blueprint_download',
        message: 'Lead requested the 5-Stage Revenue Journey Blueprint PDF.'
      }])

    if (dbError) {
      console.error('Supabase Error (blueprint):', dbError)
    }

    // 2. Dispatch to n8n (Optional - same as contact form but different source)
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'blueprint', receivedAt: new Date().toISOString() }),
      }).catch(e => console.error('N8N Error (blueprint):', e))
    }

    // Return the actual PDF link (or a redirect instruction)
    return NextResponse.json({ 
      success: true, 
      downloadUrl: 'https://drive.google.com/file/d/1Xy8XJq-XU8-placeholder/view?usp=sharing' 
    })
  } catch (error) {
    console.error('Blueprint error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

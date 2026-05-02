import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Upsert into website_leads to ensure UUID tracking
    const { data: leadData, error: leadError } = await supabase
      .from('website_leads')
      .upsert([{ 
        email, 
        source: 'newsletter',
        message: 'Subscribed to newsletter' 
      }], { onConflict: 'email' })
      .select('id')
      .single()

    if (leadError) {
      console.error('Lead tracking error:', leadError)
    }

    // Also keep the simple newsletter table for easy list management
    const { error } = await supabase
      .from('newsletter_signups')
      .insert([{ email }])

    if (error && error.code !== '23505') { // Ignore duplicate signups
      throw error
    }

    return NextResponse.json({ 
      success: true, 
      leadId: leadData?.id 
    })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

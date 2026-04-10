import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, tier, answers } = body;

    if (!email || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Update onboarding record
    const { error: dbError } = await supabase
      .from('consulting_onboarding')
      .update({
        discovery_answers: answers,
        status: 'pending_dashboard',
        updated_at: new Date().toISOString(),
      })
      .eq('email', email);

    if (dbError) {
      console.error('Supabase Update Error:', dbError);
    }

    // 2. Signal n8n for Convergence (Apify + User Discovery)
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'discovery_complete', email, tier, answers }),
      }).catch(err => console.error('n8n Webhook Failed:', err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Discovery Route Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, websiteUrl, tier } = body;

    if (!email || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Upsert into consulting_onboarding table
    const { error: dbError } = await supabase
      .from('consulting_onboarding')
      .upsert({
        email,
        name,
        company,
        website_url: websiteUrl,
        selected_tier: tier,
        status: 'pending_apify',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });

    if (dbError) {
      console.error('Supabase Error:', dbError);
    }

    // 2. Trigger Apify Actor (Mocked)
    const apifyToken = process.env.APIFY_TOKEN;
    const actorId = 'richardnorwood~revenue-journey-scraper';

    if (apifyToken && actorId) {
      fetch(`https://api.apify.com/v2/actor-tasks/${actorId}/runs?token=${apifyToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: websiteUrl, email }),
      }).catch(err => console.error('Apify Trigger Failed:', err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Intake Route Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

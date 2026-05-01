import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, responses } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Determine Maturity Category based on responses
    let category = 'Emerging';
    let recommendations = 'Focus on building foundational visibility and capturing first-layer signals.';
    
    if (responses.q5.includes('Scale')) {
      category = 'Scale';
      recommendations = 'Focus on stack rationalization, sovereign data models, and automated feedback loops to maintain independent growth.';
    } else if (responses.q5.includes('Orchestrating')) {
      category = 'Orchestrating';
      recommendations = 'Focus on cross-team alignment and automating signal capture across the middle-of-funnel touchpoints.';
    }

    // 1. Store in Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from('health_checks')
      .insert([{ 
        email, 
        responses, 
        category 
      }]);

    if (dbError) {
      console.error('Supabase Error (health_checks):', dbError);
    }

    // 2. Deliver the email
    const { data, error } = await resend.emails.send({
      from: 'Richard Norwood <richard@richardnorwood.com>',
      to: [email],
      subject: 'Your Revenue Health Check Report',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111; line-height: 1.6;">
          <div style="border-bottom: 2px solid #20c997; padding-bottom: 10px; margin-bottom: 30px;">
            <h1 style="color: #111; margin: 0; font-size: 24px;">Revenue Health Check Report</h1>
            <p style="color: #666; margin: 5px 0 0;">Prepared for ${email}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="margin-top: 0; font-size: 18px; color: #f0b429;">Maturity Category: ${category}</h2>
            <p style="margin-bottom: 0;">Based on your responses, your commercial system is currently in the <strong>${category}</strong> stage.</p>
          </div>

          <h3 style="font-size: 16px; margin-bottom: 10px;">Strategic Recommendations:</h3>
          <p style="margin-bottom: 30px;">${recommendations}</p>

          <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; font-size: 16px;">Next Step: The Full 22-Point Diagnostic</h3>
            <p style="font-size: 14px; color: #444;">This health check is a pre-qualifier for my proprietary structural assessment. To see your specific scores across all 22 checkpoints and identify exactly where your revenue is leaking, let's review these results together.</p>
            <a href="https://richardnorwood.com/contact" style="display: inline-block; background: #f0b429; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 10px;">Book a Diagnostic Review</a>
          </div>

          <p style="font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px;">
            Richard Norwood, PMP — Revenue Architect<br />
            Helping leaders transition from fragmented growth to orchestrated systems.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error('API Error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

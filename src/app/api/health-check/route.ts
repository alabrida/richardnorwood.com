import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml, normalizeEmail, readJsonObject, sanitizeJsonObject } from '@/lib/api/security';
import { siteUrl } from '@/lib/site';
import { createAdminClient } from '@/lib/supabase/admin';

const HEALTH_CHECK_OPTIONS = {
  q1: ['0-5 Hours', '5-15 Hours', '15+ Hours (Critical Leak)'],
  q2: ['Yes', 'Partially, but fragmented', 'No, strictly isolated tools'],
  q3: ['First/Last touch deterministic accuracy', 'Rough heuristics and guesswork', 'No systematic attribution'],
  q4: ['Fully sovereign (Own DB/Cloud)', 'Slightly entangled', 'Totally locked into third-party vendors'],
  q5: ['$0 - $1MM (Emerging)', '$1MM - $5MM (Orchestrating)', '$5MM+ (Scale)'],
} as const;

type HealthCheckQuestionId = keyof typeof HEALTH_CHECK_OPTIONS;
type HealthCheckResponses = Record<HealthCheckQuestionId, string>;

function validateResponses(responses: Record<string, string | number | boolean | null>) {
  const validated = {} as HealthCheckResponses;

  for (const [questionId, options] of Object.entries(HEALTH_CHECK_OPTIONS) as Array<[HealthCheckQuestionId, readonly string[]]>) {
    const answer = responses[questionId];
    if (typeof answer !== 'string' || !options.includes(answer)) {
      return null;
    }
    validated[questionId] = answer;
  }

  return validated;
}

function getMaturityCategory(responses: HealthCheckResponses) {
  if (responses.q5.includes('Scale')) {
    return {
      category: 'Scale',
      recommendations: 'Focus on stack rationalization, sovereign data models, and automated feedback loops to maintain independent growth.',
    };
  }

  if (responses.q5.includes('Orchestrating')) {
    return {
      category: 'Orchestrating',
      recommendations: 'Focus on cross-team alignment and automating signal capture across the middle-of-funnel touchpoints.',
    };
  }

  return {
    category: 'Emerging',
    recommendations: 'Focus on building foundational visibility and capturing first-layer signals.',
  };
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('Health check email misconfigured: RESEND_API_KEY is missing');
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 });
    }

    const body = await readJsonObject(request);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const email = normalizeEmail(body.email);
    const sanitizedResponses = sanitizeJsonObject(body.responses);
    if (!email) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!sanitizedResponses) {
      return NextResponse.json({ error: 'Responses are required' }, { status: 400 });
    }

    const responses = validateResponses(sanitizedResponses);
    if (!responses) {
      return NextResponse.json({ error: 'Health check responses are incomplete or invalid' }, { status: 400 });
    }

    const { category, recommendations } = getMaturityCategory(responses);

    // 1. Store in Supabase and get the UUID
    const supabase = createAdminClient();
    if (!supabase) {
      console.error('Health check persistence misconfigured: Supabase admin credentials are missing');
      return NextResponse.json({ error: 'Lead storage is not configured' }, { status: 503 });
    }

    const { data: dbData, error: dbError } = await supabase
      .from('health_checks')
      .insert([{ 
        email, 
        responses, 
        category 
      }])
      .select('id')
      .single();

    if (dbError) {
      console.error('Supabase Error (health_checks):', dbError);
      return NextResponse.json({ error: 'Unable to save health check' }, { status: 502 });
    }

    if (!dbData?.id) {
      console.error('Supabase Error (health_checks): insert succeeded without an id');
      return NextResponse.json({ error: 'Unable to save health check' }, { status: 502 });
    }

    const resend = new Resend(resendApiKey);
    const leadUuid = dbData.id;
    const safeEmail = escapeHtml(email);
    const safeCategory = escapeHtml(category);
    const safeRecommendations = escapeHtml(recommendations);
    const calendarUrl = `https://calendar.google.com/calendar/u/0/appointments/schedules?email=${encodeURIComponent(email)}`;
    const purchaseUrl = `${siteUrl('/purchase/audit')}?id=${encodeURIComponent(leadUuid)}&email=${encodeURIComponent(email)}`;
    const clearanceUrl = siteUrl('/api/clearance');
    const safeCalendarUrl = escapeHtml(calendarUrl);
    const safePurchaseUrl = escapeHtml(purchaseUrl);
    const safeClearanceUrl = escapeHtml(clearanceUrl);
    const safeLeadUuid = escapeHtml(leadUuid);
    const text = [
      'Revenue Health Check: Preliminary Results',
      '',
      `Prepared for ${email}`,
      `Maturity Category: ${category}`,
      '',
      'Strategic Direction:',
      recommendations,
      '',
      `Book your free review: ${calendarUrl}`,
      `Get instant access: ${purchaseUrl}`,
      '',
      'Richard Norwood, PMP - Revenue Architect',
    ].join('\n');

    // 2. Deliver the email with embedded form and tiered CTAs
    const { data, error } = await resend.emails.send({
      from: 'Richard Norwood <richard@richardnorwood.com>',
      to: [email],
      subject: 'Your Revenue Health Check Report & Next Steps',
      text,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111; line-height: 1.6;">
          <div style="border-bottom: 2px solid #20c997; padding-bottom: 10px; margin-bottom: 30px;">
            <h1 style="color: #111; margin: 0; font-size: 24px;">Revenue Health Check: Preliminary Results</h1>
            <p style="color: #666; margin: 5px 0 0;">Prepared for ${safeEmail}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="margin-top: 0; font-size: 18px; color: #f0b429;">Maturity Category: ${safeCategory}</h2>
            <p style="margin-bottom: 0;">Based on your current signals, your business is operating in the <strong>${safeCategory}</strong> stage.</p>
          </div>

          <h3 style="font-size: 16px; margin-bottom: 10px;">Strategic Direction:</h3>
          <p style="margin-bottom: 30px;">${safeRecommendations}</p>

          <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; font-size: 18px;">Unlock Your Full 22-Point Structural Audit</h3>
            <p style="font-size: 14px; color: #444;">We have established a preliminary overview, but the detailed structural review requires a deeper look. You have two options to receive your comprehensive 22-point diagnostic report and access your secure client portal:</p>
            
            <div style="margin-top: 20px; margin-bottom: 20px;">
              <strong>Option 1: Guided Discovery (Free)</strong><br/>
              Book a 20-minute strategic review. We will go over your custom audit results live on the call.
              <br/><br/>
              <a href="${safeCalendarUrl}" style="display: inline-block; background: #f0b429; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Book Free Review</a>
            </div>

            <div style="border-top: 1px solid #eee; padding-top: 20px;">
              <strong>Option 2: Instant Access ($497)</strong><br/>
              Skip the call. Receive your full structural map and results instantly. 
              <br/><em style="font-size: 12px; color: #666;">Note: Completion of the security clearance below is required for accurate results.</em>
              <br/><br/>
              <a href="${safePurchaseUrl}" style="display: inline-block; background: #20c997; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Get Results Instantly</a>
            </div>
          </div>

          <div style="background: #0f1a2e; color: #e8edf5; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; font-size: 18px; color: #f0b429;">Step 1: Security Clearance</h3>
            <p style="font-size: 13px; color: #8899b4; margin-bottom: 20px;">Please complete this brief clearance to align our technical findings with your business goals.</p>
            
            <form action="${safeClearanceUrl}" method="POST">
              <input type="hidden" name="lead_id" value="${safeLeadUuid}" />
              <input type="hidden" name="email" value="${safeEmail}" />
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: 12px; text-transform: uppercase; color: #8899b4; margin-bottom: 5px;">Primary Revenue Bottleneck</label>
                <textarea name="bottleneck" required rows="2" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #2a3a5a; background: #0a1628; color: #fff; font-family: sans-serif; box-sizing: border-box;" placeholder="Where is the system leaking?"></textarea>
              </div>

              <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: 12px; text-transform: uppercase; color: #8899b4; margin-bottom: 5px;">Infrastructure Sovereignty</label>
                <select name="owns_paths" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #2a3a5a; background: #0a1628; color: #fff; font-family: sans-serif; box-sizing: border-box;">
                  <option value="sovereign">We own our data & discovery paths</option>
                  <option value="platform_dependent">Dependent on 3rd party algorithms/ads</option>
                  <option value="locked_in">Totally locked into proprietary vendor stacks</option>
                </select>
              </div>

              <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: 12px; text-transform: uppercase; color: #8899b4; margin-bottom: 5px;">Buyer Validation</label>
                <select name="validate_fit" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #2a3a5a; background: #0a1628; color: #fff; font-family: sans-serif; box-sizing: border-box;">
                  <option value="self_serve">Buyers can validate fit without talking to us</option>
                  <option value="human_required">Requires human intervention for basic fit</option>
                </select>
              </div>

              <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: 12px; text-transform: uppercase; color: #8899b4; margin-bottom: 5px;">Current Tech Stack / CRM</label>
                <input type="text" name="systems" required placeholder="e.g. HubSpot, Salesforce, Custom..." style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #2a3a5a; background: #0a1628; color: #fff; font-family: sans-serif; box-sizing: border-box;" />
              </div>

              <button type="submit" style="background: #f0b429; color: #000; border: none; padding: 12px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; width: 100%;">Submit & Finalize Results</button>
            </form>
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
      return NextResponse.json({ error: 'Unable to send health check email' }, { status: 502 });
    }

    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error('API Error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

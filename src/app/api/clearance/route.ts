import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { normalizeEmail, normalizeOptionalText, normalizeUuid } from '@/lib/api/security';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const leadId = normalizeUuid(formData.get('lead_id'));
    const email = normalizeEmail(formData.get('email'));
    const bottleneck = normalizeOptionalText(formData.get('bottleneck'), 2000);
    const systems = normalizeOptionalText(formData.get('systems'), 1000);
    const ownsPaths = normalizeOptionalText(formData.get('owns_paths'), 80);
    const validateFit = normalizeOptionalText(formData.get('validate_fit'), 80);

    if (!leadId || !email) {
      return NextResponse.json({ error: 'Missing Lead ID' }, { status: 400 });
    }

    const supabase = await createClient();

    // Update the health_checks row with clearance data
    const { error } = await supabase
      .from('health_checks')
      .update({
        clearance_data: { 
          bottleneck, 
          systems,
          owns_paths: ownsPaths,
          validate_fit: validateFit
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId)
      .eq('email', email);

    if (error) {
      console.error('Supabase Error (clearance):', error);
      // Even if DB fails, we want to provide a good UX to the user
    }

    // Redirect to a success page on the website
    const successUrl = new URL('/clearance/success', request.url);
    successUrl.searchParams.set('email', email);
    
    return NextResponse.redirect(successUrl, 303);
  } catch (e) {
    console.error('Clearance API Error:', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const leadId = formData.get('lead_id') as string;
    const email = formData.get('email') as string;
    const bottleneck = formData.get('bottleneck') as string;
    const systems = formData.get('systems') as string;
    const ownsPaths = formData.get('owns_paths') as string;
    const validateFit = formData.get('validate_fit') as string;

    if (!leadId) {
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
      .eq('id', leadId);

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

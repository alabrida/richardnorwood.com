import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isRecord, normalizeText, normalizeUuid, readJsonObject } from '@/lib/api/security';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API = process.env.PAYPAL_ENVIRONMENT === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

/**
 * Generate an OAuth 2.0 access token for PayPal
 */
async function generateAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('MISSING_PAYPAL_CREDENTIALS');
  }
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64');
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok || typeof data.access_token !== 'string') {
    throw new Error('PAYPAL_TOKEN_REQUEST_FAILED');
  }

  return data.access_token;
}

function firstPurchaseUnit(data: Record<string, unknown>) {
  return Array.isArray(data.purchase_units) && isRecord(data.purchase_units[0])
    ? data.purchase_units[0]
    : null;
}

function getCapturedReferenceId(data: Record<string, unknown>) {
  const purchaseUnit = firstPurchaseUnit(data);
  return typeof purchaseUnit?.reference_id === 'string' ? purchaseUnit.reference_id : undefined;
}

function firstCapture(data: Record<string, unknown>) {
  const purchaseUnit = firstPurchaseUnit(data);
  if (!purchaseUnit || !isRecord(purchaseUnit.payments)) return null;
  return Array.isArray(purchaseUnit.payments.captures) && isRecord(purchaseUnit.payments.captures[0])
    ? purchaseUnit.payments.captures[0]
    : null;
}

function isExpectedCapture(data: Record<string, unknown>, leadId: string) {
  const capture = firstCapture(data);
  const amount = isRecord(capture?.amount) ? capture.amount : null;
  return data.status === 'COMPLETED'
    && getCapturedReferenceId(data) === leadId
    && capture?.status === 'COMPLETED'
    && amount?.currency_code === 'USD'
    && amount?.value === '497.00';
}

/**
 * Create a PayPal Order
 */
export async function POST(request: Request) {
  try {
    const body = await readJsonObject(request);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const lead_id = normalizeUuid(body.lead_id);
    if (!lead_id) {
      return NextResponse.json({ error: 'Valid lead ID is required' }, { status: 400 });
    }

    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_API}/v2/checkout/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: lead_id,
            amount: {
              currency_code: 'USD',
              value: '497.00',
            },
            description: 'Instant 22-Point Structural Revenue Audit',
          },
        ],
      }),
    });

    const data = await response.json() as Record<string, unknown>;
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 502 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('PayPal Order Creation Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

/**
 * Capture a PayPal Order
 */
export async function PATCH(request: Request) {
  try {
    const body = await readJsonObject(request);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const orderID = normalizeText(body.orderID, 128);
    const lead_id = normalizeUuid(body.lead_id);

    if (!orderID || !lead_id || !/^[A-Z0-9-]+$/i.test(orderID)) {
      return NextResponse.json({ error: 'Valid order and lead IDs are required' }, { status: 400 });
    }

    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json() as Record<string, unknown>;
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to capture order' }, { status: 502 });
    }

    if (data.status === 'COMPLETED') {
      if (!isExpectedCapture(data, lead_id)) {
        console.error('PayPal capture validation failed:', {
          orderID,
          lead_id,
          reference_id: getCapturedReferenceId(data),
          status: data.status,
        });
        return NextResponse.json({ error: 'Payment validation failed' }, { status: 400 });
      }

      const supabase = await createClient();
      
      // 1. Mark as paid in Supabase
      const { error: dbError } = await supabase
        .from('health_checks')
        .update({ 
          payment_status: 'paid',
          payment_id: orderID,
          updated_at: new Date().toISOString()
        })
        .eq('id', lead_id);

      if (dbError) {
        console.error('Supabase Payment Update Error:', dbError);
      }

      // 2. Trigger n8n for Provisioning
      const n8nUrl = process.env.N8N_WEBHOOK_URL;
      if (n8nUrl) {
        fetch(n8nUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            event: 'payment_confirmed', 
            lead_id, 
            order_id: orderID,
            product: 'instant_audit' 
          }),
        }).catch(err => console.error('n8n Provisioning Trigger Failed:', err));
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('PayPal Order Capture Error:', error);
    return NextResponse.json({ error: 'Failed to capture order' }, { status: 500 });
  }
}

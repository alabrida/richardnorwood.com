import { NextResponse } from 'next/server';

export function GET() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim();
  const environment = process.env.PAYPAL_ENVIRONMENT === 'production' ? 'production' : 'sandbox';

  if (!clientId) {
    return NextResponse.json(
      { error: 'Missing PayPal client ID' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    clientId,
    environment,
  });
}

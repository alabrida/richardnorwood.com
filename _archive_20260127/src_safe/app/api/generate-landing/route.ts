import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // Mock generation
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: system-ui, sans-serif; padding: 40px; text-align: center; color: #1e293b; }
          h1 { color: #0f172a; font-size: 3rem; margin-bottom: 20px; }
          p { font-size: 1.25rem; color: #64748b; max-width: 600px; margin: 0 auto 40px; }
          .cta { background: #ff6600; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; }
        </style>
      </head>
      <body>
        <h1>Maximize Your Revenue Potential</h1>
        <p>Stop losing leads to friction. Our automated engine captures and converts your traffic efficiently.</p>
        <a href="#" class="cta">Start Your Free Trial</a>
      </body>
    </html>
  `;

    return NextResponse.json({ html });
}

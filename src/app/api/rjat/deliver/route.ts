
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        // Retrieve n8n webhook URL from environment variables
        const n8nUrl = process.env.NEXT_PUBLIC_N8N_RJAT_WEBHOOK;

        if (!n8nUrl) {
            console.error("Missing NEXT_PUBLIC_N8N_RJAT_WEBHOOK env variable");
            // Fallback for dev/demo if webhook not set
            return NextResponse.json({ success: true, mocked: true });
        }

        // Forward to n8n
        const webhookResponse = await fetch(n8nUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                source: "rjat_squeeze_page",
                timestamp: new Date().toISOString()
            }),
        });

        if (!webhookResponse.ok) {
            throw new Error(`n8n responded with ${webhookResponse.status}`);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Email delivery failed:", error);
        return NextResponse.json(
            { success: false, error: "Failed to deliver report" },
            { status: 500 }
        );
    }
}

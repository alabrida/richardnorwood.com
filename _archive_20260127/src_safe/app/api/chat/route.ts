import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { message } = await req.json();

    // Mock Gemini integration
    // In production: const response = await gemini.generateContent(message);

    const mockResponse = `That's a great question about ${message}. Based on your Revenue Journey Assessment, your biggest bottleneck is in the Consideration stage. I recommend focusing on automated nurture sequences using the content value ladder we discussed.`;

    return NextResponse.json({ message: mockResponse });
}

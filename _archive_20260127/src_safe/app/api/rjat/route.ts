import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Mock processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
        jobId: '12345',
        status: 'processing'
    });
}

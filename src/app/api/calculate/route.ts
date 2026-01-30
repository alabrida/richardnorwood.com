
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { answers, score } = body;

        // In a real implementation:
        // 1. Validate 'answers' against the Rubric
        // 2. Log to Database/Supabase
        // 3. Perhaps trigger a notification

        // Recalculate server-side to prevent spoofing if needed
        const calculatedScore = Object.values(answers as Record<string, number>).reduce((a: number, b: number) => a + b, 0);

        let redirectUrl = "/services"; // Default (Tier 1)

        if (calculatedScore >= 9 && calculatedScore <= 11) {
            redirectUrl = "/rjat"; // Tier 2
        } else if (calculatedScore >= 12) {
            redirectUrl = "/contact"; // Tier 3
        }

        return NextResponse.json({
            success: true,
            score: calculatedScore,
            redirectUrl
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: "Calculation failed" }, { status: 500 });
    }
}

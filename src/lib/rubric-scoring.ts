/**
 * Revenue Journey Rubric Scoring Logic
 * Source: docs/Revenue-Journey-Rubric-Master.md
 * 
 * This utility encapsulates the business logic for interpreting raw assessment scores.
 * It is stateless and runs O(1), making it highly scalable.
 */

export type RevenueStatus = 'Fragmented' | 'Emerging' | 'Orchestrated' | 'Unified';

export const MAX_SCORE = 100;
export const MAX_STAGE_SCORE = 20;

export interface AssessmentResult {
    score_total: number;
    score_awareness: number;
    score_consideration: number;
    score_decision: number;
    score_conversion: number;
    score_retention: number;
}

export function calculateStatus(score: number): RevenueStatus {
    if (score >= 81) return 'Unified';
    if (score >= 61) return 'Orchestrated';
    if (score >= 41) return 'Emerging';
    return 'Fragmented';
}

export function getStatusDescription(status: RevenueStatus): string {
    switch (status) {
        case 'Unified': return 'Unified Commercial Engine';
        case 'Orchestrated': return 'Performing in harmony across platforms';
        case 'Emerging': return 'Revealing the first indicators of cohesion';
        case 'Fragmented': return 'Isolated musicians who have never practiced together';
    }
}

export function getStageColor(score: number): string {
    // Relative to Stage Max (20)
    const percentage = (score / MAX_STAGE_SCORE) * 100;
    if (percentage >= 80) return 'text-purple-400'; // Unified
    if (percentage >= 60) return 'text-blue-400';   // Orchestrated
    if (percentage >= 40) return 'text-yellow-400'; // Emerging
    return 'text-red-400';                          // Fragmented
}

export function identifyGaps(assessment: AssessmentResult) {
    const stages = [
        { name: 'Awareness', score: assessment.score_awareness },
        { name: 'Consideration', score: assessment.score_consideration },
        { name: 'Decision', score: assessment.score_decision },
        { name: 'Conversion', score: assessment.score_conversion },
        { name: 'Retention', score: assessment.score_retention },
    ];

    // Sort by lowest score first
    return stages.sort((a, b) => a.score - b.score).slice(0, 3);
}

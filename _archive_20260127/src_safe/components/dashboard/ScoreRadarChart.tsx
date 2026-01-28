'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

interface ScoreData {
    stage: string;
    score: number;
    fullMark: number;
}

interface ScoreRadarChartProps {
    data: ScoreData[];
}

export function ScoreRadarChart({ data }: ScoreRadarChartProps) {
    // Determine color based on average score
    const avgScore = data.reduce((a, b) => a + b.score, 0) / data.length;
    let strokeColor = 'var(--color-primary)';
    let fillColor = 'var(--color-primary)';

    if (avgScore < 1.5) {
        strokeColor = 'var(--color-error)';
        fillColor = 'var(--color-error)';
    } else if (avgScore < 2.5) {
        strokeColor = 'var(--color-warning)';
        fillColor = 'var(--color-warning)';
    } else {
        strokeColor = 'var(--color-success)';
        fillColor = 'var(--color-success)';
    }

    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="var(--color-border)" />
                    <PolarAngleAxis
                        dataKey="stage"
                        tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 3]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Revenue Engine"
                        dataKey="score"
                        stroke={strokeColor}
                        strokeWidth={3}
                        fill={fillColor}
                        fillOpacity={0.3}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

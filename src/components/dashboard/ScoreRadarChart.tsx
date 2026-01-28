"use client";

import { motion } from "motion/react";

interface StageScore {
    stage: string;
    score: number; // 0-100
    fullMark: number;
}

interface ScoreRadarProps {
    data: StageScore[];
}

// Simple Pentagon Radar Chart using SVG
export function ScoreRadarChart({ data }: ScoreRadarProps) {
    const size = 300;
    const center = size / 2;
    const radius = 100;

    // Calculate points for the pentagon axis
    const axisPoints = data.map((_, i) => {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        return {
            x: center + radius * Math.cos(angle),
            y: center + radius * Math.sin(angle),
            labelX: center + (radius + 30) * Math.cos(angle),
            labelY: center + (radius + 20) * Math.sin(angle),
        };
    });

    // Calculate points for the data polygon
    const dataPoints = data.map((d, i) => {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        const valueRatio = d.score / 100;
        return {
            x: center + (radius * valueRatio) * Math.cos(angle),
            y: center + (radius * valueRatio) * Math.sin(angle),
        };
    });

    const pointsString = dataPoints.map(p => `${p.x},${p.y}`).join(" ");

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <svg width={size} height={size} className="overflow-visible">
                {/* Background Webs */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <polygon
                        key={i}
                        points={data.map((_, j) => {
                            const angle = (Math.PI * 2 * j) / data.length - Math.PI / 2;
                            return `${center + (radius * scale) * Math.cos(angle)},${center + (radius * scale) * Math.sin(angle)}`;
                        }).join(" ")}
                        fill="transparent"
                        stroke="#27272a" // zinc-800
                        strokeWidth="1"
                    />
                ))}

                {/* Axes */}
                {axisPoints.map((p, i) => (
                    <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#27272a" strokeWidth="1" />
                ))}

                {/* Data Polygon */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    points={pointsString}
                    fill="#f97316" // orange-500
                    fillOpacity="0.3"
                    stroke="#f97316"
                    strokeWidth="2"
                />

                {/* Data Points */}
                {dataPoints.map((p, i) => (
                    <motion.circle
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#f97316"
                        stroke="#fff"
                        strokeWidth="2"
                    />
                ))}

                {/* Labels */}
                {data.map((d, i) => (
                    <text
                        key={i}
                        x={axisPoints[i].labelX}
                        y={axisPoints[i].labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[10px] font-medium fill-zinc-400 uppercase tracking-wider"
                    >
                        {d.stage}
                    </text>
                ))}
            </svg>
        </div>
    );
}

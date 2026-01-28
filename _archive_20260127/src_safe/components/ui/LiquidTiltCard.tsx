'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent, useRef } from 'react';

interface LiquidTiltCardProps {
    children: React.ReactNode;
    className?: string;
    neonColor?: string; // Hex or CSS var for the glow color
}

export function LiquidTiltCard({ children, className = "", neonColor = "var(--color-primary)" }: LiquidTiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the mouse movement for the tilt
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Tilt transforms
    // We want a subtle tilt, so limits are low (e.g., +/- 5 degrees)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate normalized position (-0.5 to 0.5) for tilt
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Spotlight / Liquid Light Effect
    // We use a CSS variable patterned generic gradient that follows the mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
        handleMouseMove({ clientX, clientY } as any); // Forward to tilt handler
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative group rounded-[var(--radius-xl)] ${className}`}
        >
            {/* 1. liquid rim / border glow */}
            <motion.div
                className="absolute -inset-px rounded-[var(--radius-xl)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${neonColor},
              transparent 80%
            )
          `,
                }}
            />

            {/* 2. Card Background (Masks the border glow to create the rim) */}
            {/* 2. Card Background (Masks the border glow to create the rim) */}
            <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-[var(--color-card)] overflow-hidden">
                {/* 3. Surface sheen / spotlight inside the card */}
                <motion.div
                    className="absolute -inset-px rounded-[var(--radius-xl)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.06),
                transparent 80%
              )
            `,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative h-full z-10">
                {children}
            </div>
        </motion.div>
    );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface KineticTypographyProps {
    text: string;
    className?: string;
    as?: React.ElementType;
}

export function KineticTypography({ text, className, as: Component = "h1" }: KineticTypographyProps) {
    const words = text.split(" ");
    const shouldReduceMotion = useReducedMotion();

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.05,
                delayChildren: shouldReduceMotion ? 0 : 0.04 * i
            },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
                duration: shouldReduceMotion ? 0 : undefined
            },
        },
        hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
                duration: shouldReduceMotion ? 0 : undefined
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={cn("flex flex-wrap", className)}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="mr-[0.2em] inline-block whitespace-nowrap"
                    style={{ marginRight: index === words.length - 1 ? 0 : "0.25em" }}
                >
                    {word.split("").map((character, index) => (
                        <motion.span
                            key={index}
                            variants={child}
                            className="inline-block"
                        >
                            {character}
                        </motion.span>
                    ))}
                </motion.span>
            ))}
        </motion.div>
    );
}

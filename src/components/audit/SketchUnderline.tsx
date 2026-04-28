"use client";

import { motion } from "framer-motion";

type Props = {
  delay?: number;
  duration?: number;
  thickness?: number;
  className?: string;
};

export function SketchUnderline({
  delay = 0,
  duration = 0.9,
  thickness = 2.5,
  className = "",
}: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className={`absolute left-0 right-0 -bottom-1 w-full pointer-events-none ${className}`}
      style={{ height: "0.6em" }}
    >
      <motion.path
        d="M2 7 C 30 3, 60 10, 100 6 S 170 3, 198 7"
        fill="none"
        stroke="var(--color-accent-coral)"
        strokeWidth={thickness}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.6 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

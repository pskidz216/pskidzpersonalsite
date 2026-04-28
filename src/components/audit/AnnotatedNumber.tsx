"use client";

import { motion } from "framer-motion";

export function AnnotatedNumber({
  index,
  delay = 0,
}: {
  index: number;
  delay?: number;
}) {
  const label = String(index).padStart(2, "0");

  return (
    <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 group">
      <svg
        viewBox="0 0 80 80"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        {/* Hand-drawn coral circle (slightly irregular) */}
        <motion.path
          d="M 40 8 C 56 8, 72 22, 72 40 C 72 58, 58 72, 40 72 C 22 72, 8 58, 8 40 C 8 22, 24 8, 40 8 Z"
          fill="none"
          stroke="var(--color-accent-coral)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.9,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        {/* Hover marker tick — opacity via CSS group-hover, pathLength via Framer on the parent group */}
        <path
          d="M 60 18 L 70 8 L 78 14"
          fill="none"
          stroke="var(--color-accent-coral)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-text-primary text-[15px] md:text-[16px] font-semibold tabular-nums">
        {label}
      </span>
    </div>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useParallax";

interface Props {
  words: string[];
  /** Seconds for one full loop. Lower = faster. */
  baseDuration?: number;
  /** Reverse direction. */
  reverse?: boolean;
  /** Visual tone. */
  tone?: "coral" | "muted" | "inverse";
  className?: string;
}

/**
 * Infinite horizontal marquee of oversized words.
 * Speed is scroll-modulated: base pace always running, scrolling nudges it.
 */
export function Marquee({
  words,
  baseDuration = 28,
  reverse = false,
  tone = "muted",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Small scroll-driven horizontal offset to give a living feel
  const nudge = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : reverse ? ["0%", "8%"] : ["0%", "-8%"]
  );

  const color =
    tone === "coral"
      ? "text-accent-coral"
      : tone === "inverse"
        ? "text-text-inverse"
        : "text-text-primary/10";

  // Duplicate words a few times so the loop seam is invisible
  const loop = [...words, ...words, ...words, ...words];

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative overflow-hidden py-6 md:py-10 ${className}`}
    >
      <motion.div
        style={{ x: nudge }}
        className="flex whitespace-nowrap will-change-transform"
      >
        <motion.div
          initial={{ x: reverse ? "-50%" : "0%" }}
          animate={
            reduced
              ? { x: reverse ? "-50%" : "0%" }
              : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
          }
          transition={{
            duration: baseDuration,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex shrink-0"
        >
          {loop.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={`flex items-center font-heading font-black tracking-tight ${color}`}
              style={{ fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: 1 }}
            >
              <span className="mx-6 md:mx-10">{word}</span>
              <span className="mx-6 md:mx-10 text-accent-coral/80">·</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/useParallax";

interface Props {
  children: ReactNode;
  eyebrow?: string;
  className?: string;
  /** Use "inverse" on dark backgrounds. */
  tone?: "default" | "inverse";
}

export function StickySectionTitle({
  children,
  eyebrow,
  className,
  tone = "default",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.4 });
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduced ? 1 : 0.92]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    [1, reduced ? 1 : 1, reduced ? 1 : 0.85]
  );

  const titleColor =
    tone === "inverse" ? "text-text-inverse" : "text-text-primary";

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <div ref={ref} className={`relative h-full ${className ?? ""}`}>
      <motion.div
        ref={titleRef}
        style={{ scale, opacity, transformOrigin: "left top" }}
        className="md:sticky md:top-28"
      >
        {eyebrow && (
          <div className="overflow-hidden mb-3">
            <motion.span
              initial={{ y: "110%" }}
              animate={isInView || reduced ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.7, ease }}
              className="block text-[13px] font-body font-medium uppercase tracking-[0.12em] text-accent-coral"
            >
              {eyebrow}
            </motion.span>
          </div>
        )}
        <div className="overflow-hidden pb-[0.08em]">
          <motion.h2
            initial={{ y: "110%" }}
            animate={isInView || reduced ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 1, ease, delay: eyebrow ? 0.08 : 0 }}
            className={`font-heading font-black ${titleColor} leading-[0.95] tracking-tight`}
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 5rem)" }}
          >
            {children}
          </motion.h2>
        </div>
      </motion.div>
    </div>
  );
}

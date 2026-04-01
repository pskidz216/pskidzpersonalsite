"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function Connector() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0.1, 0.5], [60, 130]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.5], [240, 170]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="inline-block mb-4">
          <span className="text-[13px] font-body font-medium uppercase tracking-[0.12em] text-accent-coral">
            Superpower
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-heading font-bold text-text-primary leading-tight"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
        >
          I connect people who should know each other.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-body text-text-secondary text-base md:text-lg leading-relaxed mt-5 max-w-2xl mx-auto"
        >
          I see both sides of the table — two businesses, two models, two sets of
          needs — and I make the introduction that creates something neither could
          build alone. It&apos;s not networking. It&apos;s pattern matching with people.
        </motion.p>

        {/* Two-circle overlap */}
        <motion.div variants={fadeUp} className="mt-8 flex justify-center">
          <svg
            width="300"
            height="120"
            viewBox="0 0 300 120"
            className="overflow-visible"
          >
            <defs>
              <clipPath id="circle-left-clip">
                <motion.circle cx={leftX} cy="60" r="45" />
              </clipPath>
              <clipPath id="circle-right-clip">
                <motion.circle cx={rightX} cy="60" r="45" />
              </clipPath>
            </defs>

            {/* Left circle */}
            <motion.circle
              cx={leftX}
              cy="60"
              r="45"
              fill="none"
              stroke="var(--color-accent-coral)"
              strokeWidth="1.5"
              opacity="0.6"
            />

            {/* Right circle */}
            <motion.circle
              cx={rightX}
              cy="60"
              r="45"
              fill="none"
              stroke="var(--color-accent-teal)"
              strokeWidth="1.5"
              opacity="0.6"
            />

            {/* Overlap fill — left circle clipped by right */}
            <g clipPath="url(#circle-right-clip)">
              <motion.circle
                cx={leftX}
                cy="60"
                r="45"
                fill="var(--color-accent-coral)"
                opacity="0.12"
              />
            </g>

            {/* Overlap fill — right circle clipped by left */}
            <g clipPath="url(#circle-left-clip)">
              <motion.circle
                cx={rightX}
                cy="60"
                r="45"
                fill="var(--color-accent-teal)"
                opacity="0.12"
              />
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

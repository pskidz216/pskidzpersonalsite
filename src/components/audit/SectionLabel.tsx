"use client";

import { motion } from "framer-motion";

export function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 mb-10 md:mb-14"
    >
      <span className="block w-1.5 h-1.5 bg-accent-coral rounded-full" aria-hidden />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
        {children}
      </span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-[1px] flex-1 bg-timeline-line"
      />
    </motion.div>
  );
}

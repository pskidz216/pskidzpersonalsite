"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function SectionHeading({ children }: { children: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex items-center gap-4 mb-12 md:mb-16"
    >
      <h2 className="text-[13px] font-body font-medium uppercase tracking-[0.08em] text-text-muted whitespace-nowrap">
        {children}
      </h2>
      <div className="h-[1px] flex-1 bg-timeline-line" />
    </motion.div>
  );
}

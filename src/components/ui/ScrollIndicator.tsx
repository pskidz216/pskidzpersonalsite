"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[11px] font-body font-medium uppercase tracking-[0.12em] text-text-muted">
        scroll
      </span>
      <div className="relative w-[1px] h-10 bg-timeline-line overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-accent-coral origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

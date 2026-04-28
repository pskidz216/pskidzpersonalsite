"use client";

import { motion } from "framer-motion";

export function ScanGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(26,26,26,0.18) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 90%)",
        }}
      />
      <motion.div
        initial={{ y: "-10%", opacity: 0 }}
        animate={{
          y: ["-10%", "110%", "110%"],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 2.4,
          times: [0, 0.6, 1],
          delay: 0.6,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "linear",
        }}
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-accent-coral) 50%, transparent 100%)",
          filter: "blur(1px)",
        }}
      />
    </div>
  );
}

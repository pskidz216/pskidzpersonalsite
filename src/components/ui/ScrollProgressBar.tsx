"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-gradient-to-r from-accent-coral via-accent-coral to-accent-teal shadow-[0_0_14px_rgba(232,115,90,0.6)]"
    />
  );
}

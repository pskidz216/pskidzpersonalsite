"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Mask-reveal wrapper: text slides up from behind an overflow-hidden clip,
 * as if peeking out from a horizontal slit. Single-block reveal (not per word).
 */
export function RevealText({
  children,
  className,
  style,
  delay = 0,
  as: Tag = "span",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        animate={isInView ? { y: "0%" } : { y: "110%" }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        <Tag className={className} style={style}>
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}

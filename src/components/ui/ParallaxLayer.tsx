"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";
import { usePrefersReducedMotion } from "@/lib/useParallax";

type Variant = "coral" | "teal" | "mixed";
type Intensity = "subtle" | "medium";

interface ParallaxLayerProps {
  sectionRef: RefObject<HTMLElement | null>;
  variant?: Variant;
  intensity?: Intensity;
}

const SHAPE_COLOR = {
  coral: "border-accent-coral/15 bg-accent-coral/5",
  teal: "border-accent-teal/15 bg-accent-teal/5",
} as const;

const BLOB_COLOR = {
  coral: "bg-accent-coral/[0.04]",
  teal: "bg-accent-teal/[0.04]",
} as const;

const PALETTES: Record<
  Variant,
  {
    a: keyof typeof SHAPE_COLOR;
    b: keyof typeof SHAPE_COLOR;
    c: keyof typeof SHAPE_COLOR;
    d: keyof typeof SHAPE_COLOR;
    blobA: keyof typeof BLOB_COLOR;
    blobB: keyof typeof BLOB_COLOR;
  }
> = {
  coral: { a: "coral", b: "coral", c: "coral", d: "coral", blobA: "coral", blobB: "coral" },
  teal: { a: "teal", b: "teal", c: "teal", d: "teal", blobA: "teal", blobB: "teal" },
  mixed: { a: "coral", b: "teal", c: "coral", d: "teal", blobA: "coral", blobB: "teal" },
};

const RANGES: Record<
  Intensity,
  {
    y1: [number, number];
    y2: [number, number];
    y3: [number, number];
    y4: [number, number];
    r1: [number, number];
    r2: [number, number];
  }
> = {
  subtle: {
    y1: [40, -40],
    y2: [30, -50],
    y3: [50, -30],
    y4: [40, -40],
    r1: [0, 30],
    r2: [0, -20],
  },
  medium: {
    y1: [60, -60],
    y2: [40, -80],
    y3: [80, -40],
    y4: [60, -60],
    r1: [0, 45],
    r2: [0, -30],
  },
};

export function ParallaxLayer({
  sectionRef,
  variant = "mixed",
  intensity = "subtle",
}: ParallaxLayerProps) {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const r = RANGES[intensity];
  const y1 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : r.y1);
  const y2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : r.y2);
  const y3 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : r.y3);
  const y4 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : r.y4);
  const rot1 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : r.r1);
  const rot2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : r.r2);

  const p = PALETTES[variant];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{ y: y1, rotate: rot1 }}
        className={`absolute top-20 right-[10%] w-20 h-20 rounded-2xl border-2 ${SHAPE_COLOR[p.a]}`}
      />
      <motion.div
        style={{ y: y2, rotate: rot2 }}
        className={`absolute top-1/3 left-[5%] w-14 h-14 rounded-full border-2 ${SHAPE_COLOR[p.b]}`}
      />
      <motion.div
        style={{ y: y3 }}
        className={`absolute bottom-32 right-[20%] w-10 h-10 rounded-lg border-2 ${SHAPE_COLOR[p.c]} rotate-12`}
      />
      <motion.div
        style={{ y: y4 }}
        className={`absolute bottom-48 left-[15%] w-16 h-16 rounded-full border-2 ${SHAPE_COLOR[p.d]}`}
      />
      <div
        className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full ${BLOB_COLOR[p.blobA]} blur-[100px]`}
      />
      <div
        className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full ${BLOB_COLOR[p.blobB]} blur-[100px]`}
      />
    </div>
  );
}

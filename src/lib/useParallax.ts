"use client";

import { useEffect, useState } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import type { RefObject } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}

export function useParallax(
  progress: MotionValue<number>,
  range: [number, number]
): MotionValue<number> {
  const reduced = usePrefersReducedMotion();
  return useTransform(progress, [0, 1], reduced ? [0, 0] : range);
}

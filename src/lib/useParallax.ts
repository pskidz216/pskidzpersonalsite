"use client";

import { useSyncExternalStore } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import type { RefObject } from "react";

function subscribeToReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
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
  rangeOrDistance: [number, number] | number
): MotionValue<number> {
  const reduced = usePrefersReducedMotion();
  const range: [number, number] =
    typeof rangeOrDistance === "number"
      ? [0, rangeOrDistance]
      : rangeOrDistance;
  return useTransform(progress, [0, 1], reduced ? [0, 0] : range);
}

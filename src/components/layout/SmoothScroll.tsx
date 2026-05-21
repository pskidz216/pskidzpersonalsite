"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { bridgeLenisToGsap } from "@/lib/gsapLenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Bridge Lenis -> gsap.ticker -> ScrollTrigger.update. Replaces the manual
    // requestAnimationFrame loop so GSAP and Lenis share a single timestep.
    const teardown = bridgeLenisToGsap(lenis);

    return () => {
      teardown();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

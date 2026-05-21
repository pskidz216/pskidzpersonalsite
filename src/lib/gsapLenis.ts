"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let registered = false;

/**
 * One-time GSAP plugin registration. Safe to call repeatedly.
 */
export function registerScrollTrigger(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * Bridge Lenis -> gsap.ticker -> ScrollTrigger.update.
 *
 * Replaces the manual requestAnimationFrame loop. GSAP's ticker is a single
 * shared rAF that drives every animation on the page (consistent timestep),
 * and ScrollTrigger needs an explicit update tick each frame to read the
 * smoothed scroll position from Lenis.
 *
 * Returns a teardown function the caller must invoke on unmount.
 */
export function bridgeLenisToGsap(lenis: Lenis): () => void {
  registerScrollTrigger();

  // ScrollTrigger reads scroll position from Lenis on every scroll event.
  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);

  // gsap.ticker is a single shared rAF — drive Lenis with it so we don't
  // run two competing animation frames.
  const tick = (time: number) => {
    // gsap ticker time is seconds; lenis.raf expects ms.
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tick);

  // Lenis uses smooth scroll — disable GSAP's lag smoothing to avoid double
  // smoothing artifacts.
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off("scroll", onScroll);
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
  };
}

"use client";

import { Suspense, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { ConstellationField } from "./scenes/ConstellationField";
import { useCursorTracking } from "@/lib/useCursorTracking";
import { pathShowsDecorativeChrome } from "@/lib/routeChrome";

const MIN_VIEWPORT_WIDTH = 768;

function getEnabledSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const wideEnough = window.innerWidth >= MIN_VIEWPORT_WIDTH;
  return !reducedMotion && wideEnough;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribeToEnabled(callback: () => void): () => void {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  return () => {
    mql.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

/**
 * Persistent canvas mounted full-bleed behind the entire site.
 *
 * Gated by viewport width + prefers-reduced-motion via useSyncExternalStore,
 * which handles the SSR -> client transition without cascading effects.
 *
 * On mobile or for users with reduced motion preference, this returns null —
 * the existing headshot photo in Hero.tsx becomes the de-facto fallback.
 *
 * Canvas uses alpha:true so the site background shows through; the chrome
 * blob renders as a floating reflective element, not on top of a dark scene.
 */
export function CanvasRoot() {
  const pathname = usePathname();
  const enabled = useSyncExternalStore(
    subscribeToEnabled,
    getEnabledSnapshot,
    getServerSnapshot
  );

  // Mount cursor tracking unconditionally — the hook short-circuits on
  // reduced-motion. Putting it here keeps it scoped to the canvas lifecycle.
  useCursorTracking();

  if (!enabled) return null;
  if (!pathShowsDecorativeChrome(pathname)) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      data-testid="canvas-root"
    >
      <Canvas
        // R3F's wrapper div sets pointer-events:auto by default, which defeats
        // the pointer-events-none above and blocks clicks on everything the
        // fixed canvas overlaps (e.g. the Certs accordions).
        style={{ pointerEvents: "none" }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <ConstellationField />
        </Suspense>
      </Canvas>
    </div>
  );
}

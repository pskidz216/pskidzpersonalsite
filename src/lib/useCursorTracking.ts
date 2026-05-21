"use client";

import { useEffect } from "react";
import { useR3fStore } from "./r3fStore";
import { usePrefersReducedMotion } from "./useParallax";

/**
 * Track normalized cursor position (-1 to 1 on each axis) into the R3F store.
 *
 * Disabled when the user prefers reduced motion. Idempotent — mount once
 * from CanvasRoot.
 */
export function useCursorTracking(): void {
  const reduced = usePrefersReducedMotion();
  const setMouse = useR3fStore((s) => s.setMouse);

  useEffect(() => {
    if (reduced) return;

    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth === 0 || innerHeight === 0) return;
      // Map to (-1, 1). Origin is screen center.
      const x = (event.clientX / innerWidth) * 2 - 1;
      const y = -((event.clientY / innerHeight) * 2 - 1);
      setMouse(x, y);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [reduced, setMouse]);
}

"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribeToFinePointer(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const hasFinePointer = useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (!hasFinePointer) return;

    document.documentElement.style.cursor = "none";

    function onMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.style.cursor = "";
    };
  }, [hasFinePointer, mouseX, mouseY]);

  if (!hasFinePointer) return null;

  return (
    <>
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent-coral z-[9999] pointer-events-none"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-accent-coral/40 z-[9999] pointer-events-none"
      />
    </>
  );
}

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

const PongOverlay = dynamic(
  () => import("./PongOverlay").then((m) => m.PongOverlay),
  { ssr: false },
);

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * Floating pill in the corner: a tiny bouncing ball + "pong".
 * Opens the fullscreen game. The overlay is dynamically imported so the
 * game code never loads unless someone actually plays.
 */
export function PongLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease }}
        onClick={() => setOpen(true)}
        aria-label="Play Pong — a 30 second break"
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[80] group flex items-center gap-2.5 pl-3.5 pr-4 h-11 rounded-full bg-bg-dark text-text-inverse font-mono text-xs tracking-[0.14em] uppercase shadow-[0_2px_8px_rgba(26,26,26,0.18),0_8px_24px_rgba(26,26,26,0.12)] transition-[scale,box-shadow] duration-300 ease-out hover:shadow-[0_4px_12px_rgba(26,26,26,0.22),0_12px_32px_rgba(26,26,26,0.16)] hover:scale-[1.02] active:scale-[0.96]"
      >
        <span className="relative w-4 h-4 overflow-hidden" aria-hidden>
          <span className="absolute left-1/2 -ml-[3px] w-1.5 h-1.5 rounded-full bg-accent-coral animate-[pong-bounce_1.1s_cubic-bezier(0.36,0,0.64,1)_infinite] motion-reduce:animate-none motion-reduce:top-1/2 motion-reduce:-mt-[3px]" />
        </span>
        pong
        <span className="text-text-inverse/40 group-hover:text-text-inverse/70 transition-colors duration-300">
          :30
        </span>
      </motion.button>

      <AnimatePresence>
        {open && <PongOverlay onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

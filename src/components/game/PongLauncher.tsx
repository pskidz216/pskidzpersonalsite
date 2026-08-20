"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { isIntroPending, markIntroSeen } from "@/lib/pong/introSeen";

const PongOverlay = dynamic(
  () => import("./PongOverlay").then((m) => m.PongOverlay),
  { ssr: false },
);

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** The greeting is decided once per page load and never changes under us. */
const subscribeNever = () => () => {};

/**
 * The game greets each visitor once per visit, before the site does, with an
 * equally weighted way past it. After that — played, skipped, or simply seen
 * earlier this session — the corner pill is how you get back in.
 */
export function PongLauncher() {
  // The server cannot know whether this visitor has been greeted, and guessing
  // strands the pill: it renders the intro's hidden-and-unfocusable variant,
  // that markup survives hydration, and a returning visitor gets no way back
  // into the game. So the server renders the settled state — no intro, pill
  // reachable — and the client corrects it after hydration.
  const pending = useSyncExternalStore(
    subscribeNever,
    isIntroPending,
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);
  const [replay, setReplay] = useState(false);

  const intro = pending && !dismissed;
  const open = intro || replay;

  // Record the visit when the greeting appears, not when it is dismissed: a
  // refresh part-way through is the same visit and should not greet twice.
  useEffect(() => {
    if (pending) markIntroSeen();
  }, [pending]);

  function close() {
    setDismissed(true);
    setReplay(false);
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: intro ? 0 : 1, y: intro ? 16 : 0 }}
        transition={{ delay: intro ? 0 : 0.4, duration: 0.6, ease }}
        onClick={() => setReplay(true)}
        aria-hidden={intro}
        tabIndex={intro ? -1 : 0}
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
        {open && <PongOverlay intro={intro} onClose={close} />}
      </AnimatePresence>
    </>
  );
}

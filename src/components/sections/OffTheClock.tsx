"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ─── Data ─── */

const WORDS = [
  "Chasing the sunrise",
  "On the paddle board",
  "First one at the coffee shop",
  "Outside every chance I get",
  "Connecting people who need to meet",
  "In the gym",
  "Deep in a good book",
  "Locked into a podcast",
  "Dropping into Fortnite",
];

/* ─── Main Section ─── */

export function OffTheClock() {
  const [current, setCurrent] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % WORDS.length);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(advance, 2400);
    return () => clearInterval(interval);
  }, [isInView, advance]);

  return (
    <section id="offclock" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading>Off the Clock</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onViewportEnter={() => setIsInView(true)}
          className="mt-8 md:mt-12"
        >
          {/* Static intro */}
          <motion.p
            variants={fadeUp}
            className="font-body text-text-muted text-sm md:text-base uppercase tracking-[0.1em]"
          >
            When I&apos;m not working, you&apos;ll find me
          </motion.p>

          {/* Rotating word */}
          <motion.div
            variants={fadeUp}
            className="relative h-[1.2em] mt-4 md:mt-6 overflow-hidden"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[current]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 font-heading font-bold text-text-primary leading-none"
              >
                {WORDS[current]}
                <span className="text-accent-coral">.</span>
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Progress dots */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 mt-8 md:mt-10"
          >
            {WORDS.map((word, i) => (
              <button
                key={word}
                onClick={() => setCurrent(i)}
                className="group relative p-1 cursor-pointer"
                aria-label={word}
              >
                <span
                  className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-accent-coral scale-125"
                      : "bg-timeline-line group-hover:bg-text-muted"
                  }`}
                />
              </button>
            ))}
          </motion.div>

          {/* All words listed subtly below */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-10 md:mt-14 pt-6 border-t border-timeline-line/50"
          >
            {WORDS.map((word, i) => (
              <span key={word} className="flex items-center gap-5">
                <button
                  onClick={() => setCurrent(i)}
                  className={`font-body text-sm transition-colors duration-300 cursor-pointer ${
                    i === current
                      ? "text-accent-coral font-medium"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {word}
                </button>
                {i < WORDS.length - 1 && (
                  <span className="w-[1px] h-4 bg-timeline-line hidden sm:block" />
                )}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

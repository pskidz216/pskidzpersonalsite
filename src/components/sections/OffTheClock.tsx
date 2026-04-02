"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ─── Icons ─── */

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function PaddleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* SUP paddle — T-handle, long shaft, blade */}
      <path d="M8 2h4M10 2v14" />
      <path d="M7 16l3-2 3 2v5a1 1 0 01-1 1H8a1 1 0 01-1-1v-5z" />
    </svg>
  );
}

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 2v3M10 2v3M14 2v3" />
    </svg>
  );
}

function WavesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  );
}

function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Left arm/cuff */}
      <path d="M2 14l2-6h2.5" />
      {/* Right arm/cuff */}
      <path d="M22 14l-2-6h-2.5" />
      {/* Clasped hands — simplified two curves meeting */}
      <path d="M6.5 8l3-1.5c1.2-.4 2.2.2 2.5 1l.5 1.5" />
      <path d="M17.5 8l-3-1.5c-1.2-.4-2.2.2-2.5 1l-.5 1.5" />
      {/* Thumbs */}
      <path d="M8 11.5c1.5 1 3 1.5 4.5.5" />
      <path d="M16 11.5c-1.5 1-3 1.5-4.5.5" />
    </svg>
  );
}

function DumbbellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Classic dumbbell — bar with weight plates */}
      <path d="M8 12H16" />
      <rect x="2" y="9" width="3" height="6" rx="1" />
      <rect x="5" y="7" width="3" height="10" rx="1" />
      <rect x="16" y="7" width="3" height="10" rx="1" />
      <rect x="19" y="9" width="3" height="6" rx="1" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  );
}

function ControllerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4M8 10v4" />
      <circle cx="17" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

/* ─── Data ─── */

interface Activity {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ACTIVITIES: Activity[] = [
  { text: "Chasing the sunrise", icon: SunIcon },
  { text: "On the paddle board", icon: PaddleIcon },
  { text: "First one at the coffee shop", icon: CoffeeIcon },
  { text: "Outside every chance I get", icon: WavesIcon },
  { text: "Connecting people who need to meet", icon: HandshakeIcon },
  { text: "In the gym", icon: DumbbellIcon },
  { text: "Deep in a good book", icon: BookIcon },
  { text: "Locked into a podcast", icon: HeadphonesIcon },
  { text: "Dropping into Fortnite", icon: ControllerIcon },
];

/* ─── Main Section ─── */

export function OffTheClock() {
  const [current, setCurrent] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % ACTIVITIES.length);
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
            className="relative h-[3.75rem] sm:h-[3rem] md:h-[4.5rem] lg:h-[5.5rem] mt-4 md:mt-6 overflow-hidden text-[1.5rem] sm:text-[2.25rem] md:text-[3.5rem] lg:text-[5rem]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={ACTIVITIES[current].text}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 font-heading font-bold text-text-primary leading-[1.25] sm:leading-none flex items-start gap-3 sm:gap-4"
              >
                <span>{ACTIVITIES[current].text}</span>
                {(() => {
                  const Icon = ACTIVITIES[current].icon;
                  return <Icon className="w-[0.65em] h-[0.65em] text-accent-coral shrink-0 mt-[0.15em]" />;
                })()}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Progress dots */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 mt-8 md:mt-10"
          >
            {ACTIVITIES.map((activity, i) => (
              <button
                key={activity.text}
                onClick={() => setCurrent(i)}
                className="group relative p-1 cursor-pointer"
                aria-label={activity.text}
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
            {ACTIVITIES.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <span key={activity.text} className="flex items-center gap-5">
                  <button
                    onClick={() => setCurrent(i)}
                    className={`font-body text-sm transition-colors duration-300 cursor-pointer flex items-center gap-1.5 ${
                      i === current
                        ? "text-accent-coral font-medium"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {activity.text}
                  </button>
                  {i < ACTIVITIES.length - 1 && (
                    <span className="w-[1px] h-4 bg-timeline-line hidden sm:block" />
                  )}
                </span>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

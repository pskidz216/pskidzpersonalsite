"use client";

import { motion } from "framer-motion";

type Milestone = { day: number; caption: string };

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const POSITIONS = [0.1, 0.5, 0.9];

export function ScrollTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative w-full">
      {/* Desktop: horizontal */}
      <div className="hidden md:block relative">
        {/* Line + dots row */}
        <div className="relative h-4">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-timeline-line" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent-coral"
          />
          {milestones.map((m, i) => (
            <motion.div
              key={`dot-${m.day}`}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
                delay: 0.4 + i * 0.18,
              }}
              style={{ left: `${POSITIONS[i] * 100}%` }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-accent-coral ring-[3px] ring-bg-primary"
            />
          ))}
        </div>

        {/* Captions row */}
        <div className="relative mt-7 h-16">
          {milestones.map((m, i) => {
            const pos = POSITIONS[i];
            const isLeft = pos < 0.2;
            const isRight = pos > 0.8;
            const anchorStyle = isLeft
              ? { left: 0 }
              : isRight
              ? { right: 0 }
              : { left: `${pos * 100}%`, transform: "translateX(-50%)" };
            const textAlign = isLeft
              ? "text-left"
              : isRight
              ? "text-right"
              : "text-center";
            return (
              <motion.div
                key={`caption-${m.day}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.18, ease }}
                style={anchorStyle}
                className={`absolute top-0 ${textAlign}`}
              >
                <div className="font-mono text-[12px] font-bold tracking-[0.14em] text-text-primary">
                  {m.day} DAYS
                </div>
                <div className="font-body text-sm text-text-secondary mt-1 max-w-[180px] leading-snug">
                  {m.caption}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden relative pl-10">
        <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-timeline-line" />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, delay: 0.2, ease }}
          style={{ transformOrigin: "top" }}
          className="absolute left-3 top-2 bottom-2 w-[2px] bg-accent-coral"
        />
        <div className="space-y-10">
          {milestones.map((m, i) => (
            <div key={m.day} className="relative">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                  delay: 0.4 + i * 0.18,
                }}
                className="absolute -left-[34px] top-1 w-3.5 h-3.5 rounded-full bg-accent-coral ring-[3px] ring-bg-primary"
              />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.18, ease }}
              >
                <div className="font-mono text-[12px] font-bold tracking-[0.14em] text-text-primary">
                  {m.day} DAYS
                </div>
                <div className="font-body text-sm text-text-secondary mt-1 leading-snug">
                  {m.caption}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

function DuolingoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-2-4c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.76.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z" />
    </svg>
  );
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const paragraphs = [
  {
    key: "intro",
    node: (
      <>
        I&apos;m Paul, a builder who&apos;s spent the last decade at the
        intersection of healthcare, technology, and growth. From selling spinal
        implants in operating rooms to leading sales and marketing at a full
        service manufacturing company, I chase problems that matter and bring
        people together to solve them.
      </>
    ),
  },
  {
    key: "ai",
    node: (
      <>
        These days, AI is my{" "}
        <span className="text-accent-coral font-medium">unfair advantage</span>,
        but people are my superpower. I build custom AI agents that automate the
        grind so I can spend my time where it matters most: face-to-face,
        building relationships, and earning trust. Technology scales the work.
        Human connection closes it.
      </>
    ),
  },
  {
    key: "thread",
    node: (
      <>
        The common thread across every role? I get obsessed with understanding
        what makes people tick. AI helps me find them faster, but it&apos;s the
        genuine connection that keeps them around.
      </>
    ),
  },
];

const stats = [
  "10+ years in health & tech",
  "3 startups",
  "AI-powered workflows",
  "Aerospace, defense & product assembly",
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Big section heading with mask reveal */}
        <div className="overflow-hidden pb-[0.08em] mb-10 md:mb-14">
          <motion.h2
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease }}
            className="font-heading font-black text-text-primary leading-[0.95] tracking-tight inline-block"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            About <span className="text-accent-coral">Me</span>
          </motion.h2>
        </div>

        {/* Staggered paragraph reveals */}
        <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
          {paragraphs.map((p, i) => (
            <div key={p.key} className="overflow-hidden">
              <motion.p
                initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.9,
                  ease,
                  delay: 0.2 + i * 0.15,
                }}
                className="font-body text-text-secondary text-lg md:text-xl leading-relaxed"
              >
                {p.node}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Stats — pop in per item */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.7 },
            },
          }}
          className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
        >
          {stats.map((stat, i) => (
            <motion.span
              key={stat}
              variants={fadeUp}
              className="flex items-center gap-5"
            >
              <span className="font-body font-medium text-sm md:text-base text-text-muted">
                {stat}
              </span>
              {i < stats.length - 1 && (
                <span className="w-[1px] h-4 bg-timeline-line hidden sm:block" />
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease, delay: 1.1 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          <span className="flex items-center gap-1.5">
            <span className="font-body font-medium text-sm text-text-muted">
              English
            </span>
            <span className="font-body text-xs text-text-muted/60">Native</span>
          </span>
          <span className="w-[1px] h-4 bg-timeline-line hidden sm:block" />
          <span className="flex items-center gap-2">
            <span className="font-body font-medium text-sm text-text-muted">
              Spanish
            </span>
            <span className="font-body text-xs text-text-muted/60">
              Elementary
            </span>
            <span className="inline-flex items-center gap-1 bg-[#58CC02]/10 text-[#58CC02] text-xs font-medium px-2 py-0.5 rounded-full">
              <DuolingoIcon className="w-3.5 h-3.5" />
              Score 44
            </span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

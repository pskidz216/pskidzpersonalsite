"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

function DuolingoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-2-4c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.76.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z" />
    </svg>
  );
}

const stats = [
  "10+ years in health & tech",
  "3 startups",
  "AI-powered workflows",
  "Expanding in aerospace, defense & product assembly",
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading>About</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl mx-auto md:mx-0 space-y-6"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-text-secondary text-base md:text-lg leading-relaxed"
          >
            I&apos;m Paul, a builder who&apos;s spent the last decade at the intersection of
            healthcare, technology, and growth. From selling spinal implants in
            operating rooms to leading sales and marketing at a full service manufacturing
            company, I chase problems that matter and bring people together to solve them.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-body text-text-secondary text-base md:text-lg leading-relaxed"
          >
            These days, AI is my unfair advantage, but people are my superpower.
            I build custom AI agents that automate the grind so I can spend my
            time where it matters most: face-to-face, building relationships, and
            earning trust. Technology scales the work. Human connection closes it.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-body text-text-secondary text-base md:text-lg leading-relaxed"
          >
            The common thread across every role? I get obsessed with understanding
            what makes people tick. AI helps me find them faster, but it&apos;s the
            genuine connection that keeps them around.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-6"
          >
            {stats.map((stat, i) => (
              <span key={stat} className="flex items-center gap-5">
                <span className="font-body font-medium text-sm text-text-muted">
                  {stat}
                </span>
                {i < stats.length - 1 && (
                  <span className="w-[1px] h-4 bg-timeline-line hidden sm:block" />
                )}
              </span>
            ))}
          </motion.div>

          {/* Languages */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2"
          >
            <span className="flex items-center gap-1.5">
              <span className="font-body font-medium text-sm text-text-muted">
                English
              </span>
              <span className="font-body text-xs text-text-muted/60">
                Native
              </span>
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
        </motion.div>
      </div>
    </section>
  );
}

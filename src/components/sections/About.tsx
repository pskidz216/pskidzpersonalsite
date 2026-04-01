"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  "10+ years in health & tech",
  "3 startups",
  "AI-powered workflows",
  "Custom AI tools built",
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
            I&apos;m Paul — a builder who&apos;s spent the last decade at the intersection of
            healthcare, technology, and growth. From selling spinal implants in
            operating rooms to leading sales and marketing at a precision manufacturing
            company, I chase problems that matter and bring people together to solve them.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-body text-text-secondary text-base md:text-lg leading-relaxed"
          >
            These days, AI is my unfair advantage. I build custom AI agents that
            automate prospect research, generate personalized outreach at scale,
            and create sales intelligence systems that run autonomously. I don&apos;t
            just use AI tools — I build them.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-body text-text-secondary text-base md:text-lg leading-relaxed"
          >
            The common thread across every role? I get obsessed with understanding
            what makes people tick, then I build systems — increasingly AI-powered
            ones — to reach them.
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
        </motion.div>
      </div>
    </section>
  );
}

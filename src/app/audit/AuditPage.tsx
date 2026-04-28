"use client";

import { motion, MotionConfig } from "framer-motion";
import { auditContent } from "./content";
import { SectionLabel } from "@/components/audit/SectionLabel";
import { SketchUnderline } from "@/components/audit/SketchUnderline";
import { WorkflowGraph } from "@/components/audit/WorkflowGraph";
import { AnnotatedNumber } from "@/components/audit/AnnotatedNumber";
import { Counter } from "@/components/audit/Counter";
import { TypewriterParagraph } from "@/components/audit/TypewriterParagraph";
import { ScrollTimeline } from "@/components/audit/ScrollTimeline";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function AuditPage() {
  const c = auditContent;
  const subheadParts = c.hero.subhead.split(c.hero.highlight);

  return (
    <MotionConfig reducedMotion="user">
      {/* Top-left PS mark — links to home */}
      <a
        href="/"
        className="fixed top-5 left-5 md:top-7 md:left-8 z-40 flex items-center gap-2 group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        aria-label="Back to home"
      >
        <span className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-text-primary bg-transparent group-hover:bg-accent-coral group-hover:border-accent-coral transition-all duration-300">
          <span className="font-heading font-bold text-[15px] md:text-[18px] tracking-[-0.03em] leading-none text-text-primary group-hover:text-white transition-colors duration-300">
            PS
          </span>
        </span>
      </a>

      <main className="relative">
        {/* HERO */}
        <section className="relative flex items-center px-6 md:px-12 lg:px-20 pt-28 md:pt-32 pb-20 md:pb-28">
          <div className="relative max-w-6xl w-full mx-auto grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
            {/* Graph */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="order-2 md:order-1"
            >
              <WorkflowGraph />
            </motion.div>

            {/* Copy */}
            <div className="order-1 md:order-2">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
                className="font-heading font-black text-text-primary leading-[0.95] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.75rem, 6.5vw, 5rem)" }}
              >
                {c.hero.h1}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease }}
                className="font-body text-text-secondary text-base md:text-lg leading-relaxed max-w-xl"
              >
                {subheadParts[0]}
                <span className="relative inline-block text-text-primary font-medium">
                  {c.hero.highlight}
                  <SketchUnderline delay={1.2} />
                </span>
                {subheadParts[1]}
              </motion.p>
            </div>
          </div>
        </section>

        {/* WHAT IT IS */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>{c.whatItIs.label}</SectionLabel>
            <TypewriterParagraph
              text={c.whatItIs.p1}
              speed={20}
              className="font-body text-text-primary text-lg md:text-xl leading-relaxed mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease }}
              className="font-body text-text-secondary text-lg md:text-xl leading-relaxed"
            >
              {c.whatItIs.p2}
            </motion.p>
          </div>
        </section>

        {/* THE DEEP DIVE */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>{c.deepDive.label}</SectionLabel>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease }}
              className="font-body text-text-primary text-lg md:text-xl leading-relaxed mb-10"
            >
              {c.deepDive.lead}
            </motion.p>

            <ul className="space-y-3 md:space-y-4 mb-10">
              {c.deepDive.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="flex gap-4 items-baseline"
                >
                  <span
                    aria-hidden
                    className="font-mono text-accent-coral text-sm shrink-0 leading-relaxed"
                  >
                    →
                  </span>
                  <span className="font-body text-text-secondary text-base md:text-lg leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease }}
              className="font-body text-text-primary text-lg md:text-xl leading-relaxed font-medium"
            >
              {c.deepDive.closer}
            </motion.p>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-bg-secondary/40">
          <div className="max-w-5xl mx-auto">
            <SectionLabel>{c.whatYouGet.label}</SectionLabel>
            <ol className="grid md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10 list-none">
              {c.whatYouGet.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                  className="flex items-start gap-5"
                >
                  <AnnotatedNumber index={i + 1} delay={0.2 + i * 0.1} />
                  <p className="font-body text-text-primary text-base md:text-lg leading-relaxed pt-3 md:pt-4">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* THE PLAN */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="relative max-w-5xl mx-auto">
            <SectionLabel>{c.thePlan.label}</SectionLabel>
            <ScrollTimeline milestones={[...c.thePlan.milestones]} />
          </div>
        </section>

        {/* THE FIRST CALL */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>{c.pricing.label}</SectionLabel>

            {/* Big "30 min" moment */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-baseline gap-4 md:gap-6">
                <Counter
                  target={30}
                  className="font-heading font-black text-text-primary leading-[0.85] tracking-tight"
                  style={{ fontSize: "clamp(4.5rem, 14vw, 10rem)" }}
                />
                <span
                  className="font-mono uppercase tracking-[0.18em] text-accent-coral"
                  style={{ fontSize: "clamp(1rem, 2.4vw, 1.75rem)" }}
                >
                  min
                </span>
              </div>
              <div className="mt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-coral">
                  {c.pricing.freeCallSubtitle}
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease }}
              className="font-body text-text-primary text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              {c.pricing.scopeNote}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, delay: 0.4, ease }}
              style={{ transformOrigin: "left" }}
              className="h-[1px] bg-accent-coral/40 mt-14 md:mt-16"
            />
          </div>
        </section>

        {/* Bottom mark */}
        <div className="px-6 pb-10 md:pb-14 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
            {c.domain}
          </span>
        </div>
      </main>
    </MotionConfig>
  );
}

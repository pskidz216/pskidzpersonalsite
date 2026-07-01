"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { pricingContent } from "./content";
import { SectionLabel } from "@/components/audit/SectionLabel";
import { TierCard } from "@/components/pricing/TierCard";
import { staggerContainer, viewportOnce } from "@/lib/animations";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const CONTACT_EMAIL = "pskidmore216@gmail.com";

const SCOPE_BOLD: Record<number, string> = {
  1: "billed separately",
  2: "3-month minimum",
};

function withBold(text: string, bold?: string) {
  if (!bold) return text;
  const idx = text.indexOf(bold);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-semibold text-text-primary">{bold}</strong>
      {text.slice(idx + bold.length)}
    </>
  );
}

export function PricingPage() {
  const c = pricingContent;

  return (
    <MotionConfig reducedMotion="user">
      {/* Top-left PS mark — links to home */}
      <Link
        href="/"
        className="fixed top-5 left-5 md:top-7 md:left-8 z-40 flex items-center gap-2 group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        aria-label="Back to home"
      >
        <span className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-text-primary bg-transparent group-hover:bg-accent-coral group-hover:border-accent-coral transition-all duration-300">
          <span className="font-heading font-bold text-[15px] md:text-[18px] tracking-[-0.03em] leading-none text-text-primary group-hover:text-white transition-colors duration-300">
            PS
          </span>
        </span>
      </Link>

      <main className="relative">
        {/* HERO */}
        <section className="relative px-6 md:px-12 lg:px-20 pt-28 md:pt-32 pb-16 md:pb-20">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="font-heading font-black text-text-primary leading-[0.95] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.75rem, 6.5vw, 4.5rem)" }}
            >
              {c.hero.h1}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="font-body text-text-secondary text-base md:text-lg leading-relaxed max-w-xl"
            >
              {c.hero.subhead}
            </motion.p>
          </div>
        </section>

        {/* AUDIT / FRONT DOOR */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>{c.audit.label}</SectionLabel>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease }}
              className="relative rounded-2xl border border-accent-coral bg-accent-coral/[0.04] p-8 md:p-10"
            >
              <h2 className="font-heading font-bold text-text-primary text-2xl md:text-3xl tracking-tight mb-2">
                {c.audit.name}
              </h2>
              <p className="font-mono text-accent-coral text-sm tracking-[0.05em] mb-5">
                {c.audit.price}
              </p>
              <p className="font-body text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mb-7">
                {c.audit.copy}
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=AI Opportunity Audit`}
                className="group relative inline-block font-body text-text-primary text-base md:text-lg font-medium"
              >
                {c.audit.cta} →
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent-coral origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* PROJECT TIERS */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-20 bg-bg-secondary/40">
          <div className="max-w-5xl mx-auto">
            <SectionLabel>{c.projects.label}</SectionLabel>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid md:grid-cols-2 gap-6 md:gap-8"
            >
              {c.projects.items.map((tier) => (
                <TierCard key={tier.name} {...tier} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* RETAINER TIERS */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <SectionLabel>{c.retainers.label}</SectionLabel>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid md:grid-cols-2 gap-6 md:gap-8"
            >
              {c.retainers.items.map((tier) => (
                <TierCard key={tier.name} {...tier} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* FRACTIONAL */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-20 bg-bg-secondary/40">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>{c.fractional.label}</SectionLabel>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease }}
              className="relative rounded-2xl border border-accent-coral bg-accent-coral/[0.04] p-8 md:p-10"
            >
              <h2 className="font-heading font-bold text-text-primary text-2xl md:text-3xl tracking-tight mb-2">
                {c.fractional.name}
              </h2>
              <p className="font-mono text-accent-coral text-sm tracking-[0.05em] mb-5">
                {c.fractional.price}
              </p>
              <p className="font-body text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                {c.fractional.copy}
              </p>
            </motion.div>
          </div>
        </section>

        {/* SCOPE STRIP */}
        <section className="relative px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>{c.scope.label}</SectionLabel>
            <div className="space-y-3">
              {c.scope.lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="flex gap-3 font-body text-text-secondary text-base leading-relaxed"
                >
                  <span aria-hidden className="shrink-0 font-mono text-accent-coral text-sm leading-relaxed">
                    ▸
                  </span>
                  <span>{withBold(line, SCOPE_BOLD[i])}</span>
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / CONTACT */}
        <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease }}
            >
              <p className="font-body text-text-primary text-lg md:text-xl leading-relaxed mb-6">
                <strong className="mr-1.5 font-semibold">Ready to start?</strong>
                Tell me what you&apos;re building.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group relative inline-block font-body text-text-primary text-xl md:text-2xl font-medium"
                >
                  {CONTACT_EMAIL}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent-coral origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Let's talk`}
                  className="inline-flex items-center justify-center rounded-full bg-accent-coral px-6 py-3 font-body text-white text-sm font-medium transition-colors duration-300 hover:bg-accent-coral/90"
                >
                  Tell me more
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
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

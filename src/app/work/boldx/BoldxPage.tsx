"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { boldxCaseStudy } from "./content";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Static section label: dot, mono caption, hairline. No animation gate. */
function SectionLabel({
  children,
  accent = "coral",
}: {
  children: string;
  accent?: "coral" | "teal";
}) {
  return (
    <div className="flex items-center gap-3 mb-10 md:mb-14">
      <span
        className={`block w-1.5 h-1.5 rounded-full ${
          accent === "teal" ? "bg-accent-teal" : "bg-accent-coral"
        }`}
        aria-hidden
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
        {children}
      </span>
      <span className="h-[1px] flex-1 bg-timeline-line" aria-hidden />
    </div>
  );
}

/**
 * The hero animates on mount with framer-motion. Everything below it is
 * static: a case study is read, and its content is there at rest.
 */
export function BoldxPage() {
  const c = boldxCaseStudy;
  return (
    <MotionConfig reducedMotion="user">
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

      <main className="relative bg-bg-primary text-text-primary">
        {/* HERO */}
        <section className="px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto grid gap-10 md:gap-14">
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-16 md:items-end">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease }}
                  className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-accent-teal mb-6"
                >
                  {c.eyebrow}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease }}
                  className="font-heading font-black leading-[0.95] tracking-[-0.03em] [text-wrap:balance]"
                  style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
                >
                  {c.hero.h1}
                </motion.h1>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease }}
                className="font-body text-text-secondary text-lg leading-relaxed max-w-xl"
              >
                {c.hero.sub}
              </motion.p>
            </div>
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="m-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.hero.image.src}
                alt={c.hero.image.alt}
                width={1600}
                height={900}
                className="w-full h-auto rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.32)]"
              />
            </motion.figure>
          </div>
        </section>

        {/* WHERE IT STARTED */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-bg-secondary">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>{c.start.label}</SectionLabel>
            {c.start.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-body text-text-primary text-lg md:text-xl leading-relaxed mb-6 last:mb-0"
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* LEDGER */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <SectionLabel accent="teal">{c.ledgerLabel}</SectionLabel>
            <div className="grid gap-14 md:gap-16">
              {c.ledger.map((group) => (
                <div
                  key={group.label}
                  className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-10"
                >
                  <h2
                    className="font-heading font-bold text-2xl md:text-3xl tracking-[-0.025em] leading-tight md:sticky md:top-28 self-start"
                  >
                    {group.label}
                  </h2>
                  <div>
                    {group.intro ? (
                      <p className="font-body text-text-secondary leading-relaxed max-w-prose mb-6">
                        {group.intro}
                      </p>
                    ) : null}
                    <ol className="m-0 p-0 list-none border-t border-timeline-line">
                      {group.entries.map((entry) => (
                        <li
                          key={entry.title}
                          className="py-5 border-b border-timeline-line"
                        >
                          <div>
                            <h3 className="font-body font-semibold text-lg leading-snug mb-1">
                              {entry.title}
                            </h3>
                            <p className="font-body text-text-secondary leading-relaxed max-w-prose">
                              {entry.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-bg-dark text-text-inverse">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10 md:mb-14">
              <span className="block w-1.5 h-1.5 rounded-full bg-accent-coral" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                {c.numbers.label}
              </span>
              <span className="h-[1px] flex-1 bg-white/15" aria-hidden />
            </div>
            <dl className="m-0 grid grid-cols-2 lg:grid-cols-4 gap-y-10">
              {c.numbers.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse justify-end gap-4 border-l border-white/15 pl-4 md:pl-6 pr-2"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted leading-relaxed">
                    {stat.label}
                  </dt>
                  <dd className="m-0 font-heading font-black tracking-[-0.03em] leading-[0.9] tabular-nums text-[clamp(2.25rem,4.6vw,3.75rem)]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* WHAT BROKE + STACK */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-14 md:gap-20">
            <div>
              <SectionLabel>{c.broke.label}</SectionLabel>
              <ul className="m-0 p-0 list-none grid gap-6">
                {c.broke.items.map((item, i) => (
                  <li key={i} className="flex gap-4 items-baseline">
                    <span aria-hidden className="font-mono text-accent-coral text-sm shrink-0">
                      →
                    </span>
                    <span className="font-body text-text-secondary text-lg leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
                <li className="flex gap-4 items-baseline">
                  <span aria-hidden className="font-mono text-accent-coral text-sm shrink-0">
                    →
                  </span>
                  <span className="font-body text-text-primary text-lg leading-relaxed">
                    {c.closing.ended}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <SectionLabel accent="teal">{c.stack.label}</SectionLabel>
              <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
                {c.stack.items.map((tool) => (
                  <li
                    key={tool}
                    className="font-mono text-[11px] uppercase tracking-[0.16em] px-3 py-2 border border-timeline-line rounded-full text-text-secondary"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-bg-secondary">
          <div className="max-w-6xl mx-auto">
            <SectionLabel>{c.gallery.label}</SectionLabel>
            <div className="columns-2 md:columns-3 gap-4 md:gap-6">
              {c.gallery.items.map((item) => (
                <figure
                  key={item.src}
                  className="m-0 mb-4 md:mb-6 break-inside-avoid"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-auto rounded-lg border border-timeline-line bg-bg-primary"
                  />
                  <figcaption className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-text-muted mt-2 leading-relaxed">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="font-heading font-black tracking-[-0.03em] leading-[0.95] mb-5"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)" }}
            >
              {c.closing.cta}
            </h2>
            <p
              className="font-body text-text-secondary text-lg leading-relaxed mb-10"
            >
              {c.closing.sub}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={c.closing.primary.href}
                className="inline-flex items-center px-6 py-3 rounded-full bg-accent-coral text-white font-body font-semibold hover:bg-[#d9634a] transition-colors"
              >
                {c.closing.primary.label}
              </a>
              <a
                href={c.closing.secondary.href}
                className="inline-flex items-center px-6 py-3 rounded-full border border-text-primary font-body font-semibold hover:bg-text-primary hover:text-text-inverse transition-colors"
              >
                {c.closing.secondary.label}
              </a>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted mt-14">
              {c.domain}
            </p>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}

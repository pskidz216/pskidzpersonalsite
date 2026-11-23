"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { LegalLinks } from "@/components/ui/LegalLinks";
import { StickyContact } from "@/components/ui/StickyContact";
import { socialLinks } from "@/lib/data";
import { EngineSection } from "./EngineSection";
import { curatePlan, type Goal, type Move } from "./content";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const pad = "px-6 md:px-12 lg:px-20";

function SectionLabel({ children, accent = "coral" }: { children: string; accent?: "coral" | "teal" }) {
  return (
    <div className="flex items-center gap-3 mb-10 md:mb-14">
      <span
        className={`block w-1.5 h-1.5 rounded-full ${accent === "teal" ? "bg-accent-teal" : "bg-accent-coral"}`}
        aria-hidden
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">{children}</span>
      <span className="h-[1px] flex-1 bg-timeline-line" aria-hidden />
    </div>
  );
}

function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="font-heading font-black tracking-[-0.03em] leading-[0.95] [text-wrap:balance] m-0"
      style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
    >
      {children}
    </h2>
  );
}

function Hero() {
  const c = curatePlan;
  return (
    <section className={`${pad} pt-28 md:pt-36 pb-16 md:pb-20`}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-accent-teal mb-6"
        >
          {c.eyebrow}
        </motion.p>
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-6 md:gap-16 md:items-end">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-heading font-black leading-[0.92] tracking-[-0.03em] [text-wrap:balance] m-0"
            style={{ fontSize: "clamp(2.75rem, 7.5vw, 6rem)" }}
          >
            {c.hero.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="font-body text-text-secondary text-lg leading-relaxed max-w-xl m-0"
          >
            {c.hero.sub}
          </motion.p>
        </div>
        <ol
          className="m-0 p-0 list-none grid md:grid-cols-3 mt-14 md:mt-20 border-t border-timeline-line"
          aria-label="The three goals"
        >
          {c.goals.map((g) => (
            <li key={g.id} className="border-b md:border-b-0 md:border-r last:border-r-0 border-timeline-line md:px-6 md:first:pl-0 md:last:pr-0">
              <a
                href={`#goal-${g.id}`}
                className="group flex flex-col gap-3 h-full py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal"
              >
                <span className="font-heading font-black text-2xl tabular-nums text-accent-coral">{g.index}</span>
                <span className="font-heading font-bold text-xl md:text-2xl tracking-[-0.02em] leading-tight [text-wrap:balance]">
                  {g.short}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary group-hover:text-accent-coral transition-colors">
                  {g.target} →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Built() {
  const b = curatePlan.built;
  return (
    <section className={`${pad} py-16 md:py-24 bg-bg-secondary`} aria-labelledby="h-built">
      <div className="max-w-6xl mx-auto">
        <SectionLabel accent="teal">{b.label}</SectionLabel>
        <div className="mb-10 md:mb-14">
          <H2 id="h-built">{b.title}</H2>
        </div>
        <div className="grid md:grid-cols-2 gap-10 md:gap-8">
          {b.items.map((item) => (
            <article key={item.href} className="flex flex-col gap-4 min-w-0">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-timeline-line shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-4 focus-visible:ring-offset-bg-secondary"
                aria-label={`${item.cta} (opens in a new tab)`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="block w-full h-auto aspect-[16/9] object-cover object-top bg-bg-primary"
                />
              </a>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary m-0 mt-2">{item.kicker}</p>
              <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-[-0.025em] leading-tight m-0">{item.title}</h3>
              <p className="font-body text-text-secondary leading-relaxed m-0 max-w-prose">{item.detail}</p>
              {"fine" in item ? <p className="font-body text-sm text-text-muted m-0">{item.fine}</p> : null}
              <div className="mt-1">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-full border border-text-primary font-body font-semibold hover:bg-text-primary hover:text-text-inverse transition-colors"
                >
                  {item.cta} →
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="flex items-baseline gap-3 font-body text-lg text-text-primary mt-12 m-0">
          <span className="block w-2 h-2 bg-accent-teal shrink-0 translate-y-[-2px]" aria-hidden />
          {b.note}
        </p>
      </div>
    </section>
  );
}

function MoveList({ moves }: { moves: readonly Move[] }) {
  return (
    <ol className="m-0 p-0 list-none border-t border-timeline-line">
      {moves.map((m) => (
        <li key={m.title} className="py-5 border-b border-timeline-line">
          <h4 className="font-body font-semibold text-lg leading-snug m-0 mb-1">{m.title}</h4>
          <p className="font-body text-text-secondary leading-relaxed max-w-prose m-0">{m.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function GoalBlock({ goal }: { goal: Goal }) {
  return (
    <div id={`goal-${goal.id}`} className="grid md:grid-cols-[260px_1fr] gap-5 md:gap-12 scroll-mt-8">
      <div className="md:sticky md:top-24 self-start">
        <p className="font-heading font-black text-xl tabular-nums m-0">
          <span className="text-accent-coral">{goal.index}</span> <span className="text-timeline-line">/ 03</span>
        </p>
        <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-[-0.025em] leading-tight mt-3 mb-3 [text-wrap:balance]">
          {goal.title}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#1F7A7A] m-0">{goal.target}</p>
      </div>
      <div className="min-w-0">
        <MoveList moves={goal.moves} />
        {goal.triggers ? (
          <dl className="m-0 mt-1 mb-2 rounded-xl bg-bg-secondary px-5 py-2">
            {goal.triggers.map((t) => (
              <div key={t.seat} className="grid sm:grid-cols-[150px_1fr] gap-1 sm:gap-4 py-3 border-b last:border-b-0 border-timeline-line">
                <dt className="font-body font-semibold">{t.seat}</dt>
                <dd className="m-0 font-body text-text-secondary leading-relaxed">{t.when}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {goal.movesAfter ? <MoveList moves={goal.movesAfter} /> : null}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-3 mt-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{goal.measureLabel}</span>
          {goal.seats ? (
            <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
              {goal.seats.map((seat, i) => (
                <li
                  key={`${seat}-${i}`}
                  className={`font-body text-sm px-3 py-1.5 rounded-full border ${
                    i === 0 ? "border-accent-teal text-[#1F7A7A]" : "border-timeline-line text-text-secondary"
                  }`}
                >
                  {seat}
                </li>
              ))}
            </ul>
          ) : (
            <span className="font-body text-text-secondary">{goal.measure}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Plan() {
  const p = curatePlan.plan;
  return (
    <section className={`${pad} py-16 md:py-24`} aria-labelledby="h-plan">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>{p.label}</SectionLabel>
        <div className="grid md:grid-cols-[1fr_1fr] gap-6 md:gap-16 md:items-end mb-14 md:mb-20">
          <H2 id="h-plan">{p.title}</H2>
          <p className="font-body text-lg text-text-secondary leading-relaxed m-0 max-w-xl">{p.intro}</p>
        </div>
        <div className="grid gap-16 md:gap-24">
          {curatePlan.goals.map((g) => (
            <GoalBlock key={g.id} goal={g} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Days() {
  const d = curatePlan.days;
  return (
    <section className={`${pad} py-16 md:py-24`} aria-labelledby="h-days">
      <div className="max-w-6xl mx-auto">
        <SectionLabel accent="teal">{d.label}</SectionLabel>
        <div className="mb-10 md:mb-14">
          <H2 id="h-days">{d.title}</H2>
        </div>
        <ol className="m-0 p-0 list-none grid md:grid-cols-3 gap-4">
          {d.phases.map((ph) => (
            <li key={ph.range} className="flex flex-col gap-4 rounded-2xl border border-timeline-line p-6 bg-bg-primary">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary m-0">{ph.range}</p>
              <h3 className="font-heading font-bold text-3xl tracking-[-0.025em] m-0">{ph.title}</h3>
              <ul className="m-0 p-0 list-none grid gap-3">
                {ph.items.map((item) => (
                  <li key={item} className="flex gap-3 items-baseline font-body text-[15px] leading-relaxed text-text-secondary">
                    <span className="block w-1.5 h-1.5 bg-accent-teal shrink-0 translate-y-[-2px]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-4 border-t border-timeline-line font-body text-[15px] m-0">
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#1F7A7A] mb-1.5">Ships</span>
                {ph.ships}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Report() {
  const r = curatePlan.report;
  return (
    <section className={`${pad} py-16 md:py-24 bg-bg-secondary`} aria-labelledby="h-report">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>{r.label}</SectionLabel>
        <div className="grid md:grid-cols-[1fr_1fr] gap-6 md:gap-16 md:items-end mb-10 md:mb-14">
          <H2 id="h-report">{r.title}</H2>
          <p className="font-body text-lg text-text-secondary leading-relaxed m-0 max-w-xl">{r.intro}</p>
        </div>
        <ol className="m-0 p-0 list-none border-t border-timeline-line">
          {r.rows.map((row, i) => (
            <li key={row.number} className="grid grid-cols-[36px_1fr] md:grid-cols-[48px_1fr_1fr] gap-x-4 gap-y-1 py-5 border-b border-timeline-line items-baseline">
              <span className="font-heading font-black tabular-nums text-accent-coral row-span-2 md:row-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body font-semibold text-lg leading-snug">
                {row.number}
                {"goal" in row ? (
                  <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.16em] text-[#1F7A7A] border border-accent-teal rounded-full px-2 py-1">
                    {row.goal}
                  </span>
                ) : null}
              </span>
              <span className="font-body text-text-secondary leading-relaxed">{row.why}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Closing() {
  const c = curatePlan.closing;
  const email = socialLinks.find((link) => link.label === "Email")?.href;
  return (
    <section className={`${pad} py-20 md:py-28`} aria-labelledby="h-close">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          id="h-close"
          className="font-heading font-black tracking-[-0.03em] leading-[0.95] mb-5 [text-wrap:balance]"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)" }}
        >
          {c.cta}
        </h2>
        <p className="font-body text-text-secondary text-lg leading-relaxed mb-10">{c.sub}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {email ? (
            <a
              href={email}
              className="inline-flex items-center px-6 py-3 rounded-full bg-accent-coral text-white font-body font-semibold hover:bg-[#d9634a] transition-colors"
            >
              Get in touch
            </a>
          ) : null}
          <Link
            href={c.secondary.href}
            className="inline-flex items-center px-6 py-3 rounded-full border border-text-primary font-body font-semibold hover:bg-text-primary hover:text-text-inverse transition-colors"
          >
            {c.secondary.label}
          </Link>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted mt-14">{curatePlan.domain}</p>
        <div className="mt-4">
          <LegalLinks />
        </div>
      </div>
    </section>
  );
}

/** The hero animates on mount; everything below is static and readable at rest. */
export function CuratePage() {
  return (
    <MotionConfig reducedMotion="user">
      <Link
        href="/"
        className="fixed top-5 left-5 md:top-7 md:left-8 z-40 flex items-center gap-2 group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        aria-label="Back to home"
      >
        <span className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-text-primary bg-bg-primary group-hover:bg-accent-coral group-hover:border-accent-coral transition-all duration-300">
          <span className="font-heading font-bold text-[15px] md:text-[18px] tracking-[-0.03em] leading-none text-text-primary group-hover:text-white transition-colors duration-300">
            PS
          </span>
        </span>
      </Link>
      <StickyContact />
      <main className="relative bg-bg-primary text-text-primary">
        <Hero />
        <Built />
        <Plan />
        <EngineSection />
        <Days />
        <Report />
        <Closing />
      </main>
    </MotionConfig>
  );
}

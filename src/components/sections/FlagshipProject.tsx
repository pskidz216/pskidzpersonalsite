"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const stats = [
  { value: "23", label: "Skills" },
  { value: "14", label: "Commands" },
  { value: "6", label: "Agents" },
];

const capabilities = [
  {
    icon: "⚡",
    title: "Marketing Automation",
    description:
      "Campaign planning, content creation, brand voice profiling, and analytics reporting — all from the terminal.",
  },
  {
    icon: "🛠",
    title: "Development Workflow",
    description:
      "TDD-first dev bot, feature specs, ticket creation, project management, and verification loops built in.",
  },
  {
    icon: "📊",
    title: "Business Intelligence",
    description:
      "Portfolio dashboards, weekly reviews, prospect research, and SDR automation across every active project.",
  },
  {
    icon: "🚀",
    title: "Launch & Scale",
    description:
      "Business scaffolding, web builds, campaign briefs, and go-to-market playbooks — from idea to deployed.",
  },
];

const easeOutQuint = [0.22, 1, 0.36, 1] as [number, number, number, number];

function CountUp({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: easeOutQuint }}
      className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-accent-coral"
    >
      {value}
    </motion.span>
  );
}

function TerminalLine({
  delay,
  children,
}: {
  delay: number;
  children: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.4, ease: easeOutQuint }}
      className="flex items-center gap-2 font-mono text-sm md:text-base"
    >
      <span className="text-accent-coral select-none">❯</span>
      <span className="text-text-inverse/70">{children}</span>
    </motion.div>
  );
}

export function FlagshipProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Magnetic card effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -6);
    rotateY.set(x * 6);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      id="flagship"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-dark overflow-hidden"
    >
      {/* Subtle gradient orbs */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent-coral/8 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent-teal/8 blur-[120px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <h2 className="text-[13px] font-body font-medium uppercase tracking-[0.08em] text-text-inverse/40 whitespace-nowrap">
            Flagship Build
          </h2>
          <div className="h-[1px] flex-1 bg-text-inverse/10" />
        </motion.div>

        {/* Hero area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-28">
          {/* Left — Title + description */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp} className="mb-2">
              <span className="inline-block font-mono text-xs md:text-sm text-accent-coral/80 tracking-wider uppercase">
                Claude Code Plugin
              </span>
            </motion.div>

            <motion.h3
              variants={fadeUp}
              className="font-heading font-black text-text-inverse leading-[0.95] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              2.16 OS
            </motion.h3>

            <motion.p
              variants={fadeUp}
              className="font-body text-text-inverse/60 text-base md:text-lg leading-relaxed max-w-lg mb-8"
            >
              A personal operating system for Claude Code. 23 skills, 14 commands,
              and 6 specialized agents that handle marketing, development, and
              business automation — all from the terminal. One plugin to run
              everything.
            </motion.p>

            {/* Terminal preview */}
            <motion.div
              variants={fadeUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformPerspective: 800,
              }}
              className="rounded-xl border border-text-inverse/10 bg-text-inverse/[0.03] backdrop-blur-sm p-5 md:p-6 space-y-2.5"
            >
              <div className="flex items-center gap-1.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-coral/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-text-inverse/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-text-inverse/20" />
              </div>
              <TerminalLine delay={0.1}>
                /start-build — picks up next ticket, ships with TDD
              </TerminalLine>
              <TerminalLine delay={0.2}>
                /campaign-brief — generates full campaign plan
              </TerminalLine>
              <TerminalLine delay={0.3}>
                /prospect-research — deep dive on any company
              </TerminalLine>
              <TerminalLine delay={0.4}>
                /weekly-review — portfolio-wide status report
              </TerminalLine>
              <TerminalLine delay={0.5}>
                /launch — full go-to-market workflow
              </TerminalLine>
            </motion.div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-row lg:flex-col gap-8 md:gap-12 justify-center lg:justify-start"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center lg:text-left"
              >
                <CountUp value={stat.value} />
                <p className="font-body text-text-inverse/40 text-sm md:text-base uppercase tracking-[0.08em] mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Capabilities grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              className="group relative rounded-xl border border-text-inverse/8 bg-text-inverse/[0.02] p-6 md:p-8 transition-colors duration-300 hover:border-accent-coral/20 hover:bg-text-inverse/[0.04]"
            >
              <span className="text-2xl mb-4 block" role="img" aria-label={cap.title}>
                {cap.icon}
              </span>
              <h4 className="font-heading font-bold text-text-inverse text-lg md:text-xl mb-2">
                {cap.title}
              </h4>
              <p className="font-body text-text-inverse/50 text-[15px] leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

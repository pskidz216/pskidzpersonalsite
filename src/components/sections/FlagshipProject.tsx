"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionWithStickyTitle } from "@/components/ui/SectionWithStickyTitle";

const stats = [
  { value: "23", label: "Skills", color: "bg-accent-coral" },
  { value: "14", label: "Commands", color: "bg-accent-teal" },
  { value: "6", label: "Agents", color: "bg-accent-coral" },
];

const capabilities = [
  {
    title: "Marketing Automation",
    description:
      "Campaign planning, content creation, brand voice profiling, and analytics reporting — all from the terminal.",
    color: "border-accent-coral/30 hover:border-accent-coral",
    dot: "bg-accent-coral",
  },
  {
    title: "Development Workflow",
    description:
      "TDD-first dev bot, feature specs, ticket creation, project management, and verification loops built in.",
    color: "border-accent-teal/30 hover:border-accent-teal",
    dot: "bg-accent-teal",
  },
  {
    title: "Business Intelligence",
    description:
      "Portfolio dashboards, weekly reviews, prospect research, and SDR automation across every active project.",
    color: "border-accent-coral/30 hover:border-accent-coral",
    dot: "bg-accent-coral",
  },
  {
    title: "Launch & Scale",
    description:
      "Business scaffolding, web builds, campaign briefs, and go-to-market playbooks — from idea to deployed.",
    color: "border-accent-teal/30 hover:border-accent-teal",
    dot: "bg-accent-teal",
  },
];

const commands = [
  "/start-build",
  "/campaign-brief",
  "/prospect-research",
  "/weekly-review",
  "/launch",
  "/debug",
  "/verify",
  "/create-tickets",
];

const easeOutQuint = [0.22, 1, 0.36, 1] as [number, number, number, number];

function CommandPill({ command, delay }: { command: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.4, ease: easeOutQuint }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="inline-block font-mono text-xs md:text-sm px-3 py-1.5 rounded-full bg-accent-coral/10 text-accent-coral border border-accent-coral/20 cursor-default transition-colors duration-200 hover:bg-accent-coral/20"
    >
      {command}
    </motion.span>
  );
}

export function FlagshipProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const floatY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Magnetic card effect for terminal
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
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-primary overflow-hidden"
    >
      {/* Floating geometric shapes — parallax */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: floatY1, rotate: rotate1 }}
          className="absolute top-20 right-[10%] w-20 h-20 rounded-2xl border-2 border-accent-coral/15 bg-accent-coral/5"
        />
        <motion.div
          style={{ y: floatY2, rotate: rotate2 }}
          className="absolute top-1/3 left-[5%] w-14 h-14 rounded-full border-2 border-accent-teal/15 bg-accent-teal/5"
        />
        <motion.div
          style={{ y: floatY3 }}
          className="absolute bottom-32 right-[20%] w-10 h-10 rounded-lg border-2 border-accent-coral/10 bg-accent-coral/5 rotate-12"
        />
        <motion.div
          style={{ y: floatY1 }}
          className="absolute bottom-48 left-[15%] w-16 h-16 rounded-full border-2 border-accent-teal/10 bg-accent-teal/5"
        />
        {/* Large soft gradient blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-coral/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-teal/[0.04] blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionWithStickyTitle
          eyebrow="Flagship Build"
          title={
            <>
              2.16 <span className="text-accent-coral">OS</span>
            </>
          }
        >
        {/* Hero area */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start mb-20 md:mb-28">
          {/* Left — description (3 cols) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-3"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-block font-mono text-xs md:text-sm text-accent-teal tracking-wider uppercase font-medium">
                Claude Code Plugin
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="font-body text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mb-8"
            >
              A personal operating system for Claude Code. 23 skills, 14 commands,
              and 6 specialized agents that handle marketing, development, and
              business automation — all from the terminal. One plugin to run
              everything.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="flex gap-8 md:gap-12 mb-10"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: easeOutQuint }}
                    className="block font-heading font-black text-4xl md:text-5xl text-text-primary"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="font-body text-text-muted text-xs md:text-sm uppercase tracking-[0.08em] mt-1 block">
                    {stat.label}
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: easeOutQuint }}
                    className={`h-0.5 w-full ${stat.color} mt-2 origin-left rounded-full`}
                  />
                </div>
              ))}
            </motion.div>

            {/* Command pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {commands.map((cmd, i) => (
                <CommandPill key={cmd} command={cmd} delay={i * 0.06} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Terminal card (2 cols) */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 800,
            }}
            className="lg:col-span-2 relative rounded-2xl bg-bg-dark p-5 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-bg-dark/5 overflow-hidden"
          >
            {/* BorderBeam */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(var(--border-beam-angle, 0deg), transparent 70%, var(--accent-coral, #E8735A) 85%, transparent 100%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "1.5px",
                animation: "border-beam-spin 6s linear infinite",
              }}
            />
            {/* Terminal chrome */}
            <div className="flex items-center gap-1.5 mb-5">
              <div className="w-3 h-3 rounded-full bg-accent-coral" />
              <div className="w-3 h-3 rounded-full bg-accent-coral-light/60" />
              <div className="w-3 h-3 rounded-full bg-accent-teal/40" />
              <span className="ml-3 font-mono text-[11px] text-white/30">
                ~/2.16-os
              </span>
            </div>

            {/* Terminal lines */}
            <div className="space-y-3">
              {[
                { cmd: "/start-build", desc: "picking up next ticket..." },
                { cmd: "/campaign-brief", desc: "generating campaign plan..." },
                { cmd: "/prospect-research", desc: "deep dive on Acme Corp..." },
                { cmd: "/weekly-review", desc: "scanning 6 projects..." },
                { cmd: "/launch", desc: "running GTM workflow..." },
              ].map((line, i) => (
                <motion.div
                  key={line.cmd}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease: easeOutQuint }}
                >
                  <div className="flex items-center gap-2 font-mono text-xs md:text-sm">
                    <span className="text-accent-coral select-none">{">"}</span>
                    <span className="text-white font-medium">{line.cmd}</span>
                  </div>
                  <p className="font-mono text-[11px] md:text-xs text-white/30 ml-5 mt-0.5">
                    {line.desc}
                  </p>
                </motion.div>
              ))}
              {/* Blinking cursor */}
              <div className="flex items-center gap-2 font-mono text-xs md:text-sm">
                <span className="text-accent-coral select-none">{">"}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-2 h-4 bg-accent-coral/80"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Capabilities grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative rounded-2xl border-2 ${cap.color} bg-bg-primary p-6 md:p-8 transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${cap.dot} mb-4`} />
              <h4 className="font-heading font-bold text-text-primary text-lg md:text-xl mb-2">
                {cap.title}
              </h4>
              <p className="font-body text-text-secondary text-[15px] leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        </SectionWithStickyTitle>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ─── Data ─── */

interface Project {
  name: string;
  tag: string;
  description: string;
  tech: string;
}

const PROJECTS: Project[] = [
  {
    name: "BoldX Hub",
    tag: "Dashboard",
    description:
      "Portfolio company dashboard with interactive D3 radial charts, real-time deal pipeline tracking, and glassmorphic UI. Built for managing investments across the BoldX portfolio.",
    tech: "React, D3.js, Supabase, Framer Motion",
  },
  {
    name: "BoldX Portal",
    tag: "AI Agent",
    description:
      "AI-powered SDR platform with multi-agent architecture. Handles ICP scoring, prospect enrichment, LinkedIn coaching, and personalized outreach sequences from a single dashboard.",
    tech: "Next.js, Prisma, Anthropic SDK, Tailwind",
  },
  {
    name: "BXE Intake",
    tag: "Workflow",
    description:
      "10-step capital raise application wizard with file uploads, validation, and an admin review dashboard. Takes a company from first touch to fully submitted deal package.",
    tech: "React, React Router, Supabase",
  },
  {
    name: "American Labor Ladders",
    tag: "Product Site",
    description:
      "Product marketing site for the Game Changer Smart Ladder. Animated hero, spec breakdowns, and contact forms with smooth page transitions throughout.",
    tech: "React, Framer Motion, Vite",
  },
  {
    name: "Litcor",
    tag: "Company Site",
    description:
      "Full website for Florida's premier luxury shell subcontractor. Multi-page build with project showcases, service breakdowns, careers, and animated section reveals.",
    tech: "Next.js, Framer Motion, Tailwind, TypeScript",
  },
];

/* ─── Project Card ─── */

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -8);
    rotateY.set(x * 8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
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
      className="group py-6 cursor-default"
    >
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-heading font-bold text-text-primary text-lg md:text-xl">
          {project.name}
        </h3>
        <span className="font-body text-[11px] font-medium uppercase tracking-[0.08em] text-accent-coral bg-accent-coral/10 px-2 py-0.5 rounded-full">
          {project.tag}
        </span>
      </div>
      <p className="font-body text-text-secondary text-[15px] leading-relaxed">
        {project.description}
      </p>
      <p className="font-body text-text-muted text-sm mt-3 italic">
        {project.tech}
      </p>
    </motion.div>
  );
}

/* ─── Main Section ─── */

export function Built() {
  return (
    <section
      id="built"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading>What I&apos;ve Built</SectionHeading>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-body text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mb-12 md:mb-16"
        >
          Apps, dashboards, and AI tools I&apos;ve shipped using Claude Code.
          From internal platforms to client-facing products.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

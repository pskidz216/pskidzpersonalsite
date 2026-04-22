"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionWithStickyTitle } from "@/components/ui/SectionWithStickyTitle";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { projects, type Project } from "@/lib/data";

/* ─── Project Card ─── */

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
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
      className="group cursor-default rounded-xl overflow-hidden bg-bg-primary shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
    >
      {/* Screenshot preview */}
      {!imgError && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-bg-dark">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      {/* Card body */}
      <div className="p-5">
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
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */

export function Built() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      ref={sectionRef}
      id="built"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-secondary overflow-hidden"
    >
      <ParallaxLayer sectionRef={sectionRef} variant="coral" intensity="subtle" />
      <div className="relative max-w-7xl mx-auto">
        <SectionWithStickyTitle
          title={
            <>
              What I&apos;ve <span className="text-accent-coral">Built</span>
            </>
          }
        >
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </motion.div>
        </SectionWithStickyTitle>
      </div>
    </section>
  );
}

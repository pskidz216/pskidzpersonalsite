"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionWithStickyTitle } from "@/components/ui/SectionWithStickyTitle";
import { TiltCard } from "@/components/ui/TiltCard";
import { projects, type Project } from "@/lib/data";

/* ─── Project Card ─── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgError, setImgError] = useState(false);
  const pillColor =
    index % 2 === 0
      ? "text-accent-coral bg-accent-coral/10"
      : "text-accent-teal bg-accent-teal/10";

  return (
    <TiltCard
      inViewSelf
      maxTilt={10}
      className="group relative cursor-default rounded-xl bg-bg-primary shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
    >
      {/* Screenshot / video preview */}
      {project.video ? (
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-bg-dark">
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        !imgError && (
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-bg-dark">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          </div>
        )
      )}

      {/* Card body — floats above the card surface while tilting */}
      <div className="p-5 [transform:translateZ(30px)]">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-heading font-bold text-text-primary text-lg md:text-xl">
            {project.name}
          </h3>
          <span className={`inline-flex items-center font-body text-[11px] font-medium uppercase tracking-[0.08em] [text-indent:0.08em] leading-none ${pillColor} px-2.5 py-1 rounded-full`}>
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
    </TiltCard>
  );
}

/* ─── Main Section ─── */

export function Built() {
  return (
    <section
      id="built"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-secondary overflow-hidden"
    >
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
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </motion.div>
        </SectionWithStickyTitle>
      </div>
    </section>
  );
}

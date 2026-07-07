"use client";

import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionWithStickyTitle } from "@/components/ui/SectionWithStickyTitle";
import { TiltCard } from "@/components/ui/TiltCard";
import { skillBlocks, type SkillBlock } from "@/lib/data";

function SkillCard({ skill }: { skill: SkillBlock }) {
  return (
    <TiltCard
      inViewSelf
      maxTilt={7}
      liftScale={1.01}
      glare={false}
      shadow={false}
      className="group relative py-6 cursor-default"
    >
      <h3 className="font-heading font-bold text-text-primary text-lg md:text-xl [transform:translateZ(26px)]">
        {skill.title}
      </h3>
      <p className="font-body text-text-secondary text-[15px] leading-relaxed mt-3 [transform:translateZ(14px)]">
        {skill.description}
      </p>
      <p className="font-body text-text-muted text-sm mt-3 italic">
        {skill.tools}
      </p>
    </TiltCard>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionWithStickyTitle
          title={
            <>
              What I <span className="text-accent-coral">Do</span>
            </>
          }
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10"
          >
            {skillBlocks.map((skill) => (
              <SkillCard key={skill.title} skill={skill} />
            ))}
          </motion.div>
        </SectionWithStickyTitle>
      </div>
    </section>
  );
}

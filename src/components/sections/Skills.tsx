"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillBlocks, type SkillBlock } from "@/lib/data";

function TiltCard({ skill }: { skill: SkillBlock }) {
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
      className="group py-6 transition-shadow duration-300 cursor-default"
    >
      <h3 className="font-heading font-bold text-text-primary text-lg md:text-xl">
        {skill.title}
      </h3>
      <p className="font-body text-text-secondary text-[15px] leading-relaxed mt-3">
        {skill.description}
      </p>
      <p className="font-body text-text-muted text-sm mt-3 italic">
        {skill.tools}
      </p>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading>What I Do</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {skillBlocks.map((skill) => (
            <TiltCard key={skill.title} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

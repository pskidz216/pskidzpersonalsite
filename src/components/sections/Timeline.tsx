"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineNode } from "@/components/timeline/TimelineNode";
import { careerEntries } from "@/lib/data";

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading>The Journey</SectionHeading>

        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-[11px] md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[2px] bg-timeline-line" />

          {/* Timeline fill (scroll-driven) */}
          <motion.div
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
            className="absolute left-[11px] md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[2px] bg-timeline-active"
          />

          {/* Entries */}
          <div className="relative">
            {careerEntries.map((entry, i) => (
              <TimelineNode key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

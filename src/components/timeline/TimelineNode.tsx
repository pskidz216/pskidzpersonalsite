"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { TimelineMetric } from "./TimelineMetric";
import type { CareerEntry } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function TimelineNode({
  entry,
  index,
}: {
  entry: CareerEntry;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-[24px_1fr] md:grid-cols-[1fr_48px_1fr] gap-0 md:gap-0">
      {/* Left card (desktop only) */}
      <div className="hidden md:flex justify-end">
        {isLeft && <CardContent entry={entry} side="left" />}
      </div>

      {/* Center node + connector */}
      <div className="flex flex-col items-center relative md:col-start-2">
        {/* Node */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="w-3 h-3 rounded-full border-2 border-accent-coral bg-bg-secondary z-10 mt-2 shadow-[0_0_0_4px_rgba(232,115,90,0.15)]"
        />
        {/* Connector arm - mobile */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.3, ease }}
          className="md:hidden absolute top-[11px] left-[24px] w-4 h-[1.5px] bg-accent-coral origin-left"
        />
        {/* Connector arm - desktop left */}
        {isLeft && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.3, ease }}
            className="hidden md:block absolute top-[11px] right-[24px] w-6 h-[1.5px] bg-accent-coral origin-right"
          />
        )}
        {/* Connector arm - desktop right */}
        {!isLeft && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.3, ease }}
            className="hidden md:block absolute top-[11px] left-[24px] w-6 h-[1.5px] bg-accent-coral origin-left"
          />
        )}
      </div>

      {/* Right card (desktop only) */}
      <div className="hidden md:flex">
        {!isLeft && <CardContent entry={entry} side="right" />}
      </div>

      {/* Mobile card */}
      <div className="md:hidden pl-4 pb-12">
        <CardContent entry={entry} side="right" />
      </div>
    </div>
  );
}

function CardContent({
  entry,
  side,
}: {
  entry: CareerEntry;
  side: "left" | "right";
}) {
  const [expanded, setExpanded] = useState(false);

  const variants = {
    hidden: { opacity: 0, x: side === "left" ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`max-w-md pb-12 cursor-pointer ${side === "left" ? "text-right pr-6" : "pl-6"}`}
      onClick={() => setExpanded(!expanded)}
    >
      <motion.span
        variants={fadeUp}
        className="text-[14px] md:text-[15px] font-body font-medium uppercase tracking-[0.08em] text-text-muted"
      >
        {entry.dateRange}
      </motion.span>

      <h3
        className="font-heading font-bold text-text-primary mt-2 leading-tight"
        style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
      >
        {entry.company}
      </h3>

      <p className="font-body text-text-secondary text-base md:text-lg mt-1">
        {entry.role}
      </p>

      {/* Expand indicator */}
      <motion.span
        animate={{ rotate: expanded ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block text-accent-coral text-sm mt-3 select-none ${side === "left" ? "mr-0" : "ml-0"}`}
      >
        {expanded ? "▲" : "▼"}
      </motion.span>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-text-secondary text-base md:text-[17px] leading-relaxed mt-3">
              {entry.description}
            </p>

            <TimelineMetric
              value={entry.metric.value}
              label={entry.metric.label}
            />

            <div
              className={`flex flex-wrap gap-2 mt-4 ${side === "left" ? "justify-end" : ""}`}
            >
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] font-body text-text-muted border border-timeline-line rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

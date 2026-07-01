"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

type TierCardProps = {
  name: string;
  price: string;
  copy: string;
  emphasized?: boolean;
  badge?: string;
};

export function TierCard({ name, price, copy, emphasized, badge }: TierCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative flex h-full flex-col gap-4 rounded-2xl border p-7 md:p-8 ${
        emphasized
          ? "border-accent-coral bg-accent-coral/[0.04]"
          : "border-timeline-line bg-bg-primary"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-7 rounded-full bg-accent-coral px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
          {badge}
        </span>
      )}
      <h3 className="font-heading font-bold text-text-primary text-xl md:text-2xl tracking-tight">
        {name}
      </h3>
      <p className="font-mono text-accent-coral text-sm tracking-[0.05em]">
        {price}
      </p>
      <p className="font-body text-text-secondary text-base leading-relaxed">
        {copy}
      </p>
    </motion.div>
  );
}

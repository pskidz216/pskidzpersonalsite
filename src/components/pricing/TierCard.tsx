"use client";

import { TiltCard } from "@/components/ui/TiltCard";

type TierCardProps = {
  name: string;
  price: string;
  copy: string;
  emphasized?: boolean;
  badge?: string;
  accent?: "coral" | "teal";
};

export function TierCard({
  name,
  price,
  copy,
  emphasized,
  badge,
  accent = "coral",
}: TierCardProps) {
  const teal = accent === "teal";
  const emphasizedClasses = teal
    ? "border-accent-teal bg-accent-teal/[0.04]"
    : "border-accent-coral bg-accent-coral/[0.04]";

  return (
    <TiltCard
      maxTilt={5}
      liftScale={1.01}
      glare={false}
      shadow={false}
      className={`relative flex h-full flex-col gap-4 rounded-2xl border p-7 md:p-8 ${
        emphasized ? emphasizedClasses : "border-timeline-line bg-bg-primary"
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-3 left-7 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white ${
            teal ? "bg-accent-teal" : "bg-accent-coral"
          }`}
        >
          {badge}
        </span>
      )}
      <h3 className="font-heading font-bold text-text-primary text-xl md:text-2xl tracking-tight">
        {name}
      </h3>
      <p
        className={`font-mono text-sm tracking-[0.05em] ${
          teal ? "text-accent-teal" : "text-accent-coral"
        }`}
      >
        {price}
      </p>
      <p className="font-body text-text-secondary text-base leading-relaxed">
        {copy}
      </p>
    </TiltCard>
  );
}

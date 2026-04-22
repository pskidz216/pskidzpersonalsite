"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useParallax";

function parseMetric(value: string) {
  const prefix = value.match(/^[^0-9]*/)?.[0] || "";
  const suffix = value.match(/[^0-9.]*$/)?.[0] || "";
  const numStr = value.replace(prefix, "").replace(suffix, "");
  const num = parseFloat(numStr);
  const hasDecimal = numStr.includes(".");
  return { prefix, suffix, num, hasDecimal };
}

export function TimelineMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = usePrefersReducedMotion();
  const [animated, setAnimated] = useState("0");
  const { prefix, suffix, num, hasDecimal } = parseMetric(value);

  useEffect(() => {
    if (!isInView || prefersReduced) return;

    const duration = 800;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;

      if (hasDecimal) {
        setAnimated(`${prefix}${current.toFixed(1)}${suffix}`);
      } else {
        setAnimated(`${prefix}${Math.round(current)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setAnimated(value);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, prefersReduced, value, prefix, suffix, num, hasDecimal]);

  const display = !isInView
    ? `${prefix}0${suffix}`
    : prefersReduced
      ? value
      : animated;

  return (
    <div ref={ref} className="mt-4">
      <span className="font-mono text-accent-coral font-bold" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
        {display}
      </span>
      <p className="font-body text-[13px] text-text-muted mt-0.5">{label}</p>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  format?: "comma" | "plain";
};

export function Counter({
  target,
  prefix = "",
  suffix = "",
  duration = 1.2,
  className = "",
  style,
  format = "comma",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  const display =
    format === "comma" ? value.toLocaleString("en-US") : String(value);

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className}`}
      style={style}
      aria-label={`${prefix}${target}${suffix}`}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

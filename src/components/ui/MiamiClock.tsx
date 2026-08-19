"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { getMiamiClock, clockAngles } from "@/lib/miamiTime";

/**
 * Ambient-loop pattern (motion-patterns catalog): a giant, ghosted analog
 * clock behind the hero, running on Miami wall time. Second hand sweeps via
 * rAF; with prefers-reduced-motion it ticks once per second instead.
 * Purely decorative — the accessible time lives in <MiamiTimeReadout />.
 */
export function MiamiClock() {
  const svgRef = useRef<SVGSVGElement>(null);
  const hourRef = useRef<SVGGElement>(null);
  const minuteRef = useRef<SVGGElement>(null);
  const secondRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const paint = () => {
      const clock = getMiamiClock(new Date());
      const a = clockAngles(reduceMotion ? { ...clock, ms: 0 } : clock);
      hourRef.current?.setAttribute("transform", `rotate(${a.hourDeg} 100 100)`);
      minuteRef.current?.setAttribute("transform", `rotate(${a.minuteDeg} 100 100)`);
      secondRef.current?.setAttribute("transform", `rotate(${a.secondDeg} 100 100)`);
    };

    // Fade the face in only after the hands are set, so it never flashes at 12:00.
    paint();
    if (svgRef.current) svgRef.current.style.opacity = "1";

    if (reduceMotion) {
      interval = setInterval(paint, 1000);
    } else {
      const loop = () => {
        paint();
        raf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 200 200"
        className="w-[115vmin] h-[115vmin] max-w-none opacity-0 transition-opacity duration-1000 ease-out"
      >
        {/* Face ring */}
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#1A1A1A"
          strokeOpacity="0.06"
          strokeWidth="0.5"
        />
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="#1A1A1A"
          strokeOpacity="0.04"
          strokeWidth="0.35"
        />
        {/* Hour ticks — longer at the quarters */}
        {Array.from({ length: 12 }, (_, i) => {
          const quarter = i % 3 === 0;
          return (
            <line
              key={i}
              x1="100"
              y1={quarter ? 6.5 : 8.5}
              x2="100"
              y2={quarter ? 13 : 11.5}
              stroke="#1A1A1A"
              strokeOpacity={quarter ? 0.12 : 0.07}
              strokeWidth={quarter ? 0.9 : 0.5}
              strokeLinecap="round"
              transform={`rotate(${i * 30} 100 100)`}
            />
          );
        })}
        {/* Hour hand */}
        <g ref={hourRef}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="52"
            stroke="#1A1A1A"
            strokeOpacity="0.10"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
        {/* Minute hand */}
        <g ref={minuteRef}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="26"
            stroke="#1A1A1A"
            strokeOpacity="0.08"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
        {/* Second hand — coral, with counterweight */}
        <g ref={secondRef}>
          <line
            x1="100"
            y1="112"
            x2="100"
            y2="16"
            stroke="#E8735A"
            strokeOpacity="0.28"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <circle cx="100" cy="16" r="1.6" fill="#E8735A" fillOpacity="0.28" />
        </g>
        {/* Hub */}
        <circle cx="100" cy="100" r="2.2" fill="#1A1A1A" fillOpacity="0.10" />
        <circle cx="100" cy="100" r="0.9" fill="#E8735A" fillOpacity="0.3" />
      </svg>
    </div>
  );
}

/**
 * The live, accessible readout: "Miami, FL · 04:32:08 PM EDT".
 * Renders the static prefix until mounted so SSR and client HTML match.
 */
function subscribeToSeconds(onChange: () => void): () => void {
  const interval = setInterval(onChange, 250);
  return () => clearInterval(interval);
}

const currentSecond = () => Math.floor(Date.now() / 1000);
// Server snapshot is null → SSR renders the static label, no hydration drift.
const serverSecond = () => null;

export function MiamiTimeReadout() {
  const second = useSyncExternalStore(
    subscribeToSeconds,
    currentSecond,
    serverSecond,
  );

  if (second === null) return <span>Miami, FL</span>;

  const clock = getMiamiClock(new Date(second * 1000));
  return (
    <span>
      Miami, FL{" "}
      <span className="font-mono text-[0.8em] tabular-nums text-text-muted">
        · {clock.display} {clock.meridiem} {clock.tz}
      </span>
    </span>
  );
}

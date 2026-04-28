"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PAUL = { cx: 300, cy: 280, r: 56 };
const NODES = [
  { cx: 130, cy: 140, r: 46, label: "STACK", delay: 0.15 },
  { cx: 470, cy: 140, r: 46, label: "TEAM", delay: 0.32 },
  { cx: 300, cy: 440, r: 46, label: "DAY-TO-DAY", delay: 0.49 },
];

export function WorkflowGraph() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-[6/5]">
      <svg
        viewBox="0 0 600 500"
        className="w-full h-full"
        role="img"
        aria-label="Workflow graph showing connections from stack, team, and day-to-day operations"
      >
        {/* Edges */}
        {NODES.map((n) => (
          <motion.line
            key={`edge-${n.label}`}
            x1={n.cx}
            y1={n.cy}
            x2={PAUL.cx}
            y2={PAUL.cy}
            stroke="var(--color-accent-coral)"
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{
              pathLength: { duration: 0.9, delay: 0.85 + n.delay * 0.4, ease },
              opacity: { duration: 0.4, delay: 0.85 + n.delay * 0.4 },
            }}
          />
        ))}

        {/* Center node */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.65 }}
          style={{ transformBox: "fill-box", transformOrigin: `${PAUL.cx}px ${PAUL.cy}px` }}
        >
          <circle
            cx={PAUL.cx}
            cy={PAUL.cy}
            r={PAUL.r}
            fill="var(--color-accent-coral)"
          />
        </motion.g>

        {/* Outer nodes */}
        {NODES.map((n) => (
          <motion.g
            key={`node-${n.label}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 18,
              delay: n.delay,
            }}
            style={{ transformBox: "fill-box", transformOrigin: `${n.cx}px ${n.cy}px` }}
          >
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="var(--color-bg-primary)"
              stroke="var(--color-text-primary)"
              strokeWidth={1.4}
            />
            <text
              x={n.cx}
              y={n.cy}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-mono"
              fill="var(--color-text-primary)"
              fontSize={n.label.length > 5 ? 11 : 13}
              fontWeight="600"
              letterSpacing="0.12em"
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

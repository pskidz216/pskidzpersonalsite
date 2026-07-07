"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

const TILT_SPRING = { stiffness: 280, damping: 22 };
const GLARE_SPRING = { stiffness: 200, damping: 30 };

interface TiltCardProps {
  children: React.ReactNode;
  /** Applied to the tilting card. Must NOT include overflow-hidden —
   *  that flattens preserve-3d and kills child depth layers. */
  className?: string;
  /** Max rotation in degrees at the card edges. */
  maxTilt?: number;
  /** Scale while hovered. */
  liftScale?: number;
  /** Pointer-tracked light sheen across the card surface. */
  glare?: boolean;
  /** Peak glare opacity (0–1). */
  glareStrength?: number;
  /** Dynamic shadow that shifts opposite the tilt. Disable to keep a
   *  CSS shadow from className instead. */
  shadow?: boolean;
  /** Entry animation variants; defaults to fadeUp driven by a parent
   *  staggerContainer. */
  variants?: Variants;
  /** Trigger the entry animation on this card's own viewport entry
   *  instead of relying on a stagger parent. */
  inViewSelf?: boolean;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  liftScale = 1.02,
  glare = true,
  glareStrength = 0.25,
  shadow = true,
  variants = fadeUp,
  inViewSelf = false,
}: TiltCardProps) {
  const reduceMotion = useReducedMotion();

  // Pointer position normalized 0..1 across the card
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(py, [0, 1], [maxTilt, -maxTilt]),
    TILT_SPRING
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-maxTilt, maxTilt]),
    TILT_SPRING
  );
  const scale = useSpring(
    useTransform(hover, [0, 1], [1, liftScale]),
    TILT_SPRING
  );

  const glareX = useTransform(px, (v) => v * 100);
  const glareY = useTransform(py, (v) => v * 100);
  const glareOpacity = useSpring(
    useTransform(hover, (v) => v * glareStrength),
    GLARE_SPRING
  );
  const glareBackground = useMotionTemplate`radial-gradient(farthest-corner at ${glareX}% ${glareY}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 62%)`;

  // Shadow drifts opposite the tilt and deepens on hover
  const shadowX = useTransform(rotateY, (v) => v * -1.5);
  const shadowY = useTransform(rotateX, (v) => v * 1.5 + 8);
  const shadowBlur = useSpring(
    useTransform(hover, [0, 1], [16, 36]),
    GLARE_SPRING
  );
  const shadowAlpha = useSpring(
    useTransform(hover, [0, 1], [0.08, 0.16]),
    GLARE_SPRING
  );
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(26, 42, 58, ${shadowAlpha})`;

  const entryProps = inViewSelf
    ? ({
        initial: "hidden",
        whileInView: "visible",
        viewport: viewportOnce,
      } as const)
    : {};

  if (reduceMotion) {
    return (
      <motion.div variants={variants} {...entryProps} className={className}>
        {children}
      </motion.div>
    );
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    hover.set(1);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  }

  return (
    <motion.div
      variants={variants}
      {...entryProps}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        ...(shadow ? { boxShadow } : {}),
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: glareBackground,
            opacity: glareOpacity,
            transform: "translateZ(60px)",
          }}
        />
      )}
    </motion.div>
  );
}

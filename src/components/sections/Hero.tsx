"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { HeroVideo } from "@/components/ui/HeroVideo";

const nameWords = ["Paul", "Skidmore"];
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Magnetic headshot
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springX = useSpring(magnetX, { stiffness: 150, damping: 15 });
  const springY = useSpring(magnetY, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    magnetX.set((e.clientX - centerX) * 0.08);
    magnetY.set((e.clientY - centerY) * 0.08);
  }

  function handleMouseLeave() {
    magnetX.set(0);
    magnetY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <HeroVideo />
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-20 py-24">
        {/* Text */}
        <motion.div
          style={{ y: textY }}
          className="flex-1 text-center md:text-left order-2 md:order-1"
        >
          <h1
            className="font-heading font-black text-text-primary leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            {nameWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: i * 0.18, duration: 0.8, ease }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease }}
            className="text-text-secondary font-body font-semibold text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0"
          >
            AI Innovator · <span className="text-accent-coral font-bold">Human Connector</span> · Growth Strategist
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease }}
            className="text-text-muted font-body text-sm mt-4"
          >
            Miami, FL
          </motion.p>
        </motion.div>

        {/* Headshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease }}
          style={{ y: imageY, x: springX }}
          className="order-1 md:order-2 flex-shrink-0"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{ y: springY }}
            className="w-56 h-56 md:w-72 md:h-72 lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
          >
            <Image
              src="/images/headshot.jpg"
              alt="Paul Skidmore"
              width={720}
              height={720}
              priority
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

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
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { useParallax } from "@/lib/useParallax";

const nameWords = ["Paul", "Skidmore"];
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // 3-layer depth: background slowest (via ParallaxLayer), image medium, text fastest
  const textY = useParallax(scrollYProgress, -380);
  const imageY = useParallax(scrollYProgress, -200);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
      <ParallaxLayer sectionRef={sectionRef} variant="coral" intensity="subtle" />
      <div className="relative max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-20 py-24">
        {/* Text */}
        <motion.div
          style={{ y: textY }}
          className="flex-1 text-center md:text-left order-2 md:order-1"
        >
          <h1
            className="font-heading font-black text-text-primary leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)" }}
          >
            {nameWords.map((word, wi) => (
              <span
                key={word}
                className="inline-block overflow-hidden pb-[0.08em] mr-[0.25em] align-bottom"
              >
                <motion.span
                  initial={{ y: "110%", rotate: 8 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{
                    delay: 0.1 + wi * 0.14,
                    duration: 1,
                    ease,
                  }}
                  className="inline-block"
                >
                  {word.split("").map((char, ci) => (
                    <motion.span
                      key={`${word}-${ci}`}
                      initial={{ filter: "blur(20px)", opacity: 0 }}
                      animate={{ filter: "blur(0px)", opacity: 1 }}
                      transition={{
                        delay: 0.1 + wi * 0.14 + ci * 0.04,
                        duration: 0.6,
                        ease,
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease }}
            className="text-text-secondary font-body text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0"
          >
            AI Innovator · <span className="text-accent-coral font-medium">Human Connector</span> · Growth Strategist
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
            style={{ y: springY, scale: imageScale, rotate: imageRotate }}
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

      <motion.div style={{ opacity: scrollIndicatorOpacity }}>
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}

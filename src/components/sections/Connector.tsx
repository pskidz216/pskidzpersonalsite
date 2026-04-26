"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function Connector() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="inline-block mb-5">
          <span className="text-sm md:text-base font-body font-bold uppercase tracking-[0.22em] text-accent-coral">
            Superpower
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-heading font-bold text-text-primary leading-tight"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          I <span className="text-accent-coral">connect</span> people who
          should know each other.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-body text-text-secondary text-base md:text-lg leading-relaxed mt-5 max-w-2xl mx-auto"
        >
          I see both sides of the table: two businesses, two models, two sets of
          needs. And I make the introduction that creates something neither could
          build alone. It&apos;s not networking. It&apos;s pattern matching with people.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <div className="relative w-full max-w-2xl group">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[2.5rem] opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-90 motion-safe:animate-[pulse_6s_ease-in-out_infinite]"
              style={{
                background:
                  "radial-gradient(55% 55% at 28% 50%, rgba(232,115,90,0.40), transparent 65%), radial-gradient(55% 55% at 72% 50%, rgba(45,155,155,0.40), transparent 65%)",
              }}
            />
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.30)] transition-transform duration-700 group-hover:-translate-y-1">
              <video
                src="/videos/connector.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Two worlds meeting in the middle"
                className="block w-full h-auto"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-dark"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold text-text-inverse leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let&apos;s Build Something
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-body text-text-inverse/70 text-base md:text-lg leading-relaxed mt-6"
          >
            Whether it&apos;s a startup idea, a growth challenge, or a coffee — I&apos;m always down to chat. Especially at Panther if you&apos;re in Miami.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <a
              href="mailto:pskidmore216@gmail.com"
              className="group relative inline-block font-body text-text-inverse text-xl md:text-2xl font-medium"
            >
              pskidmore216@gmail.com
              <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent-coral origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-6 mt-8"
          >
            <a
              href="https://www.linkedin.com/in/paul-skidmore/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-text-inverse/60 text-sm hover:text-accent-coral transition-colors duration-200"
            >
              LinkedIn
            </a>
            <span className="w-[1px] h-4 bg-text-inverse/20" />
            <a
              href="mailto:pskidmore216@gmail.com"
              className="font-body text-text-inverse/60 text-sm hover:text-accent-coral transition-colors duration-200"
            >
              Email
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PSSeal } from "@/components/ui/PSSeal";

const links = [
  { label: "The Record", href: "#experience" },
  { label: "Systems", href: "#skills" },
  { label: "Builds", href: "#built" },
  { label: "Credentials", href: "#certifications" },
];

export function RedesignNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleClick(href: string) {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <nav className="rd-nav" aria-label="Primary">
        <div className="rd-nav_island rd-nav_island--seal">
          <a
            href="#"
            aria-label="Paul Skidmore — back to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <PSSeal className="w-10 h-10 text-text-primary hover:text-accent-coral transition-colors duration-300" />
          </a>
        </div>
        <div className="rd-nav_island rd-nav_island--links">
          {links.map((link) => (
            <button
              key={link.href}
              className="rd-nav_link"
              onClick={() => handleClick(link.href)}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="rd-nav_island">
          <button
            className="rd-nav_burger"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <a className="rd-nav_cta" href="mailto:pskidmore216@gmail.com">
            Get in touch
          </a>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rd-mobile-overlay"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08 + 0.1,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handleClick(link.href)}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerScrollTrigger } from "@/lib/gsapLenis";
import { PSSeal } from "@/components/ui/PSSeal";
import { MiamiTimeReadout } from "@/components/ui/MiamiClock";
import { socialLinks } from "@/lib/data";
import { observeReveals, prefersReducedMotion } from "./reveal";

/**
 * Closing section + site footer. Owns the legacy #contact anchor.
 */
export function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const emailHref =
    socialLinks.find((link) => link.label === "Email")?.href ??
    "mailto:pskidmore216@gmail.com";
  const linkedInHref =
    socialLinks.find((link) => link.label === "LinkedIn")?.href ??
    "https://www.linkedin.com/in/paul-skidmore/";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cleanupReveals = observeReveals(section);
    if (prefersReducedMotion()) return cleanupReveals;

    registerScrollTrigger();
    const ctx = gsap.context(() => {
      if (!titleRef.current) return;
      gsap.fromTo(
        titleRef.current,
        { opacity: 0.1, y: 80 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 35%",
            scrub: true,
          },
        }
      );
    }, section);

    return () => {
      cleanupReveals();
      ctx.revert();
    };
  }, []);

  return (
    <footer
      className="rd-section--warm rd-contact"
      id="contact"
      ref={sectionRef}
    >
      <div className="rd-contact_inner">
        <h2 className="rd-giant" ref={titleRef}>
          Let&#39;s talk
        </h2>
        <p className="rd-contact_sub" data-rd-reveal="">
          Open to conversations about revenue leadership, AI-driven sales
          systems, and hard growth problems. Miami based, working everywhere.
        </p>
        <div className="rd-contact_actions" data-rd-reveal="">
          <a className="rd-btn-coral" href={emailHref}>
            Get in touch
          </a>
          <a
            className="rd-btn-ghost"
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
        <div className="rd-footer_meta">
          <div className="rd-footer_left">
            <PSSeal className="w-9 h-9 text-text-primary" />
            <span className="rd-data">© 2026 Paul Skidmore</span>
          </div>
          <span className="rd-data rd-data--teal">
            <MiamiTimeReadout />
          </span>
          <span className="rd-data">AI · Growth · Strategy</span>
        </div>
      </div>
    </footer>
  );
}

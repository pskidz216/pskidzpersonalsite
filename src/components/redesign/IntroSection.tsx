"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerScrollTrigger } from "@/lib/gsapLenis";
import { observeReveals, prefersReducedMotion } from "./reveal";

const stats = [
  { value: "12", accent: "+", label: "Years in revenue" },
  { value: "$24", accent: "M", label: "2026 revenue target" },
  { value: "16", accent: "", label: "Certifications" },
  { value: "06", accent: "", label: "Chapters" },
];

/**
 * Mist seam (White Desert signature transition) + the short-version intro.
 * The fog is a sticky full-viewport layer that scales/condenses into this
 * section's paper background as the hero scrolls away underneath it.
 */
export function IntroSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mistHoldRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const cleanupReveals = observeReveals(wrap);
    if (prefersReducedMotion()) return cleanupReveals;

    registerScrollTrigger();
    const ctx = gsap.context(() => {
      const mistHold = mistHoldRef.current;
      if (mistHold) {
        ScrollTrigger.create({
          trigger: wrap,
          start: "top 90%",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            const fadeOut = 1 - Math.max(0, self.progress - 0.75) * 4;
            mistHold.style.opacity = String(
              Math.min(1, self.progress * 1.6) * fadeOut
            );
            mistHold.style.transform = `translateZ(0) scale(${
              1 + self.progress * 0.25
            })`;
          },
        });
      }

      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current,
          { "--rd-mask-position": -40 },
          {
            "--rd-mask-position": -200,
            ease: "none",
            scrollTrigger: {
              trigger: copyRef.current,
              start: "top 85%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );
      }
    }, wrap);

    return () => {
      cleanupReveals();
      ctx.revert();
    };
  }, []);

  return (
    <div className="rd-seam-wrap" ref={wrapRef}>
      <div className="rd-mist" aria-hidden>
        <div className="rd-mist_hold" ref={mistHoldRef}>
          <div className="rd-mist_img">
            <svg
              className="rd-mist_noise"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <filter id="rd-fog">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.004 0.009"
                  numOctaves="4"
                  seed="7"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 0.98  0 0 0 0.55 0"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#rd-fog)" />
            </svg>
          </div>
        </div>
      </div>

      <section className="rd-section--paper rd-pad" id="about">
        <div className="rd-intro_label" data-rd-reveal="opacity">
          <span className="rd-data rd-data--teal">
            [ 001 — The short version ]
          </span>
        </div>
        <p className="rd-intro_copy rd-text-scroll-fade" ref={copyRef}>
          Sales and marketing leader with twelve years at the intersection of
          healthcare, technology, and growth: from selling spinal implants in
          the operating room to leading sales and marketing for a precision
          manufacturing company. I build revenue pipelines, deploy AI and CRM
          systems that compound, and bring teams together to hit the number.
        </p>
        <div className="rd-stats">
          {stats.map((stat) => (
            <div className="rd-stat" data-rd-reveal="" key={stat.label}>
              <div className="rd-stat_value">
                {stat.value}
                {stat.accent && <span>{stat.accent}</span>}
              </div>
              <div className="rd-stat_label rd-data">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

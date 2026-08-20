"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerScrollTrigger } from "@/lib/gsapLenis";
import { observeReveals, prefersReducedMotion } from "./reveal";

export function RedesignHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cleanupReveals = observeReveals(section);
    if (prefersReducedMotion()) return cleanupReveals;

    registerScrollTrigger();
    const ctx = gsap.context(() => {
      if (!mediaRef.current) return;
      const travel = mediaRef.current.offsetHeight * 0.07;
      gsap.fromTo(
        mediaRef.current,
        { y: -travel },
        {
          y: travel,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, section);

    return () => {
      cleanupReveals();
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <header className="rd-hero" id="top" ref={sectionRef}>
      <div className="rd-hero_media" ref={mediaRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/headshot.jpg" alt="Paul Skidmore" />
      </div>
      <div className="rd-hero_scrim" />
      <div className="rd-hero_content">
        <div className="rd-hero_eyebrow" data-rd-reveal="">
          <span className="rd-label rd-label--wide">Paul Skidmore</span>
          <span className="rd-data">
            [ 25°46&#39;27&quot; N, 80°11&#39;37&quot; W — Miami, FL ]
          </span>
        </div>
        <h1 className="rd-hero_title" data-rd-reveal="">
          I build revenue engines, and the <em>AI systems</em> that run them.
        </h1>
        <div className="rd-hero_meta" data-rd-reveal="">
          <span className="rd-data">
            VP, Sales &amp; Marketing — BoldX Industries · Aerospace &amp;
            Defense
          </span>
          <div className="rd-hero_scrollcue">
            <span className="rd-data">Scroll</span>
            <i />
          </div>
        </div>
      </div>
    </header>
  );
}

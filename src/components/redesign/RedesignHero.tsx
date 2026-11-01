"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerScrollTrigger } from "@/lib/gsapLenis";
import { heroContent } from "@/lib/data";
import { requestOpenSection } from "@/lib/openSection";
import { observeReveals, prefersReducedMotion } from "./reveal";

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  requestOpenSection(href);
  target.scrollIntoView({ behavior: "smooth" });
}

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
        <img src="/images/headshot-hero.webp" alt="Paul Skidmore" fetchPriority="high" />
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
          {heroContent.titleLead} <em>{heroContent.titleAccent}</em>
        </h1>
        <p className="rd-hero_sub" data-rd-reveal="">
          {heroContent.sub}
        </p>
        <div className="rd-hero_actions" data-rd-reveal="">
          {heroContent.actions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className={action.primary ? "rd-btn-coral" : "rd-btn-ghost"}
              onClick={
                action.href.startsWith("#")
                  ? (event) => scrollToSection(event, action.href)
                  : undefined
              }
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerScrollTrigger } from "@/lib/gsapLenis";
import { prefersReducedMotion } from "./reveal";

/**
 * Tall parallax banner playing the seed film from the Spiritual Site build.
 * Carries the legacy #offclock anchor so old deep links still land here.
 */
export function SeedBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    const media = mediaRef.current;
    if (!banner || !media || prefersReducedMotion()) return;

    registerScrollTrigger();
    const ctx = gsap.context(() => {
      const travel = media.offsetHeight * 0.09;
      gsap.fromTo(
        media,
        { y: -travel },
        {
          y: travel,
          ease: "none",
          scrollTrigger: {
            trigger: banner,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, banner);

    return () => ctx.revert();
  }, []);

  return (
    <div className="rd-banner" id="offclock" ref={bannerRef}>
      <div className="rd-banner_inner">
        <div className="rd-banner_media" ref={mediaRef}>
          <video
            src="/projects/spiritual-site.mp4"
            poster="/projects/seed-poster.png"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="rd-banner_scrim" />
        <div className="rd-banner_caption">
          <span className="rd-data rd-data--teal">
            [ Selected build — scroll-driven parallax experience ]
          </span>
          <span className="rd-label">Designed and shipped with Claude Code</span>
        </div>
      </div>
    </div>
  );
}

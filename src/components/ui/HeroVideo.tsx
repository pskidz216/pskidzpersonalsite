"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP = { webm: "/hero/pingpong-loop.webm", mp4: "/hero/pingpong-loop.mp4" };
const MOBILE = { webm: "/hero/chrome-loop-mobile.webm", mp4: "/hero/chrome-loop-mobile.mp4" };

type Sources = typeof DESKTOP;

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sources, setSources] = useState<Sources | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setSources(isMobile ? MOBILE : DESKTOP);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !sources) return;

    el.muted = true;
    const tryPlay = () => {
      el.play().catch(() => {});
    };

    tryPlay();
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("loadeddata", tryPlay);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("loadeddata", tryPlay);
    };
  }, [sources]);

  if (!sources) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-60">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={sources.webm} type="video/webm" />
        <source src={sources.mp4} type="video/mp4" />
      </video>
    </div>
  );
}

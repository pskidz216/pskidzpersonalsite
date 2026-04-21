"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP_SRC = "/hero/pingpong-loop.mp4";
const MOBILE_SRC = "/hero/chrome-loop-mobile.mp4";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setSrc(isMobile ? MOBILE_SRC : DESKTOP_SRC);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;

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
  }, [src]);

  if (!src) return null;

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
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

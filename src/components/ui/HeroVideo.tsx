"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    setShouldPlay(true);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldPlay) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldPlay]);

  if (!shouldPlay) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-60">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero/pingpong-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

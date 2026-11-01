"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/components/redesign/reveal";

interface LoopingReelProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
  style?: CSSProperties;
  preload?: "none" | "metadata";
}

/** A silent reel that plays only while on screen and holds its poster for reduced motion. */
export function LoopingReel({ src, poster, label, className, style, preload = "metadata" }: LoopingReelProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // A refused autoplay leaves the poster up, which is the designed fallback.
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload={preload}
      className={className}
      style={style}
    />
  );
}

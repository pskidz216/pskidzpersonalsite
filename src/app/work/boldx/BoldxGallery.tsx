"use client";

import { type CSSProperties } from "react";
import { LoopingReel } from "@/components/ui/LoopingReel";
import type { GalleryItem } from "./content";

/** Section label for the dark bands: dot, mono caption, hairline. */
export function DarkSectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-10 md:mb-14">
      <span className="block w-1.5 h-1.5 rounded-full bg-accent-coral" aria-hidden />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
        {children}
      </span>
      <span className="h-[1px] flex-1 bg-white/15" aria-hidden />
    </div>
  );
}

const mediaClass = "block w-full h-auto rounded-lg object-cover bg-black ring-1 ring-white/10";

function GalleryTile({ item }: { item: GalleryItem }) {
  // Phones: landscape work runs full width first, portrait work pairs up below it.
  const phoneLayout =
    item.ratio > 1 ? "order-first md:order-none basis-full" : "basis-[calc(50%-0.5rem)] grow";
  return (
    <figure
      className={`m-0 min-w-0 ${phoneLayout} md:[flex:var(--ratio)_1_0%]`}
      style={{ "--ratio": item.ratio } as CSSProperties}
    >
      {item.video ? (
        <LoopingReel
          src={item.video}
          poster={item.src}
          label={item.alt}
          className={mediaClass}
          style={{ aspectRatio: item.ratio }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className={mediaClass}
          style={{ aspectRatio: item.ratio }}
        />
      )}
      <figcaption className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-text-muted mt-3 leading-relaxed">
        {item.caption}
      </figcaption>
    </figure>
  );
}

/** Rows are justified: every tile in a row shares a height, with no cropping. */
export function BoldxGallery({ label, rows }: { label: string; rows: GalleryItem[][] }) {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-bg-dark text-text-inverse">
      <div className="max-w-6xl mx-auto">
        <DarkSectionLabel>{label}</DarkSectionLabel>
        <div className="grid gap-8 md:gap-10">
          {rows.map((row) => (
            <div key={row[0]?.src} className="flex flex-wrap md:flex-nowrap gap-4 md:gap-5">
              {row.map((item) => (
                <GalleryTile key={item.src} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

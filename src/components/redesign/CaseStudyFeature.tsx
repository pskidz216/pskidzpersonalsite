"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { boldxFeature } from "@/app/work/boldx/feature";
import { observeReveals } from "./reveal";

/**
 * Home-page highlight for the BoldX case study, between the short version
 * and The Record. Static apart from the shared reveal entrances.
 */
export function CaseStudyFeature() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return observeReveals(section);
  }, []);

  const f = boldxFeature;
  return (
    <section
      className="rd-section--warm rd-pad rd-feature"
      id="boldx"
      ref={sectionRef}
    >
      <div className="rd-feature_grid">
        <div className="rd-feature_copy">
          <span
            className="rd-data rd-data--teal rd-feature_eyebrow"
            data-rd-reveal="opacity"
          >
            {f.eyebrow}
          </span>
          <h2 className="rd-feature_title" data-rd-reveal="">
            {f.title}
          </h2>
          <p className="rd-feature_sub" data-rd-reveal="">
            {f.sub}
          </p>
          <ul className="rd-feature_facts" data-rd-reveal="">
            {f.facts.map((fact) => (
              <li key={fact.label}>
                <b>{fact.value}</b>
                <span>{fact.label}</span>
              </li>
            ))}
          </ul>
          <div className="rd-feature_actions" data-rd-reveal="">
            <Link className="rd-btn-coral" href={f.href}>
              {f.cta}
            </Link>
          </div>
        </div>
        <Link
          className="rd-feature_media"
          href={f.href}
          aria-label={f.cta}
          data-rd-reveal=""
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rd-feature_back"
            src={f.back.src}
            alt={f.back.alt}
            width={1100}
            height={556}
            loading="lazy"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rd-feature_front"
            src={f.front.src}
            alt={f.front.alt}
            width={935}
            height={1210}
            loading="lazy"
          />
        </Link>
      </div>
    </section>
  );
}

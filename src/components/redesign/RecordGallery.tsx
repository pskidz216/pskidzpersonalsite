"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerScrollTrigger } from "@/lib/gsapLenis";
import { careerEntries } from "@/lib/data";
import { prefersReducedMotion } from "./reveal";

const typeLabels: Record<string, string> = {
  corporate: "Corporate",
  startup: "Startup",
  freelance: "Independent",
};

/**
 * Card copy tuned for the half-viewport panels — the data.ts descriptions
 * feed the old timeline's longer format; these stay under ~45 words.
 */
const descriptionOverrides: Record<string, string> = {
  boldx:
    "Leading sales and marketing for an aerospace, defense, and product assembly company specializing in hermetic connectors and precision CNC machining. Built AI-powered sales intelligence to automate prospecting and deal research, and drove the HubSpot-ERP integration behind it.",
};

/**
 * Pinned horizontal-scroll career gallery (White Desert camp-gallery
 * mechanic): vertical scroll scrubs a horizontal flex track inside a
 * sticky 100svh wrapper.
 */
export function RecordGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || prefersReducedMotion()) return;

    registerScrollTrigger();
    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const sizeSection = () => {
        section.style.height = `${window.innerHeight + distance()}px`;
      };
      sizeSection();

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: sizeSection,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0.15, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 15%",
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => {
      section.style.removeProperty("height");
      ctx.revert();
    };
  }, []);

  return (
    <section className="rd-hscroll" id="experience" ref={sectionRef}>
      <div className="rd-hscroll_wrapper">
        <div className="rd-hscroll_container" ref={trackRef}>
          <div className="rd-hpanel">
            <div className="rd-hpanel_intro">
              <span className="rd-data rd-data--teal">[ 2014 — Present ]</span>
              <h2 className="rd-giant" ref={titleRef}>
                The Record
              </h2>
              <p>
                Six chapters. Spine surgery to seed rounds to aerospace. Each
                one added a tool the next one needed.
              </p>
            </div>
          </div>

          {careerEntries.map((entry, i) => (
            <div className="rd-hpanel" key={entry.id}>
              <article className="rd-hcard">
                <div>
                  <div className="rd-hcard_top">
                    <span className="rd-data rd-data--teal">
                      [ {entry.dateRange} · {typeLabels[entry.type]} ]
                    </span>
                    <span className="rd-hcard_num">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(careerEntries.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="rd-hcard_company">{entry.company}</h3>
                  <div className="rd-hcard_role">{entry.role}</div>
                  <p className="rd-hcard_desc">
                    {descriptionOverrides[entry.id] ?? entry.description}
                  </p>
                </div>
                <div>
                  <div className="rd-hcard_metric">
                    <b>{entry.metric.value}</b>
                    <span>{entry.metric.label}</span>
                  </div>
                  <div className="rd-hcard_tags">
                    {entry.tags.map((tag) => (
                      <span className="rd-hcard_tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
        <div className="rd-hscroll_progress">
          <i ref={progressRef} />
        </div>
      </div>
    </section>
  );
}

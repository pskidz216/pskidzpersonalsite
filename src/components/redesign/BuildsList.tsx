"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import { DropdownPanel, DropdownToggle, useOpenRequest } from "@/components/ui/Dropdown";
import { observeReveals } from "./reveal";

/**
 * Full-width build rows with the clip-path photo reveal on hover
 * (White Desert trip-list mechanic). Owns the legacy #built anchor.
 * Rows with an href are links: a case study on this site or the live build.
 */
export function BuildsList() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const openSection = useCallback(() => setOpen(true), []);
  useOpenRequest("built", openSection);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return observeReveals(section);
  }, []);

  return (
    <section
      className="rd-section--paper rd-pad rd-pad--tight-top rd-dropsection"
      data-open={open}
      id="built"
      ref={sectionRef}
    >
      <div className="rd-builds_head">
        <h2 data-rd-reveal="">
          <DropdownToggle
            open={open}
            controls="built-panel"
            onToggle={() => setOpen((current) => !current)}
          >
            Built by hand
          </DropdownToggle>
        </h2>
        <span className="rd-data rd-data--teal" data-rd-reveal="opacity">
          [ 003 — Shipped work · hover to preview ]
        </span>
      </div>

      <DropdownPanel id="built-panel" open={open}>
        <div className="rd-builds_list">
          {projects.map((project) => {
            const external = project.href?.startsWith("http");
            const inner = (
              <>
                <span className="rd-build-row_name">{project.name}</span>
                <span className="rd-build-row_tag rd-data">{project.tag}</span>
                <span className="rd-build-row_tech">
                  {project.tech.split(", ").join(" · ")}
                </span>
                <span className="rd-preview" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={`Preview of ${project.name}`} />
                </span>
              </>
            );

            if (project.href) {
              return (
                <a
                  className="rd-build-row"
                  key={project.name}
                  href={project.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {inner}
                </a>
              );
            }

            return (
              <div className="rd-build-row" key={project.name}>
                {inner}
              </div>
            );
          })}
        </div>
      </DropdownPanel>
    </section>
  );
}

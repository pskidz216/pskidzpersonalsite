"use client";

import { useEffect, useRef } from "react";
import { skillBlocks } from "@/lib/data";
import { observeReveals } from "./reveal";

/**
 * Six-system grid with pulsing instrument nodes. Owns the legacy #skills
 * anchor, plus #ai and #flagship alias anchors from the old section map.
 */
export function SystemsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return observeReveals(section);
  }, []);

  return (
    <section className="rd-section--warm rd-pad" id="skills" ref={sectionRef}>
      <span className="rd-anchor" id="ai" aria-hidden />
      <div className="rd-systems_head">
        <span className="rd-data rd-data--teal" data-rd-reveal="opacity">
          [ 002 — What I run ]
        </span>
        <h2 data-rd-reveal="">Six systems. One operator.</h2>
        <p data-rd-reveal="">
          Complex problems get the same treatment every time: strip them to
          first principles, instrument what actually matters, automate the
          repeatable, and keep human judgment where it counts. These six
          systems are what that method built. Automated where they should be,
          personal where it matters.
        </p>
      </div>
      <div className="rd-systems_grid">
        {skillBlocks.map((block, i) => (
          <div className="rd-syscard" data-rd-reveal="" key={block.title}>
            <div
              className="rd-node"
              style={{ "--rd-index": i } as React.CSSProperties}
            >
              <div className="rd-node_dot" />
              <i />
              <i />
            </div>
            <h3>{block.title}</h3>
            <p>{block.description}</p>
            <div className="rd-syscard_tools rd-data">{block.tools}</div>
          </div>
        ))}
      </div>
      <span className="rd-anchor" id="flagship" aria-hidden />
    </section>
  );
}

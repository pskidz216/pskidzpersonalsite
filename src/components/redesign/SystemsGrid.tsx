"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { skillBlocks } from "@/lib/data";
import { allIndexes, toggleIndex } from "@/lib/openSection";
import { DropdownPanel, DropdownToggle, useOpenRequest } from "@/components/ui/Dropdown";
import { observeReveals } from "./reveal";

/**
 * Six-system grid with pulsing instrument nodes. Owns the legacy #skills
 * anchor, plus #ai and #flagship alias anchors from the old section map.
 */
export function SystemsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openCards, setOpenCards] = useState<ReadonlySet<number>>(new Set());
  const openAll = useCallback(() => setOpenCards(allIndexes(skillBlocks.length)), []);
  useOpenRequest("skills", openAll);
  const everyOpen = openCards.size === skillBlocks.length;

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
      <div className="rd-systems_controls" data-rd-reveal="opacity">
        <button
          type="button"
          className="rd-systems_all rd-data"
          onClick={() => setOpenCards(everyOpen ? new Set() : allIndexes(skillBlocks.length))}
        >
          {everyOpen ? "Close all" : "Open all"}
        </button>
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
            <h3>
              <DropdownToggle
                open={openCards.has(i)}
                controls={`system-panel-${i}`}
                onToggle={() => setOpenCards((current) => toggleIndex(current, i))}
              >
                {block.title}
              </DropdownToggle>
            </h3>
            <DropdownPanel id={`system-panel-${i}`} open={openCards.has(i)}>
              <p>{block.description}</p>
              <div className="rd-syscard_tools rd-data">{block.tools}</div>
            </DropdownPanel>
          </div>
        ))}
      </div>
      <span className="rd-anchor" id="flagship" aria-hidden />
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OFF_CLOCK_ACTIVITIES, nextActivityIndex } from "@/lib/offClock";
import { observeReveals, prefersReducedMotion } from "./reveal";

const ROTATE_MS = 2400;

/**
 * Off the clock — rotating spare-time line carried over from the legacy
 * homepage. Owns the legacy #offclock anchor.
 */
export function OffClockSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(false);

  const advance = useCallback(() => {
    setCurrent((prev) => nextActivityIndex(prev, OFF_CLOCK_ACTIVITIES.length));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cleanupReveals = observeReveals(section);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);

    return () => {
      cleanupReveals();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const interval = setInterval(advance, ROTATE_MS);
    return () => clearInterval(interval);
  }, [inView, advance]);

  return (
    <section
      className="rd-section--paper rd-pad rd-offclock"
      id="offclock"
      ref={sectionRef}
    >
      <div className="rd-offclock_head">
        <h2 data-rd-reveal="">Off the clock</h2>
        <span className="rd-data rd-data--teal" data-rd-reveal="opacity">
          [ 005 — Spare time ]
        </span>
      </div>

      <p className="rd-offclock_lede rd-data" data-rd-reveal="opacity">
        When I&apos;m not working, you&apos;ll find me
      </p>

      <div className="rd-offclock_stage" data-rd-reveal="" aria-live="polite">
        <span className="rd-offclock_word" key={OFF_CLOCK_ACTIVITIES[current]}>
          {OFF_CLOCK_ACTIVITIES[current]}
        </span>
      </div>

      <div className="rd-offclock_list" data-rd-reveal="opacity">
        {OFF_CLOCK_ACTIVITIES.map((activity, i) => (
          <button
            className={`rd-offclock_item rd-data ${
              i === current ? "rd-offclock_item--active" : ""
            }`}
            key={activity}
            onClick={() => setCurrent(i)}
            type="button"
          >
            <span className="rd-offclock_index">
              {String(i + 1).padStart(2, "0")}
            </span>
            {activity}
          </button>
        ))}
      </div>
    </section>
  );
}

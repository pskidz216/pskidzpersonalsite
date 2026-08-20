"use client";

import { useState } from "react";

const steps = [
  {
    num: "01",
    title: "Diagnose",
    body: "A structured teardown of your funnel, site, and pipeline. Real data, not opinions. You get the findings whether we work together or not.",
  },
  {
    num: "02",
    title: "Prioritize",
    body: "Every fix ranked by expected impact against effort. The roadmap reads top to bottom; so does the return.",
  },
  {
    num: "03",
    title: "Sprint",
    body: "Ninety days of building. Systems ship weekly: automation, creative, pipeline, whatever the diagnostic ordered.",
  },
  {
    num: "04",
    title: "Compound",
    body: "The systems keep running after I step back. That is the point of building them as systems.",
  },
];

/**
 * Right-edge flyout tab — keeps the engagement process one click away on
 * every scroll position (White Desert sticky-flyout mechanic).
 */
export function HowIWorkFlyout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="rd-flyout-tab" onClick={() => setOpen(true)}>
        How I work
      </button>
      <div
        className={`rd-flyout ${open ? "rd-active" : ""}`}
        aria-hidden={!open}
      >
        <button
          className="rd-flyout_overlay"
          aria-label="Close panel"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <aside className="rd-flyout_panel" data-lenis-prevent="true">
          <button
            className="rd-flyout_close"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Close ✕
          </button>
          <h2>
            Diagnostic first.
            <br />
            Then the sprint.
          </h2>
          <p>
            No retainers for the sake of retainers. Every engagement starts by
            finding where revenue actually leaks, then fixing it in order of
            return.
          </p>
          {steps.map((step) => (
            <div className="rd-step" key={step.num}>
              <span className="rd-step_num">{step.num}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
          <div className="rd-flyout_cta">
            <a
              className="rd-btn-coral"
              href="mailto:pskidmore216@gmail.com"
              tabIndex={open ? 0 : -1}
            >
              Book the diagnostic
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}

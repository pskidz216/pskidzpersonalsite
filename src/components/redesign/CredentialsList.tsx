"use client";

import { useEffect, useRef } from "react";
import { certifications } from "@/lib/data";
import { observeReveals } from "./reveal";

/**
 * Certification ledger — hairline table rows. Owns the legacy
 * #certifications anchor.
 */
export function CredentialsList() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return observeReveals(section);
  }, []);

  return (
    <section
      className="rd-section--paper rd-pad rd-pad--tight-top"
      id="certifications"
      ref={sectionRef}
    >
      <div className="rd-certs_head">
        <h2 data-rd-reveal="">The paper trail</h2>
        <span className="rd-data rd-data--teal" data-rd-reveal="opacity">
          [ 004 — {certifications.length} certifications ]
        </span>
      </div>
      <div>
        {certifications.map((cert) => (
          <div
            className="rd-cert-row"
            data-rd-reveal="opacity"
            key={`${cert.name}-${cert.date}`}
          >
            <span className="rd-cert-row_name">{cert.name}</span>
            <span
              className={`rd-cert-row_issuer rd-data ${
                cert.issuer === "Anthropic" ? "rd-cert-row_issuer--anthropic" : ""
              }`}
            >
              {cert.issuer}
            </span>
            <span className="rd-cert-row_date rd-data">{cert.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

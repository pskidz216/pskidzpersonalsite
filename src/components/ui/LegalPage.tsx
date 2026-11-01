import Link from "next/link";
import { LEGAL_UPDATED, type LegalSection } from "@/lib/legal";
import { LegalLinks } from "./LegalLinks";

export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary px-6 md:px-12 py-16 md:py-24">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted hover:text-accent-coral transition-colors"
        >
          Back to home
        </Link>
        <h1 className="font-heading font-black tracking-[-0.03em] leading-[0.95] text-5xl md:text-6xl mt-10 mb-4">
          {title}
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted mb-12">
          Last updated {LEGAL_UPDATED}
        </p>
        <div className="grid gap-9">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-body font-semibold text-lg mb-2">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="font-body text-text-secondary leading-relaxed mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        <footer className="mt-16 pt-6 border-t border-timeline-line">
          <LegalLinks />
        </footer>
      </article>
    </main>
  );
}

import Link from "next/link";
import { curatePlan } from "./content";
import { UnlockForm } from "./UnlockForm";

/** Shown at /curate until the visitor enters the password. Renders none of the plan. */
export function CurateLogin() {
  return (
    <main className="min-h-[100svh] flex flex-col bg-bg-primary text-text-primary px-6 md:px-12 lg:px-20 py-6 md:py-8">
      <Link
        href="/"
        className="self-start flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-text-primary hover:bg-accent-coral hover:border-accent-coral hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        aria-label="Back to home"
      >
        <span className="font-heading font-bold text-[15px] md:text-[18px] tracking-[-0.03em] leading-none">PS</span>
      </Link>

      <div className="flex-1 flex items-center py-12">
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-16 md:items-end">
          <div>
            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-accent-teal mb-6">
              {curatePlan.eyebrow}
            </p>
            <h1
              className="font-heading font-black leading-[0.92] tracking-[-0.03em] [text-wrap:balance] m-0"
              style={{ fontSize: "clamp(2.75rem, 7.5vw, 6rem)" }}
            >
              {curatePlan.hero.h1}
            </h1>
          </div>
          <div className="max-w-md">
            <p className="font-body text-text-secondary text-lg leading-relaxed m-0">
              This plan is private. Enter the password I sent you.
            </p>
            <UnlockForm />
          </div>
        </div>
      </div>

      <p className="m-0 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
        Paul Skidmore · paulskidmoreii.com
      </p>
    </main>
  );
}

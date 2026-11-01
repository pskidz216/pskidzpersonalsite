"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { readConsent, writeConsent, type Consent } from "@/lib/analyticsConsent";

const listeners = new Set<() => void>();
/** Holds the choice for this visit when the browser refuses storage. */
let sessionChoice: Consent | null = null;

function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getSnapshot(): Consent | "undecided" {
  return sessionChoice ?? readConsent(browserStorage()) ?? "undecided";
}

/** Nothing renders on the server, so returning visitors never see the banner flash. */
function getServerSnapshot() {
  return "unknown" as const;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function choose(choice: Consent) {
  sessionChoice = choice;
  writeConsent(browserStorage(), choice);
  listeners.forEach((listener) => listener());
}

/** Loads analytics only after a yes, and asks once. */
export function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (consent === "accepted") return <Analytics />;
  if (consent !== "undecided") return null;

  return (
    <div
      role="region"
      aria-label="Analytics choice"
      className="fixed inset-x-3 bottom-3 md:inset-x-6 md:bottom-3 z-[900] rounded-2xl bg-bg-dark text-text-inverse p-4 md:px-5 md:py-2.5 md:flex md:items-center md:justify-between md:gap-6 shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
    >
      <p className="font-body text-[13px] leading-snug">
        This site counts page views with privacy-friendly analytics. No cookies, no ad tracking.{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          Privacy
        </Link>
      </p>
      <div className="mt-3 md:mt-0 flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-full bg-accent-coral px-4 py-1.5 font-body text-[13px] font-semibold text-white"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("declined")}
          className="rounded-full border border-white/30 px-4 py-1.5 font-body text-[13px] font-medium"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

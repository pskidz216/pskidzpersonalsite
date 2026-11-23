"use client";

import { useState } from "react";
import type { SampleRow } from "./content";

type Status = "approved" | "skipped";

const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

const tierClass: Record<SampleRow["tier"], string> = {
  1: "bg-text-primary text-text-inverse",
  2: "border border-accent-teal text-[#1F7A7A]",
  3: "border border-timeline-line text-text-secondary",
};

function TierBadge({ tier }: { tier: SampleRow["tier"] }) {
  return (
    <span
      className={`shrink-0 inline-flex items-center justify-center w-9 h-7 rounded-md font-mono text-[11px] tracking-[0.08em] ${tierClass[tier]}`}
    >
      T{tier}
    </span>
  );
}

/** A working sample of the rep's morning list: pick an account, read its AI first draft, approve, edit or skip. */
export function MorningList({ label, title, rows }: { label: string; title: string; rows: readonly SampleRow[] }) {
  const firstLive = rows.find((r) => r.draft)?.id ?? rows[0]?.id;
  const [selectedId, setSelectedId] = useState(firstLive);
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);

  const selected = rows.find((r) => r.id === selectedId) ?? rows[0];
  if (!selected) return null;
  const draft = edits[selected.id] ?? selected.draft ?? "";
  const state = status[selected.id];

  const pick = (id: string) => {
    setSelectedId(id);
    setEditing(false);
  };
  const mark = (s: Status) => {
    setStatus((prev) => ({ ...prev, [selected.id]: s }));
    setEditing(false);
    if (s === "skipped") {
      const next = rows.find((r) => r.draft && r.id !== selected.id && !status[r.id]);
      if (next) setSelectedId(next.id);
    }
  };

  return (
    <div className="rounded-2xl bg-bg-primary text-text-primary shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 px-5 md:px-6 py-4 border-b border-timeline-line">
        <span className="font-heading font-bold text-lg tracking-[-0.02em]">{title}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-md bg-accent-coral/15 text-[#C2543C]">
          {label}
        </span>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary">
          SDR · Mon
        </span>
      </div>
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <ul className="m-0 p-0 list-none border-b md:border-b-0 md:border-r border-timeline-line">
          {rows.map((row) => {
            const on = row.id === selected.id;
            const done = status[row.id];
            return (
              <li key={row.id} className="border-b last:border-b-0 border-timeline-line">
                <button
                  type="button"
                  onClick={() => pick(row.id)}
                  disabled={Boolean(row.cooling)}
                  aria-pressed={on}
                  className={`w-full text-left flex gap-3 px-5 md:px-6 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-teal ${
                    on ? "bg-bg-secondary" : "hover:bg-bg-secondary/60"
                  } ${row.cooling ? "opacity-55 cursor-not-allowed" : ""}`}
                >
                  <TierBadge tier={row.tier} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="font-body font-semibold leading-snug">{row.company}</span>
                      {done ? (
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1F7A7A]">
                          {done === "approved" ? "Approved" : "Skipped"}
                        </span>
                      ) : null}
                    </span>
                    <span className="block text-sm text-text-secondary leading-snug mt-1">
                      {row.cooling ?? row.why}
                    </span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted mt-2">
                      {row.segment} · {row.sources}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="p-5 md:p-6 flex flex-col gap-4 min-w-0" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded-md ${
                selected.tier === 1 ? "bg-text-primary text-text-inverse" : "border border-accent-teal text-[#1F7A7A]"
              }`}
            >
              {selected.lane}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
              AI first draft · {wordCount(draft)} words
            </span>
          </div>
          <p className="m-0 text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">Why today:</span> {selected.why}
          </p>
          {editing ? (
            <label className="block">
              <span className="sr-only">Edit the draft</span>
              <textarea
                id={`draft-${selected.id}`}
                value={draft}
                onChange={(e) => setEdits((prev) => ({ ...prev, [selected.id]: e.target.value }))}
                rows={7}
                className="w-full rounded-xl border border-timeline-line bg-bg-primary p-4 font-body text-[15px] leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal"
              />
            </label>
          ) : (
            <p className="m-0 rounded-xl bg-bg-secondary p-4 font-body text-[15px] leading-relaxed">{draft}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            {state === "approved" ? (
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#1F7A7A]">
                Approved · ready to send, nothing sent
              </span>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => mark("approved")}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-text-primary text-text-inverse font-body text-sm font-semibold hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setEditing((v) => !v)}
                  aria-pressed={editing}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-text-primary font-body text-sm font-semibold hover:bg-bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2"
                >
                  {editing ? "Done editing" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={() => mark("skipped")}
                  className="inline-flex items-center px-4 py-2 rounded-full font-body text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2"
                >
                  Skip
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

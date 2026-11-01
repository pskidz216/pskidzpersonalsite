export const OPEN_SECTION_EVENT = "rd:open-section";

/** The section id of an in-page link like "#built"; null for anything else. */
export function sectionIdFromHref(href: string): string | null {
  return href.startsWith("#") && href.length > 1 ? href.slice(1) : null;
}

/** Tells a collapsed section to open, so a link never lands on a closed one. */
export function requestOpenSection(href: string): void {
  const id = sectionIdFromHref(href);
  if (!id) return;
  window.dispatchEvent(new CustomEvent(OPEN_SECTION_EVENT, { detail: id }));
}

export function toggleIndex(open: ReadonlySet<number>, index: number): ReadonlySet<number> {
  const next = new Set(open);
  if (next.has(index)) next.delete(index);
  else next.add(index);
  return next;
}

export function allIndexes(count: number): ReadonlySet<number> {
  return new Set(Array.from({ length: count }, (_, i) => i));
}

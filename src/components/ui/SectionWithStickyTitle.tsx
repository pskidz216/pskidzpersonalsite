"use client";

import type { ReactNode } from "react";
import { StickySectionTitle } from "./StickySectionTitle";

interface Props {
  title: ReactNode;
  eyebrow?: string;
  children: ReactNode;
  /** When true, the sticky column is narrower (for content-heavy sections). */
  narrowTitle?: boolean;
}

/**
 * Two-column layout with a sticky title on the left (desktop) and scrollable
 * content on the right. On mobile, stacks vertically and disables sticky.
 */
export function SectionWithStickyTitle({
  title,
  eyebrow,
  children,
  narrowTitle = false,
}: Props) {
  const cols = narrowTitle
    ? "md:grid-cols-[minmax(0,18rem)_1fr]"
    : "md:grid-cols-[minmax(0,22rem)_1fr]";

  return (
    <div className={`grid grid-cols-1 gap-10 md:gap-16 ${cols}`}>
      <StickySectionTitle eyebrow={eyebrow}>{title}</StickySectionTitle>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

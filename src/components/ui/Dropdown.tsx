"use client";

import { useEffect, useState, type ReactNode, type TransitionEvent } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerScrollTrigger } from "@/lib/gsapLenis";
import { OPEN_SECTION_EVENT } from "@/lib/openSection";

const SCROLL_IDLE_MS = 250;
let refreshPending = false;

/**
 * The page height changed, so scroll-driven sections below need new positions.
 * Waits for scrolling to stop, because a refresh cancels a smooth scroll in progress.
 */
function refreshWhenScrollStops() {
  if (refreshPending) return;
  refreshPending = true;
  let timer = 0;
  const finish = () => {
    window.removeEventListener("scroll", restart);
    refreshPending = false;
    registerScrollTrigger();
    ScrollTrigger.refresh();
  };
  function restart() {
    window.clearTimeout(timer);
    timer = window.setTimeout(finish, SCROLL_IDLE_MS);
  }
  window.addEventListener("scroll", restart, { passive: true });
  restart();
}

/** Opens a section when a link asks for it, or when the page arrives on its anchor. */
export function useOpenRequest(sectionId: string, onOpen: () => void) {
  useEffect(() => {
    const handle = (event: Event) => {
      if ((event as CustomEvent<string>).detail === sectionId) onOpen();
    };
    const handleHash = () => {
      if (window.location.hash === `#${sectionId}`) onOpen();
    };
    window.addEventListener(OPEN_SECTION_EVENT, handle);
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return () => {
      window.removeEventListener(OPEN_SECTION_EVENT, handle);
      window.removeEventListener("hashchange", handleHash);
    };
  }, [sectionId, onOpen]);
}

interface DropdownToggleProps {
  open: boolean;
  controls: string;
  onToggle: () => void;
  children: ReactNode;
}

export function DropdownToggle({ open, controls, onToggle, children }: DropdownToggleProps) {
  return (
    <button
      type="button"
      className="rd-drop_toggle"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
    >
      <span>{children}</span>
      <span className="rd-drop_arrow" aria-hidden>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

interface DropdownPanelProps {
  id: string;
  open: boolean;
  children: ReactNode;
}

export function DropdownPanel({ id, open, children }: DropdownPanelProps) {
  // Fully open panels stop clipping, so hover previews can overflow the rows.
  const [settled, setSettled] = useState(false);

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== "grid-template-rows") return;
    setSettled(open);
    refreshWhenScrollStops();
  }

  return (
    <div
      className="rd-drop"
      data-open={open}
      data-settled={open && settled}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="rd-drop_inner" id={id}>
        {children}
      </div>
    </div>
  );
}

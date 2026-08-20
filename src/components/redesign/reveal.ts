/**
 * Reveal-on-scroll for the redesign sections. Observes every
 * [data-rd-reveal] under `root` and adds .rd-in the first time it enters
 * the viewport. Returns a cleanup function for the caller's effect.
 */
export function observeReveals(root: HTMLElement): () => void {
  const targets = Array.from(root.querySelectorAll("[data-rd-reveal]"));
  if (targets.length === 0) return () => undefined;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("rd-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

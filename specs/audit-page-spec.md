# Audit Info Page — Specification

**Project:** paulskidmoreii.com (Personal Site)
**Route:** `/audit`
**Status:** V3 — locked direction, pending final pricing copy confirmation

---

## Overview
A standalone, shareable info page describing Paul's workflow audit side service. Lives at `paulskidmoreii.com/audit` as a direct-share URL — not surfaced anywhere in the site's nav, footer, sitemap, or internal links.

This page does **not** match the landing page. Instead it gets its own visual identity — **"The Scan"**: the page renders as if Paul is performing a workflow audit on the visitor in real time. An animated node graph wires itself together in the hero. A diagnostic grid pulses behind it. Bullets render as hand-annotated marker strokes. A scroll-scrubbed 30/60/90 timeline charts the engagement arc. The page *demonstrates* the offering by being a small, self-contained piece of motion design.

Brand tokens (palette, fonts) are reused so it still feels like Paul's universe — but layout, components, animation primitives, and assets are all built fresh.

## Tech Stack
- **Framework:** Next.js 16.2.2 (App Router) — heed [AGENTS.md](AGENTS.md): read `node_modules/next/dist/docs/` before writing route code; do not assume Next 14 conventions.
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 with brand tokens already defined in [src/app/globals.css](src/app/globals.css). No new color tokens — but new keyframes and `@property` declarations may be added there.
- **Animation:** framer-motion (already a dep). Heavy use of `motion.svg` + `pathLength`, `useScroll` + `useTransform` for scroll scrubbing, `useSpring` for organic motion, `useInView` for counter triggers, and orchestrated stagger.
- **Smooth scroll:** Lenis (already global via `<SmoothScroll>` in root layout) — relied upon for the scroll-scrubbed timeline feel.
- **Testing:** vitest (existing setup)
- **Deployment:** Existing site deploy pipeline. No infra changes.

## User Stories
- As Paul, I want a polished, original-looking info page at a stable URL so I can share it 1:1 with prospects without exposing it to public site visitors — and so the page itself signals "this person builds cool things."
- As a recipient of the link, I want to read what the audit is, what I get, and what it costs in under 60 seconds on my phone, with the motion adding rather than blocking comprehension.
- As a search engine, I should not index this page (private share asset, not public marketing).

## Features

### Feature 1: `/audit` Route + Indexing Hygiene
- **Description:** New App Router page at `src/app/audit/page.tsx`. Server component owns metadata; reveal/animation work lives in client child components.
- **Acceptance criteria:**
  - `paulskidmoreii.com/audit` returns 200 and renders all six content blocks below.
  - **Not** linked from [Navbar.tsx](src/components/layout/Navbar.tsx), [Footer.tsx](src/components/layout/Footer.tsx), or any landing section.
  - **Does not render** `<Navbar />` or `<Footer />` — the page builds its own minimal header (just the "PS" mark from the navbar, statically positioned, *no nav links*) and a one-line bottom mark.
  - Global wrappers from [layout.tsx](src/app/layout.tsx) (SmoothScroll, NoiseOverlay, ScrollProgressBar, CustomCursor) still apply via root layout.
  - Route exports `metadata` with `robots: { index: false, follow: false }`, page-specific `title` (`Workflow Audit — Paul Skidmore`), `description`, and OG block.
  - No reference to `/audit` in any sitemap or robots file.
- **Priority:** P0

### Feature 2: Hero — "Live Workflow Graph"
- **Description:** The visual centerpiece. A custom SVG node graph that wires itself together when the page loads, then breathes. Three labeled nodes — `STACK`, `TEAM`, `DAY-TO-DAY` — connected by pulsing edges to a central node labeled `PAUL`. Nodes ease into position on a spring; edges draw via `pathLength` 0→1; a soft scan-line sweeps once on load and again periodically.
- **Layout:** Hero is two-column on desktop (graph left ~55%, copy right ~45%), single-column stacked on mobile (graph above copy).
- **Copy block (verbatim):**
  - Eyebrow: `SIDE PROJECT` (mono, uppercase, tracked)
  - H1: `Workflow Audit`
  - Subhead: *"I run AI and automation systems as VP of Sales and Marketing at BOLDx Industries and its affiliated businesses. I'm open to helping other operators do the same — auditing workflows and showing them what's worth building, what's worth buying, and what's not worth doing."*
- **Acceptance criteria:**
  - H1 uses `font-heading font-black` with `clamp(3rem, 8vw, 6.5rem)` sizing.
  - Eyebrow uses `font-mono`, `text-[12px]`, `uppercase`, `tracking-[0.14em]`, `text-accent-coral`.
  - "BOLDx Industries" gets a hand-drawn underline that draws itself in via `pathLength` after the subhead reveal completes (custom SVG, slight wobble on the path).
  - Graph nodes enter staggered (180ms apart) with `useSpring` (stiffness 220, damping 18). Edges draw 350ms after the last node lands.
  - Scan-line: a 2px-thick coral-to-transparent gradient bar sweeps top→bottom across the graph viewport once on load (1.6s), then every 14s.
  - At rest, edges have a slow pulse (opacity 0.6 → 1 → 0.6, 3s loop).
  - Mobile (<768px): graph height capped at 320px; nodes auto-arrange in a smaller triangular cluster.
- **Priority:** P0

### Feature 3: "What it is" — Diagnostic Readout
- **Description:** Two-paragraph prose section, but presented as a terminal/diagnostic readout. Section is preceded by a custom section label component: a coral square bullet + thin animated underline + uppercase label `01 / WHAT IT IS`.
- **Copy (verbatim):**
  - P1: *"You tell me what's broken or slow. I look at how your business actually runs — your stack, your team, your day-to-day. You get a written report and a walkthrough call with a clear plan you can act on."*
  - P2: *"No deck. No fluff. No retainer pitch hiding in the back."*
- **Acceptance criteria:**
  - First paragraph types in character-by-character on viewport entry (35ms per char, capped — if user has reduced motion, just fades in).
  - Cursor caret blinks at end of P1 until P2 reveals; then disappears.
  - P2 fades up on stagger after typing completes.
  - Body text uses `font-body text-text-secondary text-lg md:text-xl leading-relaxed`.
- **Priority:** P0

### Feature 4: "What you get" — Annotated Deliverables
- **Description:** Four-item deliverable list. Each item rendered as a hand-annotated card: an animated SVG circle (rough/sketchy stroke) draws around an index number, a marker tick draws beside it on hover/viewport-enter, and the body text fades up. Items stagger in.
- **Copy (verbatim, exact bullets):**
  1. A workflow map of how your business actually operates today
  2. A prioritized list of opportunities, scored by impact and effort
  3. A 14/30/60 day plan you can hand to a builder
  4. A walkthrough call where we go through every recommendation together
- **Acceptance criteria:**
  - Section label `02 / WHAT YOU GET`.
  - Items render in a single column on mobile, 2-column grid on `md+`.
  - Each item: index number `01`–`04` in mono, surrounded by a hand-drawn coral circle SVG (rough-edge filter for sketch feel) that draws itself via `pathLength` on viewport enter.
  - Hovering an item triggers the coral marker-tick SVG to draw beside the number (also `pathLength`-based, ~280ms).
  - Stagger across items: 120ms between siblings.
- **Priority:** P0

### Feature 5: 14/30/60 Scroll Timeline
- **Description:** Standalone visualization between the bullets and pricing. A horizontal coral progress line scrubs left→right as the user scrolls past it; three milestone markers labeled `14 DAYS`, `30 DAYS`, `60 DAYS` light up as the line passes them. Each milestone has a one-liner caption that fades in on activation. Cadence shortened from 30/60/90 because AI/automation work moves faster — 90 days is the wrong frame.
- **Captions (proposed):**
  - 14: `Quick wins live`
  - 30: `Core workflows automated`
  - 60: `Compounding returns`
- **Acceptance criteria:**
  - Section label `03 / THE PLAN`.
  - Progress line uses `useScroll` with `offset: ["start end", "end start"]` against the section ref, mapped to `scaleX` 0→1.
  - Markers positioned proportionally on the line (14/60 ≈ 23%, 30/60 = 50%, 60/60 = 100%) and activate when `scrollYProgress` crosses each marker's position.
  - Reduced-motion users get a static, fully-revealed version.
  - Mobile: line and markers stack into a vertical timeline; same scroll scrub mechanic, vertical instead.
- **Priority:** P0

### Feature 6: Pricing — Counter + Credit Block
- **Description:** Final block. Tighter than V2 — drops the "$1,000–$5,000 range" framing per Paul's call. Two paragraphs, the dollar figure and percent animate.
- **Copy (verbatim — pending confirmation):**
  - P1: *"An initial call starts at **$1,000**. Final scope depends on the size of the business and what we find."*
  - P2: *"If we agree there's work worth doing after, your audit fee credits 100% toward the build."*
- **Acceptance criteria:**
  - Section label `04 / PRICING`.
  - `$1,000` renders as an animated counter that ticks up from 0 on viewport entry (1.2s, ease-out). Uses `font-mono`, `font-bold`, slightly larger than body. Comma format (not `$1k` shorthand).
  - The `100%` in P2 animates as a counter (0 → 100, 0.9s).
  - After all counters land, a small coral underline draws beneath "credits 100% toward the build."
  - No CTA buttons. Page ends here, with a thin coral horizontal line and the bottom mark (next feature).
- **Priority:** P0

### Feature 7: Page Chrome — Minimal Mark
- **Description:** Fixed top-left "PS" badge (reuses the visual style of the navbar logo). Links back to the home page (`/`). Bottom-center one-line footer-mark: `paulskidmoreii.com / audit` in mono, muted, no links.
- **Acceptance criteria:**
  - Top "PS" mark renders as an `<a href="/">` and visually matches the badge in [Navbar.tsx](src/components/layout/Navbar.tsx) (40px / 48px circle, 2px border, "PS" text, hover fills coral).
  - Top mark visible at all scroll positions, doesn't reveal/hide on scroll like the real navbar.
  - Bottom mark sits below the pricing block with appropriate vertical padding.
- **Priority:** P1

### Feature 8: Custom OG Image
- **Description:** Generated OG image so the link previews well when shared in iMessage / LinkedIn DM / email. Built with Next.js `ImageResponse` API (no external image fetches at build time).
- **Visual concept:** 1200×630 canvas, `bg-primary` (#FAFAF8) background, faint dotted-grid overlay echoing the on-page `<ScanGrid>`, eyebrow `SIDE PROJECT` in mono coral top-left, large H1 `Workflow Audit` (Cabinet Grotesk, font-black, near-black), subline `paulskidmoreii.com / audit` in mono muted bottom-left. Three small coral nodes wired to a center node in the bottom-right corner — a static, simplified echo of the hero workflow graph.
- **Acceptance criteria:**
  - File: `src/app/audit/opengraph-image.tsx` exporting an `ImageResponse` per Next.js 16 conventions (verify against `node_modules/next/dist/docs/` before writing).
  - Same file pattern produces a `twitter-image.tsx` if needed (or reuses OG).
  - Fonts: Cabinet Grotesk + General Sans loaded from the `public/fonts/` woff2s already on disk.
  - Verified by running `npm run build` and visiting `/audit/opengraph-image` locally — image renders, no fetch errors.
  - `metadata.openGraph.images` and `metadata.twitter.images` references resolve correctly (Next 16 handles this automatically when the file is colocated, but verify).
- **Priority:** P1

## New Assets to Create

These are net-new files, all originally created for `/audit` and not used elsewhere on the site.

### SVG / motion components
1. **`src/components/audit/WorkflowGraph.tsx`** — animated 4-node graph (Stack / Team / Day-to-day / Paul). All inline SVG, no external image. ~200 LOC budget.
2. **`src/components/audit/ScanGrid.tsx`** — subtle 24px dotted-grid backdrop with periodic scan-line sweep. Sits behind the hero (and optionally the timeline).
3. **`src/components/audit/SketchUnderline.tsx`** — reusable animated SVG underline with rough/wobbly path (used for "BOLDx Industries" + "credits 100% toward the build"). Props: `delay`, `color`, `thickness`.
4. **`src/components/audit/AnnotatedNumber.tsx`** — hand-drawn coral circle around an index number, with optional hover-triggered marker tick. Used in the deliverable list.
5. **`src/components/audit/ScrollTimeline.tsx`** — the 30/60/90 scroll-scrubbed timeline (horizontal on desktop, vertical on mobile).
6. **`src/components/audit/Counter.tsx`** — numeric counter that ticks 0→target on viewport entry. Props: `target`, `prefix` (e.g., "$"), `suffix`, `duration`, `format` (e.g., `1,000` thousands separator).
7. **`src/components/audit/TypewriterParagraph.tsx`** — character-by-character reveal with caret. Respects `prefers-reduced-motion`.
8. **`src/components/audit/SectionLabel.tsx`** — local section-label (`01 / WHAT IT IS` style). Distinct from the global `<SectionHeading>` so the audit page can have its own typography rhythm.

### Page files
9. **`src/app/audit/page.tsx`** — server component. Owns `metadata`, renders the client `AuditPage` child.
10. **`src/app/audit/AuditPage.tsx`** — client component. Composes all the above.
11. **`src/app/audit/content.ts`** — extracted content constants for testability and one-source-of-truth.
12. **`src/app/audit/opengraph-image.tsx`** — Next 16 colocated OG image generator (`ImageResponse`). Custom 1200×630 preview matching the on-page aesthetic.

### Tests
13. **`src/__tests__/audit/AuditPage.test.tsx`** — vitest rendering test asserting all required content strings + counter targets are present.
14. **`src/__tests__/audit/Counter.test.tsx`** — counter logic (target value rendered after animation completes, format with commas).
15. **`src/__tests__/audit/SketchUnderline.test.tsx`** — renders SVG with expected path attributes.

## Data Model
N/A — fully static content. Content lives in `src/app/audit/content.ts` as typed constants.

## API Endpoints
N/A.

## UI/UX Requirements
- **Layout:** Single column on mobile. Hero is 2-col on desktop. Deliverable list is 2-col on `md+`. Timeline is horizontal on desktop, vertical on mobile.
- **Spacing:** `py-24 md:py-32` between sections, `px-6 md:px-12 lg:px-20` horizontal, max-width container `max-w-6xl mx-auto`.
- **Typography:** Cabinet Grotesk for H1, General Sans for body, SF Mono for eyebrow / section labels / counters / bottom mark.
- **Color:** `bg-primary` background, `text-primary` body, `text-secondary` for prose, `accent-coral` heavily for emphasis (graph edges, underlines, list circles, counters, timeline progress, bottom mark).
- **Animation principles:**
  - Spring physics over duration-based easing wherever motion is "physical" (graph nodes, hover responses).
  - Scroll-scrubbed motion uses Lenis for buttery feel.
  - Stagger everywhere — never reveal a list as one block.
  - Reduced-motion users see static, fully-rendered versions of all dynamic elements.
- **Mobile target:** Tested 375px wide minimum. No horizontal scroll. Hero graph caps at 320px tall. Timeline goes vertical.
- **Performance budget:** All SVGs inline (no external image fetches). LCP element is the H1, not the graph. Counter / typewriter timers cleared on unmount.

## Non-Functional Requirements
- **Performance:** Lighthouse Performance ≥ 90 on mobile (slightly lower bar than landing because of richer motion, but still strong). LCP < 2.5s. No layout shift from animation.
- **Accessibility:** Semantic HTML — `<main>`, `<section>`, `<h1>`, `<h2>`, `<ol>` for the deliverables (they're a numbered list, not bullets in this design), `<ul>` only if any. All decorative SVGs `aria-hidden`. Color contrast WCAG AA. All animations respect `prefers-reduced-motion`. Counters announce final value to assistive tech (write the final value into `aria-label` or use an `aria-live` region).
- **SEO/privacy:** `noindex, nofollow`. Not in sitemap. Not linked from anywhere on the site.
- **Testing:** Per repo testing rules — vitest unit tests on each new component + page rendering test. Coverage ≥ 80% on new files.
- **Verification gate (per `.claude/rules/common/testing.md`):**
  - `npm run build` ✅
  - `npx tsc --noEmit` ✅
  - `npm run lint` ✅
  - `npm run test` ✅ (≥ 80% coverage on new code)
  - No `console.log` / `debugger` / committed secrets

## Out of Scope
- Any contact form, mailto link, scheduler embed, or CTA button.
- Inclusion in `<Navbar />`, `<Footer />`, sitemap.xml, or robots.txt entries.
- Reuse of any landing-page section component (Hero, About, Connector, Timeline, Skills, etc.) — `/audit` builds its own visual language.
- A new color palette or font — brand tokens are reused as-is.
- Analytics / tracking events for the page.
- A CMS / data-driven version of the content.
- E2E tests via Playwright (project has no Playwright setup).

## Open Questions for Paul

### Resolved (V3)
- ✅ Cadence: 30/60/90 → **14/30/60** (90 days too long for AI-era work).
- ✅ OG image: **custom**, generated via `opengraph-image.tsx`.
- ✅ Hero graph nodes: **STACK / TEAM / DAY-TO-DAY → PAUL**.
- ✅ Top-left mark: **PS badge links to `/`**.
- ✅ Counter format: comma (`$1,000`).

### Still open
1. **Pricing copy — needs your final read.** Your input came through with what looked like a transcription stutter ("starts at 1,000 but could start at 1,000"). I rewrote it as: *"An initial call starts at $1,000. Final scope depends on the size of the business and what we find."* This drops the prior "$1,000–$5,000 range" framing entirely. Confirm this read, or give me the line you want.
2. **14/30/60 captions.** Proposing: `Quick wins live` / `Core workflows automated` / `Compounding returns`. Different vibe?

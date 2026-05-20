import Link from "next/link";
import { redirect } from "next/navigation";
import { hasAccess } from "../auth";
import { logoutAction } from "../actions";
import {
  BRAND_COMPARISONS,
  POPUPS,
  WIREFRAME_GROUPS,
} from "../wireframes";

export const dynamic = "force-dynamic";

export default async function WireframesIndex() {
  if (!(await hasAccess())) {
    redirect("/bond-no-9");
  }

  return (
    <main className="bond-wrap">
      <header className="bond-index-head">
        <div>
          <img
            src="/bond-no-9/bond-logo.svg"
            alt="Bond No. 9 New York"
            className="bond-index-logo"
          />
          <span className="bond-eyebrow">Private Review · Bond No. 9</span>
          <h1 className="bond-h1" style={{ marginTop: 18 }}>
            <em>Bond No. 9</em> private review
          </h1>
          <p className="bond-lede" style={{ marginTop: 14 }}>
            Homepage, neighborhoods page, neighborhood detail page — each with
            three options. Pop-ups and brand comparison follow. Open anything,
            sit with it, then tell me which door feels like Bond.
          </p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="bond-btn bond-btn-ghost">
            Sign out
          </button>
        </form>
      </header>

      <h2 className="bond-section-label">Wireframes</h2>

      {WIREFRAME_GROUPS.map((group, idx) => (
        <div key={group.groupSlug}>
          <h3
            className={
              idx === 0
                ? "bond-group-heading"
                : "bond-group-heading bond-group-heading-spaced"
            }
          >
            {group.groupTitle}
            <span className="bond-group-subtitle">{group.groupSubtitle}</span>
          </h3>
          <section className="bond-index-grid">
            {group.variants.map((w) => (
              <Link
                key={w.slug}
                href={`/bond-no-9/wireframes/${w.slug}`}
                className="bond-card"
                aria-label={`Open ${group.groupTitle} — Option ${w.letter} ${w.title}`}
              >
                <span className="bond-card-letter">{w.letter}</span>
                <h4 className="bond-card-title">{w.title}</h4>
                <p className="bond-card-tagline">{w.tagline}</p>
                <p className="bond-card-description">{w.description}</p>
                <span className="bond-card-cta">Open Option {w.letter} →</span>
              </Link>
            ))}
          </section>
        </div>
      ))}

      <h2 className="bond-section-label bond-section-label-spaced">Pop-ups</h2>
      <section className="bond-index-grid bond-index-grid-single">
        {POPUPS.map((p) => (
          <Link
            key={p.slug}
            href={`/bond-no-9/popups/${p.slug}`}
            className="bond-card"
            aria-label={`Open ${p.title}`}
          >
            <span className="bond-card-letter">{p.letter}</span>
            <h4 className="bond-card-title">{p.title}</h4>
            <p className="bond-card-tagline">{p.tagline}</p>
            <p className="bond-card-description">{p.description}</p>
            <span className="bond-card-cta">Open pop-up doc →</span>
          </Link>
        ))}
      </section>

      <h2 className="bond-section-label bond-section-label-spaced">
        Brand Comparison
      </h2>
      <section className="bond-index-grid bond-index-grid-single">
        {BRAND_COMPARISONS.map((b) => (
          <Link
            key={b.slug}
            href={`/bond-no-9/brand-comparison/${b.slug}`}
            className="bond-card"
            aria-label={`Open ${b.title}`}
          >
            <span className="bond-card-letter">{b.letter}</span>
            <h4 className="bond-card-title">{b.title}</h4>
            <p className="bond-card-tagline">{b.tagline}</p>
            <p className="bond-card-description">{b.description}</p>
            <span className="bond-card-cta">Open comparison →</span>
          </Link>
        ))}
      </section>

      <h2 className="bond-section-label bond-section-label-spaced">
        Live Quiz
      </h2>
      <section className="bond-index-grid bond-index-grid-single">
        <a
          href="/bond-no-9/quiz/"
          className="bond-card"
          aria-label="Open the Bond No. 9 Neighborhood Finder quiz"
        >
          <span className="bond-card-letter">★</span>
          <h4 className="bond-card-title">Neighborhood Finder Quiz</h4>
          <p className="bond-card-tagline">
            Working build · 3 questions · matched neighborhood + fragrance pick.
          </p>
          <p className="bond-card-description">
            The actual quiz, running here under /bond-no-9/quiz/. Take it as a
            visitor would — three questions, then your matched New York
            neighborhood with the corresponding Bond fragrance. This is the
            mechanic that the Pop-ups Option B and the Neighborhood Detail
            Option C wireframes are built to surface.
          </p>
          <span className="bond-card-cta">Take the quiz →</span>
        </a>
      </section>

      <hr className="bond-rule" style={{ marginTop: 64 }} aria-hidden />
      <p className="bond-mono">
        Wireframes are exploratory directions, not finished design.
      </p>
    </main>
  );
}

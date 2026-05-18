import Link from "next/link";
import { redirect } from "next/navigation";
import { hasAccess } from "../auth";
import { logoutAction } from "../actions";
import { WIREFRAMES } from "../wireframes";

export const dynamic = "force-dynamic";

export default async function WireframesIndex() {
  if (!(await hasAccess())) {
    redirect("/bond-no-9");
  }

  return (
    <main className="bond-wrap">
      <header className="bond-index-head">
        <div>
          <span className="bond-eyebrow">Private Review · Bond No. 9</span>
          <h1 className="bond-h1" style={{ marginTop: 18 }}>
            <em>Homepage</em> directions
          </h1>
          <p className="bond-lede" style={{ marginTop: 14 }}>
            Three ways into the same neighborhood. Open each, sit with it, then
            tell me which door feels like Bond.
          </p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="bond-btn bond-btn-ghost">
            Sign out
          </button>
        </form>
      </header>

      <section className="bond-index-grid">
        {WIREFRAMES.map((w) => (
          <Link
            key={w.slug}
            href={`/bond-no-9/wireframes/${w.slug}`}
            className="bond-card"
            aria-label={`Open ${w.title} wireframe`}
          >
            <span className="bond-card-letter">{w.letter}</span>
            <h2 className="bond-card-title">{w.title}</h2>
            <p className="bond-card-tagline">{w.tagline}</p>
            <p className="bond-card-description">{w.description}</p>
            <span className="bond-card-cta">Open wireframe →</span>
          </Link>
        ))}
      </section>

      <hr className="bond-rule" style={{ marginTop: 64 }} aria-hidden />
      <p className="bond-mono">
        Wireframes are exploratory directions, not finished design.
      </p>
    </main>
  );
}

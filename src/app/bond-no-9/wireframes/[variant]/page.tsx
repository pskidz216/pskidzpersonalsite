import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { hasAccess } from "../../auth";
import { WIREFRAME_GROUPS } from "../../wireframes";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ variant: string }>;
};

export default async function WireframeViewer({ params }: PageProps) {
  if (!(await hasAccess())) {
    redirect("/bond-no-9");
  }

  const { variant } = await params;

  const group = WIREFRAME_GROUPS.find((g) =>
    g.variants.some((v) => v.slug === variant)
  );
  const wireframe = group?.variants.find((v) => v.slug === variant);
  if (!group || !wireframe) notFound();

  const idx = group.variants.findIndex((v) => v.slug === wireframe.slug);
  const prev = group.variants[(idx - 1 + group.variants.length) % group.variants.length];
  const next = group.variants[(idx + 1) % group.variants.length];

  return (
    <main>
      <nav className="bond-viewer-bar" aria-label="Wireframe viewer">
        <Link href="/bond-no-9/wireframes">← All options</Link>
        <div className="bond-viewer-title">
          {group.groupTitle} · Option {wireframe.letter} · {wireframe.title}
        </div>
        <div className="bond-viewer-nav">
          <Link href={`/bond-no-9/wireframes/${prev.slug}`}>
            ← {prev.letter}
          </Link>
          <Link href={`/bond-no-9/wireframes/${next.slug}`}>
            {next.letter} →
          </Link>
        </div>
      </nav>

      <iframe
        title={`Bond No. 9 — ${group.groupTitle} Option ${wireframe.letter} ${wireframe.title}`}
        src={wireframe.htmlPath}
        className="bond-viewer-frame"
        loading="eager"
      />
    </main>
  );
}

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { hasAccess } from "../../auth";
import { getWireframeBySlug, WIREFRAMES } from "../../wireframes";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ variant: string }>;
};

export default async function WireframeViewer({ params }: PageProps) {
  if (!(await hasAccess())) {
    redirect("/bond-no-9");
  }

  const { variant } = await params;
  const wireframe = getWireframeBySlug(variant);
  if (!wireframe) notFound();

  const currentIndex = WIREFRAMES.findIndex((w) => w.slug === wireframe.slug);
  const prev = WIREFRAMES[(currentIndex - 1 + WIREFRAMES.length) % WIREFRAMES.length];
  const next = WIREFRAMES[(currentIndex + 1) % WIREFRAMES.length];

  return (
    <main>
      <nav className="bond-viewer-bar" aria-label="Wireframe viewer">
        <Link href="/bond-no-9/wireframes">← All options</Link>
        <div className="bond-viewer-title">
          Option {wireframe.letter} · {wireframe.title}
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
        title={`Bond No. 9 wireframe — Option ${wireframe.letter} ${wireframe.title}`}
        src={wireframe.htmlPath}
        className="bond-viewer-frame"
        loading="eager"
      />
    </main>
  );
}

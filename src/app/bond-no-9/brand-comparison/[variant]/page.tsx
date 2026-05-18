import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { hasAccess } from "../../auth";
import { getBrandComparisonBySlug } from "../../wireframes";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ variant: string }>;
};

export default async function BrandComparisonViewer({ params }: PageProps) {
  if (!(await hasAccess())) {
    redirect("/bond-no-9");
  }

  const { variant } = await params;
  const doc = getBrandComparisonBySlug(variant);
  if (!doc) notFound();

  return (
    <main>
      <nav className="bond-viewer-bar" aria-label="Brand comparison viewer">
        <Link href="/bond-no-9/wireframes">← All options</Link>
        <div className="bond-viewer-title">Brand Comparison · {doc.title}</div>
        <div />
      </nav>

      <iframe
        title={`Bond No. 9 — ${doc.title}`}
        src={doc.htmlPath}
        className="bond-viewer-frame"
        loading="eager"
      />
    </main>
  );
}

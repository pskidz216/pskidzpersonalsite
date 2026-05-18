import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { hasAccess } from "../../auth";
import { getPopupBySlug } from "../../wireframes";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ variant: string }>;
};

export default async function PopupViewer({ params }: PageProps) {
  if (!(await hasAccess())) {
    redirect("/bond-no-9");
  }

  const { variant } = await params;
  const popup = getPopupBySlug(variant);
  if (!popup) notFound();

  return (
    <main>
      <nav className="bond-viewer-bar" aria-label="Pop-up viewer">
        <Link href="/bond-no-9/wireframes">← All options</Link>
        <div className="bond-viewer-title">Pop-ups · {popup.title}</div>
        <div />
      </nav>

      <iframe
        title={`Bond No. 9 — ${popup.title}`}
        src={popup.htmlPath}
        className="bond-viewer-frame"
        loading="eager"
      />
    </main>
  );
}

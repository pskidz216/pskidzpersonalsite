import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary flex items-center px-6 md:px-12">
      <div className="max-w-2xl mx-auto w-full py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-teal mb-6">
          [ 404 — Nothing at this address ]
        </p>
        <h1
          className="font-heading font-black tracking-[-0.03em] leading-[0.95] mb-6"
          style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
        >
          That page isn&#39;t here.
        </h1>
        <p className="font-body text-text-secondary text-lg leading-relaxed mb-10 max-w-xl">
          The record, the builds and the BoldX case study are on the home page.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-accent-coral text-white font-body font-semibold"
          >
            Back to the home page
          </Link>
          <Link
            href="/work/boldx"
            className="inline-flex items-center px-6 py-3 rounded-full border border-text-primary font-body font-semibold"
          >
            The BoldX case study
          </Link>
        </div>
      </div>
    </main>
  );
}

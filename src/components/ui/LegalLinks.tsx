import Link from "next/link";

const defaultStyle = "font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted";

export function LegalLinks({ className = defaultStyle }: { className?: string }) {
  return (
    <span className={`inline-flex gap-4 ${className}`}>
      <Link href="/privacy" className="hover:text-accent-coral transition-colors">
        Privacy
      </Link>
      <Link href="/terms" className="hover:text-accent-coral transition-colors">
        Terms
      </Link>
    </span>
  );
}

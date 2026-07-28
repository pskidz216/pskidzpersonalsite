import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Pristine Coastal Co. concepts",
  description: "Private client preview.",
  robots: { index: false, follow: false },
};

export default async function PristineLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const dest = next && next.startsWith("/pristine") ? next : "/pristine";

  return (
    <main className="pl-wrap">
      <div className="pl-card">
        <p className="pl-kicker">Private preview</p>
        <h1 className="pl-title">Pristine Coastal Co.</h1>
        <p className="pl-sub">Homepage concepts, July 2026. Prepared by Paul Skidmore.</p>
        <LoginForm next={dest} />
      </div>
    </main>
  );
}

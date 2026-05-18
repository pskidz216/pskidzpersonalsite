import { redirect } from "next/navigation";
import { hasAccess } from "./auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function BondLoginPage() {
  if (await hasAccess()) {
    redirect("/bond-no-9/wireframes");
  }

  return (
    <main className="bond-login">
      <section className="bond-login-card" aria-labelledby="bond-login-title">
        <header className="bond-login-mark">
          <span className="bond-eyebrow">Private Review · Bond No. 9</span>
          <h1 id="bond-login-title" className="bond-h1">
            <em>Three doors,</em> one neighborhood.
          </h1>
          <p className="bond-lede">
            Enter the access password to view the homepage wireframe options.
          </p>
        </header>

        <hr className="bond-rule" aria-hidden />

        <LoginForm />

        <p className="bond-mono">
          Prepared by Paul Skidmore — paulskidmoreii.com
        </p>
      </section>
    </main>
  );
}

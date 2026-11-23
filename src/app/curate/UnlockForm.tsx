"use client";

import { useActionState } from "react";
import { unlockCurate, type UnlockState } from "./actions";

const ERROR_ID = "curate-password-error";

export function UnlockForm() {
  const [state, formAction, pending] = useActionState<UnlockState, FormData>(unlockCurate, {});
  const hasError = Boolean(state.error);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-3" noValidate>
      <label
        htmlFor="curate-password"
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary"
      >
        Password
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="curate-password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          maxLength={200}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? ERROR_ID : undefined}
          className="flex-1 min-w-0 h-12 rounded-full border border-text-primary/25 bg-white px-5 font-body text-base text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:border-transparent"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 px-6 rounded-full bg-text-primary text-text-inverse font-body font-semibold hover:bg-accent-coral transition-colors disabled:opacity-60 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        >
          {pending ? "Checking" : "View the plan"}
        </button>
      </div>
      {hasError ? (
        <p id={ERROR_ID} role="alert" className="m-0 font-body text-sm text-[#C2543C]">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}

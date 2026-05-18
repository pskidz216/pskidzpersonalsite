"use client";

import { useActionState } from "react";
import { loginAction, type LoginResult } from "./actions";

const initialState: LoginResult = undefined;

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginResult, FormData>(
    loginAction,
    initialState
  );

  return (
    <form action={formAction} className="bond-field" noValidate>
      <div className="bond-field">
        <label htmlFor="bond-password">Access password</label>
        <input
          id="bond-password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          maxLength={200}
          disabled={pending}
        />
      </div>

      {state?.error ? (
        <p className="bond-error" role="alert" aria-live="polite">
          {state.error}
        </p>
      ) : null}

      <button type="submit" className="bond-btn" disabled={pending}>
        {pending ? "Opening…" : "Enter"}
      </button>
    </form>
  );
}

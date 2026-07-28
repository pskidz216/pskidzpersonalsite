"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";
import "./pristine-login.css";

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={formAction} className="pl-form">
      <input type="hidden" name="next" value={next} />
      <label className="pl-label" htmlFor="pristine-password">
        Password
      </label>
      <input
        id="pristine-password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        className="pl-input"
        aria-describedby={state.error ? "pristine-error" : undefined}
      />
      {state.error ? (
        <p className="pl-error" id="pristine-error" role="alert">
          {state.error}
        </p>
      ) : null}
      <button className="pl-btn" type="submit" disabled={pending}>
        {pending ? "Checking" : "View the concepts"}
      </button>
    </form>
  );
}

import { useState, type FormEvent } from "react";
import { navigate } from "../App";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // No auth wired up yet — pretend, then drop them into the editor.
    setTimeout(() => {
      setSubmitting(false);
      navigate("entry");
    }, 700);
  }

  return (
    <main className="page">
      <div className="auth-shell">
        <p className="auth-eyebrow">Welcome back</p>
        <h1 className="auth-title">Sign in to Tracka</h1>
        <p className="auth-sub">
          A small ritual before the page opens.
        </p>

        <form className="auth-fields" onSubmit={onSubmit}>
          <label className="field">
            <span className="field-label">Email</span>
            <input
              className="field-input"
              type="email"
              autoComplete="email"
              placeholder="you@quiet.studio"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              className="field-input"
              type="password"
              autoComplete="current-password"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
            style={{ marginTop: 12 }}
          >
            {submitting ? "Opening the page…" : "Continue"}
          </button>
        </form>

        <div className="auth-foot">
          <a className="btn-link" href="#/">
            ← back
          </a>
          <a className="btn-link" href="#/signin">
            New here? Create an account
          </a>
        </div>
      </div>
    </main>
  );
}

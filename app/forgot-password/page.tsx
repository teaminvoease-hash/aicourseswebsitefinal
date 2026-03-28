"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="auth-shell">
      <aside className="auth-panel">
        <span className="badge">Account Recovery</span>
        <h1 style={{ marginTop: ".5rem" }}>Reset your password securely</h1>
        <p>Enter your registered email to receive reset instructions for your learner or admin account.</p>
      </aside>
      <form className="card auth-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <h2>Forgot Password</h2>
        <label>Email address<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <button className="btn" style={{ width: "100%", marginTop: 12 }}>Send reset link</button>
        {sent ? <p className="alert alert-info">If this email exists, reset instructions were sent.</p> : null}
        <p className="small">Remembered it? <Link href="/login">Back to login</Link>.</p>
      </form>
    </section>
  );
}

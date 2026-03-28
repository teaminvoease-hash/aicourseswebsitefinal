"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false);

  return (
    <section className="auth-shell">
      <aside className="auth-panel">
        <span className="badge">Credential Update</span>
        <h1 style={{ marginTop: ".5rem" }}>Set a new secure password</h1>
        <p>Choose a strong password with at least 8 characters, one number, and one special character.</p>
      </aside>
      <form className="card auth-card" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        <h2>Reset Password</h2>
        <label>New password<input type="password" required minLength={8} /></label>
        <label>Confirm new password<input type="password" required minLength={8} /></label>
        <button className="btn" style={{ width: "100%", marginTop: 12 }}>Update password</button>
        {done ? <p className="alert alert-success">Password updated. Continue to login.</p> : null}
        <p className="small"><Link href="/login">Go to login</Link>.</p>
      </form>
    </section>
  );
}

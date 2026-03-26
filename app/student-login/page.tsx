"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentLoginPage() {
  const router = useRouter();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrMobile: credential, password, role: "student", remember }),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Unable to sign in. Please verify credentials.");
    router.push("/student");
  }

  return (
    <section className="grid grid-2">
      <article className="card card-dark">
        <h1 style={{ color: "#fff" }}>Student Login</h1>
        <p>Securely access enrolled courses, live schedules, assignments, payment receipts, and certificate status.</p>
        <p className="small" style={{ color: "#cfdbf5" }}>Need admissions help? <Link href="/contact">Talk to support</Link> or WhatsApp +1 (555) 010-2244.</p>
      </article>
      <article className="card" style={{ maxWidth: 560 }}>
        <h2>Sign in to your dashboard</h2>
        <form onSubmit={handleSubmit} className="grid" style={{ gap: 10 }}>
          <label>Email / Mobile<input required onChange={(e) => setCredential(e.target.value)} /></label>
          <label>Password<input type="password" required onChange={(e) => setPassword(e.target.value)} /></label>
          <label><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ width: "auto", marginRight: 8 }} />Remember me</label>
          <p className="form-note">Forgot password? Reset flow placeholder available for support-assisted recovery.</p>
          <button className="btn" type="submit">Secure Login</button>
          {msg ? <p className="form-error">{msg}</p> : null}
          <p className="form-note">New student? <Link href="/register">Create your account</Link>.</p>
        </form>
      </article>
    </section>
  );
}

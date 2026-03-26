"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrMobile: emailOrUsername, password, role: "admin" }),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Login failed");
    router.push("/admin");
  }

  return (
    <section className="grid grid-2">
      <article className="card card-dark">
        <h1 style={{ color: "#fff" }}>Admin Access</h1>
        <p>Admissions and operations console for students, enrollments, payments, content, schedules, certificates, and lead workflows.</p>
      </article>
      <article className="card" style={{ maxWidth: 560 }}>
        <h2>Secure Admin Login</h2>
        <p className="small">Authorized personnel only. Access is role-restricted and activity-monitored.</p>
        <form onSubmit={handleSubmit} className="grid" style={{ gap: 10 }}>
          <label>Email / Username<input required onChange={(e) => setEmailOrUsername(e.target.value)} /></label>
          <label>Password<input type="password" required onChange={(e) => setPassword(e.target.value)} /></label>
          <p className="form-note">Forgot password placeholder: contact platform owner/security admin.</p>
          <button className="btn" type="submit">Login to Admin Console</button>
          {msg ? <p className="form-error">{msg}</p> : null}
          <p className="form-note">Student account? <Link href="/student-login">Use student login</Link>.</p>
        </form>
      </article>
    </section>
  );
}

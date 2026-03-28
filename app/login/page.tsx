"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const requestedRole = params.get("role") === "admin" ? "admin" : "student";
  const [role, setRole] = useState<"student" | "admin">(requestedRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [alert, setAlert] = useState<{ type: "danger" | "success" | "info"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heading = useMemo(() => (role === "admin" ? "Admin Control Center Login" : "Student Workspace Login"), [role]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);

    if (!emailRegex.test(email.trim())) return setAlert({ type: "danger", message: "Please enter a valid email." });
    if (password.length < 8) return setAlert({ type: "danger", message: "Password must be at least 8 characters." });

    setIsSubmitting(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password, role, remember })
    });

    const data = await res.json();
    setIsSubmitting(false);

    if (!res.ok) return setAlert({ type: "danger", message: data.error || "Unable to log in right now." });

    setAlert({ type: "success", message: "Secure login successful. Redirecting..." });
    setTimeout(() => {
      router.push(role === "admin" ? "/admin" : "/student");
      router.refresh();
    }, 450);
  }

  return (
    <section className="auth-shell">
      <aside className="auth-panel">
        <span className="badge">Secure Access</span>
        <h1 style={{ marginTop: ".5rem" }}>{heading}</h1>
        <p>
          Role-based authenticated access to a premium AI law learning platform with dashboard analytics,
          certificate tracking, and secure session controls.
        </p>
        <div className="grid">
          <article className="card" style={{ padding: ".7rem" }}>
            <h3>Student Access</h3>
            <p>Courses, assignments, progress, payments, and certificate verification status.</p>
          </article>
          <article className="card" style={{ padding: ".7rem" }}>
            <h3>Admin Access</h3>
            <p>Operations console for enrollments, classes, payments, and certification pipelines.</p>
          </article>
        </div>
      </aside>

      <div className="card auth-card">
        <div className="cta-row" style={{ marginTop: 0 }}>
          <button type="button" className={role === "student" ? "btn" : "btn btn-outline"} onClick={() => setRole("student")}>Student</button>
          <button type="button" className={role === "admin" ? "btn" : "btn btn-outline"} onClick={() => setRole("admin")}>Admin</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Email<input type="email" placeholder="you@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Password<input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>

          <div className="cta-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
              <input style={{ width: 16 }} type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Keep me signed in
            </label>
            <Link href="/forgot-password" className="small">Forgot password?</Link>
          </div>

          <button className="btn" style={{ width: "100%", marginTop: 10 }} disabled={isSubmitting}>
            {isSubmitting ? "Authenticating..." : role === "admin" ? "Login to Admin Control" : "Login to Student Workspace"}
          </button>
        </form>

        {alert ? <p className={`alert alert-${alert.type}`}>{alert.message}</p> : null}
        <p className="small" style={{ marginTop: 10 }}>New learner? <Link href="/register">Create your account</Link></p>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<section className="card"><h1>Loading Login...</h1></section>}><LoginForm /></Suspense>;
}

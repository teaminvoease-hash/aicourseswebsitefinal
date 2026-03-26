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

  const heading = useMemo(() => (role === "admin" ? "Admin Control Login" : "Student Learning Login"), [role]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);

    if (!emailRegex.test(email.trim())) {
      return setAlert({ type: "danger", message: "Please enter a valid email format (example: name@domain.com)." });
    }

    if (password.length < 8) {
      return setAlert({ type: "danger", message: "Password is too short. Use at least 8 characters to continue." });
    }

    setIsSubmitting(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password, role, remember })
    });

    const data = await res.json();
    setIsSubmitting(false);

    if (!res.ok) {
      setAlert({ type: "danger", message: data.error || "Unable to log in right now. Please try again." });
      return;
    }

    setAlert({ type: "success", message: "Secure sign-in successful. Redirecting to your dashboard..." });
    setTimeout(() => {
      router.push(role === "admin" ? "/admin" : "/student");
      router.refresh();
    }, 500);
  }

  return (
    <section>
      <div className="auth-layout">
        <aside className="auth-panel">
          <span className="badge badge-info">Secure legal-tech access</span>
          <h1 style={{ marginBottom: 8 }}>{heading}</h1>
          <p className="small">
            {role === "student"
              ? "Access your enrolled courses, join live classes, track your progress, and download certificates from one trusted learning portal."
              : "Authorized admin gateway for admissions, payment operations, class scheduling, and certification workflows."}
          </p>
          <ul className="auth-list">
            <li>Access your enrolled courses instantly.</li>
            <li>Join live classes and watch recordings.</li>
            <li>Track learning milestones and assessments.</li>
            <li>Download your certificate once issued.</li>
          </ul>
          <p className="small">Protected by secure session controls and role-based access checks.</p>
        </aside>

        <div className="card auth-card">
          <div className="login-role-switch" style={{ marginBottom: 12 }}>
            <button type="button" className={role === "student" ? "btn" : "btn btn-outline"} onClick={() => setRole("student")}>Student</button>
            <button type="button" className={role === "admin" ? "btn" : "btn btn-outline"} onClick={() => setRole("admin")}>Admin</button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" /></label>
            <label style={{ marginTop: 10 }}>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /></label>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
              <label style={{ display: "flex", gap: 8, fontWeight: 500 }}><input style={{ width: 16, marginTop: 1 }} type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />Remember me</label>
              <Link href="#" className="small">Forgot password?</Link>
            </div>
            <button className="btn" style={{ width: "100%", marginTop: 14 }} disabled={isSubmitting}>{isSubmitting ? "Verifying..." : role === "admin" ? "Login to Admin Control Panel" : "Login to Student Dashboard"}</button>
          </form>

          {alert ? <p className={`alert alert-${alert.type}`}>{alert.message}</p> : null}

          <p className="small" style={{ marginTop: 12 }}>
            {role === "student" ? <>New learner? <Link href="/register" style={{ color: "#1d4ed8" }}>Create your admission account</Link>.</> : <>Admin access issue? Reach support at <Link href="mailto:admin-support@ailawacademy.in" style={{ color: "#1d4ed8" }}>admin-support@ailawacademy.in</Link>.</>}
          </p>
          <p className="small">Need help now? <Link href="/contact" style={{ color: "#1d4ed8" }}>Contact support</Link>.</p>
          {role === "admin" && <p className="small">Two-factor authentication (coming soon): OTP confirmation will be supported for high-risk sign-ins.</p>}
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<section><h1>Login</h1></section>}><LoginForm /></Suspense>;
}

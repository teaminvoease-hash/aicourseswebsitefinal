"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const requestedRole = params.get("role") === "admin" ? "admin" : "student";
  const [role, setRole] = useState<"student" | "admin">(requestedRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heading = useMemo(() => (role === "admin" ? "Admin Login" : "Student Login"), [role]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();
    setIsSubmitting(false);

    if (!res.ok) {
      setMsg(data.error || "Login failed. Please check your credentials.");
      return;
    }

    router.push(role === "admin" ? "/admin" : "/student");
    router.refresh();
  }

  return (
    <section>
      <h1>{heading}</h1>
      <p className="small">Use your registered account credentials to continue.</p>

      <div className="login-role-switch" style={{ marginTop: 12 }}>
        <button
          type="button"
          className={role === "student" ? "btn" : "btn btn-outline"}
          onClick={() => setRole("student")}
        >
          Student
        </button>
        <button
          type="button"
          className={role === "admin" ? "btn" : "btn btn-outline"}
          onClick={() => setRole("admin")}
        >
          Admin
        </button>
      </div>

      <form className="card" onSubmit={handleSubmit} style={{ maxWidth: 520, marginTop: 12 }}>
        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="btn" style={{ marginTop: 12 }} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : `Login as ${role === "admin" ? "Admin" : "Student"}`}
        </button>

        {!!msg && <p style={{ color: "#b91c1c", marginTop: 10 }}>{msg}</p>}

        {role === "student" && (
          <p className="small" style={{ marginTop: 10 }}>
            New student? <Link href="/register">Create your account</Link>
          </p>
        )}
      </form>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<section><h1>Login</h1><p>Loading...</p></section>}>
      <LoginForm />
    </Suspense>
  );
}

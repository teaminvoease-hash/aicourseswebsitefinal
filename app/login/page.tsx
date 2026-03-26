"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();
  const role = params.get("role") || "student";
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Login failed");
    router.push(role === "admin" ? "/admin" : "/student");
  }

  return (
    <section>
      <h1>{role === "admin" ? "Admin Login" : "Student Login"}</h1>
      <form className="card" onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
        <label>Email<input type="email" required onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" required onChange={(e) => setPassword(e.target.value)} /></label>
        <button className="btn" style={{ marginTop: 10 }} type="submit">Login</button>
        <p>{msg}</p>
      </form>
    </section>
  );
}

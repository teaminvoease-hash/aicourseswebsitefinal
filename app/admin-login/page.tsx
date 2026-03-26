"use client";

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
    <section className="card" style={{ maxWidth: 540 }}>
      <h1>Admin Login</h1>
      <p className="small">Authorized users only. Access is monitored and role-restricted.</p>
      <form onSubmit={handleSubmit}>
        <label>Email / Username<input required onChange={(e) => setEmailOrUsername(e.target.value)} /></label>
        <label>Password<input type="password" required onChange={(e) => setPassword(e.target.value)} /></label>
        <p className="small"><a href="#">Forgot password</a></p>
        <button className="btn" type="submit">Secure Admin Login</button>
        <p>{msg}</p>
      </form>
    </section>
  );
}

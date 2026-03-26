"use client";

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
    if (!res.ok) return setMsg(data.error || "Login failed");
    router.push("/student");
  }

  return (
    <section className="card" style={{ maxWidth: 540 }}>
      <h1>Student Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email / Mobile<input required onChange={(e) => setCredential(e.target.value)} /></label>
        <label>Password<input type="password" required onChange={(e) => setPassword(e.target.value)} /></label>
        <label><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ width: "auto", marginRight: 8 }} />Remember me</label>
        <p className="small"><a href="#">Forgot password</a></p>
        <button className="btn" type="submit">Login</button>
        <p>{msg}</p>
      </form>
    </section>
  );
}

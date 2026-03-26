"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const fields = [
  ["fullName", "Full name"],
  ["email", "Email"],
  ["mobile", "Mobile"],
  ["password", "Password"],
  ["lawCollege", "Law college/university"],
  ["yearSemester", "Year/semester"],
  ["cityState", "City/state"],
  ["profession", "Profession"],
  ["profilePhotoUrl", "Profile photo URL (optional)"]
] as const;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Registration failed");
    setMsg("Registration successful. Redirecting...");
    setTimeout(() => router.push("/student"), 600);
  }

  return (
    <section>
      <h1>Student Registration</h1>
      <form className="card" onSubmit={onSubmit}>
        <div className="grid grid-3">
          {fields.map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                type={key === "password" ? "password" : "text"}
                required={key !== "profilePhotoUrl"}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              />
            </label>
          ))}
        </div>
        <button className="btn" style={{ marginTop: 12 }} type="submit">Create Account</button>
        <p>{msg}</p>
      </form>
    </section>
  );
}

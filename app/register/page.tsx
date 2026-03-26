"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const professions = ["Student", "Advocate", "Associate", "Researcher", "Compliance Professional", "Other"];

export default function RegisterPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    fullName: "", email: "", mobile: "", password: "", confirmPassword: "", lawCollege: "", yearSemester: "", cityState: "", profession: "Student", profilePhotoUrl: "", accepted: false,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setMsg("Passwords do not match.");
    if (!form.accepted) return setMsg("Please accept Terms and Privacy Policy.");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Registration failed");
    setMsg("Registration successful. Redirecting to student dashboard...");
    setTimeout(() => router.push("/student"), 700);
  }

  return (
    <section className="card">
      <h1>Student Registration</h1>
      <p className="small">Create your secure learner account to enroll and access your dashboard.</p>
      <form className="grid grid-2" onSubmit={onSubmit}>
        <label>Full Name<input required onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></label>
        <label>Email<input type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Mobile Number<input required onChange={(e) => setForm({ ...form, mobile: e.target.value })} /></label>
        <label>Law College / University<input required onChange={(e) => setForm({ ...form, lawCollege: e.target.value })} /></label>
        <label>Year / Semester<input required onChange={(e) => setForm({ ...form, yearSemester: e.target.value })} /></label>
        <label>City / State<input required onChange={(e) => setForm({ ...form, cityState: e.target.value })} /></label>
        <label>Profession
          <select value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })}>
            {professions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>Profile Photo URL (optional)<input onChange={(e) => setForm({ ...form, profilePhotoUrl: e.target.value })} /></label>
        <label>Password<input type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <label>Confirm Password<input type="password" required onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} /></label>
        <label style={{ gridColumn: "1 / -1" }}>
          <input type="checkbox" checked={form.accepted} onChange={(e) => setForm({ ...form, accepted: e.target.checked })} style={{ width: "auto", marginRight: 8 }} />
          I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </label>
        <div style={{ gridColumn: "1 / -1" }}>
          <button className="btn" type="submit">Create Account</button>
          <p className="small">Strong password required: minimum 8 chars, uppercase, lowercase, number, and special symbol.</p>
          <p>{msg}</p>
        </div>
      </form>
    </section>
  );
}

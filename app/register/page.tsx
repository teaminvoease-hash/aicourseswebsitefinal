"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const professions = ["Law Student", "LLM Student", "Junior Advocate", "Legal Associate", "Researcher", "Compliance Professional", "Other"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "LLM", "Working Professional"];

export default function RegisterPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", mobile: "", password: "", confirmPassword: "", lawCollege: "", yearSemester: "1st Year", cityState: "", profession: "Law Student", profilePhotoUrl: "", accepted: false,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsError(false);
    if (form.password !== form.confirmPassword) {
      setIsError(true);
      return setMsg("Passwords do not match.");
    }
    if (!form.accepted) {
      setIsError(true);
      return setMsg("Please accept Terms and Privacy Policy.");
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setIsError(true);
      return setMsg(data.error || "Registration failed");
    }
    setMsg("Registration successful. Redirecting to your student dashboard...");
    setTimeout(() => router.push("/student"), 900);
  }

  return (
    <section className="grid grid-2">
      <article className="card card-dark">
        <span className="badge">Admissions Open</span>
        <h1 style={{ color: "#fff" }}>Enroll in Structured Legal-Tech Learning</h1>
        <p>One-time payment per course, dashboard access after enrollment, certificate on completion, and practical legal AI workflow training.</p>
        <div className="timeline-item">Live faculty-led classes + recordings</div>
        <div className="timeline-item">Assignments, quizzes, and progress tracking</div>
        <div className="timeline-item">Certificate with unique verification ID</div>
        <div className="timeline-item">Counselor support for course selection</div>
        <p className="small" style={{ color: "#cfdbf5" }}>Your account is secured with encrypted authentication and role-based dashboard access.</p>
      </article>

      <article className="card">
        <h2>Student Registration</h2>
        <p className="small">Complete the form to reserve your seat for the next legal-tech batch.</p>
        <form className="grid" style={{ gap: 10 }} onSubmit={onSubmit}>
          <label>Full Name<input required onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></label>
          <label>Email<input type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Mobile Number<input required onChange={(e) => setForm({ ...form, mobile: e.target.value })} /></label>
          <label>Law College / University<input required onChange={(e) => setForm({ ...form, lawCollege: e.target.value })} /></label>
          <div className="grid grid-2">
            <label>Year / Semester
              <select value={form.yearSemester} onChange={(e) => setForm({ ...form, yearSemester: e.target.value })}>{years.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <label>Profession
              <select value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })}>{professions.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
          </div>
          <label>City, State<input required placeholder="e.g., Delhi, Delhi" onChange={(e) => setForm({ ...form, cityState: e.target.value })} /></label>
          <label>Profile Photo URL (optional)<input placeholder="https://..." onChange={(e) => setForm({ ...form, profilePhotoUrl: e.target.value })} /></label>
          <div className="grid grid-2">
            <label>Password<input type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
            <label>Confirm Password<input type="password" required onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} /></label>
          </div>
          <p className="form-note">Password guidance: minimum 8 characters with uppercase, lowercase, number, and special symbol.</p>
          <label>
            <input type="checkbox" checked={form.accepted} onChange={(e) => setForm({ ...form, accepted: e.target.checked })} style={{ width: "auto", marginRight: 8 }} />
            I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
          </label>
          <button className="btn" type="submit">Create Account</button>
          {msg ? <p className={isError ? "form-error" : "form-success"}>{msg}</p> : null}
          <p className="form-note">Already have an account? <Link href="/student-login">Login here</Link>.</p>
        </form>
      </article>
    </section>
  );
}

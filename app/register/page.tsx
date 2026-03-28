"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const professions = ["Student", "Advocate", "Associate", "Researcher", "Compliance Professional", "Other"];
const yearSemesterOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8", "Semester 9", "Semester 10"];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string>>({ profession: "Student" });
  const [agree, setAgree] = useState(false);
  const [alert, setAlert] = useState<{ type: "danger" | "success"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const passwordScore = useMemo(() => {
    const pwd = form.password || "";
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  }, [form.password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);

    if (!agree) return setAlert({ type: "danger", message: "Please accept Terms and Privacy Policy." });
    if ((form.password || "").length < 8) return setAlert({ type: "danger", message: "Password must be at least 8 characters." });
    if (form.password !== form.confirmPassword) return setAlert({ type: "danger", message: "Confirm password does not match." });

    setSaving(true);
    const payload = { ...form };
    delete payload.confirmPassword;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) return setAlert({ type: "danger", message: data.error || "Registration failed." });

    setAlert({ type: "success", message: "Profile created. Redirecting to workspace..." });
    setTimeout(() => router.push("/student"), 700);
  }

  return (
    <section className="auth-shell">
      <aside className="auth-panel">
        <span className="badge">Admissions</span>
        <h1 style={{ marginTop: ".5rem" }}>Join the AI Law Career Accelerator</h1>
        <p>
          Build practical legal AI competence with structured labs, live sessions, and high-trust certification.
        </p>
        <div className="grid grid-2">
          <article className="card" style={{ padding: ".7rem" }}><h3>8+ weeks</h3><p>Implementation-led learning journey.</p></article>
          <article className="card" style={{ padding: ".7rem" }}><h3>Portfolio-first</h3><p>Outcome-focused assignments for employability.</p></article>
        </div>
      </aside>

      <form className="card auth-card" onSubmit={onSubmit}>
        <h2 style={{ marginTop: 0 }}>Create your learner account</h2>
        <div className="grid grid-2">
          <label>Full name<input required onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} /></label>
          <label>Email<input type="email" required onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></label>
          <label>Mobile number<input required minLength={10} onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))} /></label>
          <label>Law college / university<input required onChange={(e) => setForm((p) => ({ ...p, lawCollege: e.target.value }))} /></label>
          <label>Year / semester
            <select required onChange={(e) => setForm((p) => ({ ...p, yearSemester: e.target.value }))}>
              <option value="">Select year/semester</option>
              {yearSemesterOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label>City / state<input required onChange={(e) => setForm((p) => ({ ...p, cityState: e.target.value }))} /></label>
          <label>Profession
            <select value={form.profession || "Student"} onChange={(e) => setForm((p) => ({ ...p, profession: e.target.value }))}>
              {professions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Profile photo URL (optional)<input type="url" onChange={(e) => setForm((p) => ({ ...p, profilePhotoUrl: e.target.value }))} /></label>
          <label>Password<input type="password" required minLength={8} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} /></label>
          <label>Confirm password<input type="password" required minLength={8} onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))} /></label>
        </div>

        <div style={{ marginTop: 10 }}>
          <p className="small" style={{ marginBottom: 4 }}>Password strength</p>
          <div className="progress"><span style={{ width: `${passwordScore * 25}%` }} /></div>
        </div>

        <label style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ width: 16, marginTop: 2 }} />
          I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </label>

        <button className="btn" type="submit" style={{ marginTop: 12, width: "100%" }} disabled={saving}>{saving ? "Submitting..." : "Create Account"}</button>
        {alert ? <p className={`alert alert-${alert.type}`}>{alert.message}</p> : null}
        <p className="small" style={{ marginTop: 10 }}>Already registered? <Link href="/login?role=student">Login</Link>.</p>
      </form>
    </section>
  );
}

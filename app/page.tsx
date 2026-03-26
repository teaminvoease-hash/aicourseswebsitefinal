import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <span className="badge">Legal-Tech Education for India</span>
      <h1>AI Law Course for Indian Students & Legal Professionals</h1>
      <p>
        One-time full payment of <b>₹3000</b> (discounted from ₹4000). Weekly live online classes,
        complete course access, and a verifiable completion certificate.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <Link className="btn" href="/courses">
          Explore Course
        </Link>
        <Link className="btn btn-outline" href="/register">
          Register Now
        </Link>
      </div>
      <div className="grid grid-3" style={{ marginTop: 24 }}>
        <article className="card"><h3>Practical Curriculum</h3><p>Drafting, research, and compliance workflows using AI.</p></article>
        <article className="card"><h3>Weekly Online Classes</h3><p>Live mentor sessions every week with class schedule in dashboard.</p></article>
        <article className="card"><h3>Verification-Ready Certificate</h3><p>Unique certificate verification ID with public checker page.</p></article>
      </div>
      <p className="small" style={{ marginTop: 18 }}>
        Educational course only. Not legal advice.
      </p>
    </section>
  );
}

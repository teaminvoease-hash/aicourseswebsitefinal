import Link from "next/link";

const pillars = [
  {
    title: "AI + Legal Drafting Labs",
    description: "Practice petitions, contracts, notices, and compliance drafts with structured AI prompts and review checklists."
  },
  {
    title: "Indian Law Focus",
    description: "Learn practical workflows aligned to Indian legal education, litigation support, and legal operations teams."
  },
  {
    title: "Mentored Career Readiness",
    description: "Get guided assignments, capstone work, and portfolio feedback to become job-ready in legal-tech roles."
  }
];

const trustHighlights = [
  { label: "Live weekly sessions", value: "Every Week" },
  { label: "Program fee", value: "₹3,000 (discounted)" },
  { label: "Certificate verification", value: "Public & Unique ID" },
  { label: "Access model", value: "One-time payment" }
];

const outcomes = [
  "Build reliable prompt frameworks for legal research and drafting.",
  "Understand AI ethics, privacy, and responsible use in legal practice.",
  "Deliver faster research summaries with verification-first methodology.",
  "Track learning progress through a student dashboard and milestones."
];

const learnerTracks = [
  "Law students preparing for internships and placements",
  "Junior advocates and associates improving drafting speed",
  "Compliance and legal operations professionals adopting AI",
  "Founders and in-house teams building AI-supported legal workflows"
];

export default function HomePage() {
  return (
    <>
      <section className="hero hero-upgraded law-hero">
        <span className="badge">AI Law Training Program • Admissions Open for 2026 Cohort</span>
        <h1>Build Real AI Skills for Legal Work — Not Just Theory</h1>
        <p>
          Master practical legal AI workflows through live classes, drafting labs, and research simulations.
          From enrollment to certificate verification, this platform is built for real students, active legal
          professionals, and teams adopting AI in day-to-day legal execution.
        </p>

        <div className="cta-row">
          <Link className="btn flashy-btn" href="/register">
            Start Enrollment
          </Link>
          <Link className="btn btn-outline" href="/courses">
            Explore Course Curriculum
          </Link>
          <Link className="btn btn-outline" href="/login?role=student">
            Student Login
          </Link>
        </div>
      </section>

      <section className="grid grid-4" style={{ marginTop: 16 }}>
        {trustHighlights.map((item) => (
          <article className="card kpi" key={item.label}>
            <span className="small">{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="grid grid-3" style={{ marginTop: 16 }}>
        {pillars.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="card promo-panel">
        <h2>What You&apos;ll Achieve in This AI Law Program</h2>
        <div className="grid grid-2">
          {outcomes.map((outcome) => (
            <p className="benefit-item" key={outcome}>✅ {outcome}</p>
          ))}
        </div>
      </section>

      <section className="card info-strip">
        <h2>Who Should Join</h2>
        <div className="grid grid-2">
          {learnerTracks.map((track) => (
            <p key={track}>• {track}</p>
          ))}
        </div>
      </section>

      <section className="card info-strip">
        <div>
          <h3>Built for Real Training Operations</h3>
          <p>
            Students can register, complete payment, access course modules, track progress, submit assignments,
            and verify certificates in one workflow. Admin teams can manage students, schedules, payments, and
            certification status from a centralized dashboard.
          </p>
        </div>
        <div className="cta-row">
          <Link href="/register" className="btn">Register Now</Link>
          <Link href="/login?role=admin" className="btn btn-outline">Admin Login</Link>
        </div>
      </section>

      <p className="small" style={{ marginTop: 18 }}>
        Educational training program only. Not legal advice.
      </p>
    </>
  );
}

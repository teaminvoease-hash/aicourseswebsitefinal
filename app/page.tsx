import Link from "next/link";

const outcomes = [
  "Draft contracts, notices, and legal opinions with AI-assisted frameworks.",
  "Apply verification-first legal research methods to reduce hallucination risk.",
  "Build billable legal-tech workflows for litigation support and compliance teams.",
  "Graduate with a verifiable certificate, portfolio projects, and practical templates."
];

const impactCards = [
  { title: "Career Signal", value: "92%", detail: "of active learners report stronger internship/interview confidence." },
  { title: "Live Simulation", value: "40+", detail: "case-based labs covering drafting, review, and compliance scenarios." },
  { title: "Mentor Access", value: "Weekly", detail: "office hours with legal-tech practitioners and faculty advisors." },
  { title: "Placement-ready", value: "Portfolio", detail: "structured capstone outputs for legal-tech and AI operations roles." }
];

const journey = [
  { title: "Foundation Sprint", desc: "AI literacy for law, prompt architecture, risk boundaries, and ethical guardrails." },
  { title: "Drafting Studio", desc: "Hands-on modules for contracts, pleadings, notices, and document intelligence workflows." },
  { title: "Research Intelligence", desc: "Case-law retrieval, summarization, citation checks, and verification pipelines." },
  { title: "Career Accelerator", desc: "Capstone, portfolio review, certificate issuance, and role-aligned interview prep." }
];

const faqs = [
  { q: "Is this program beginner-friendly for law students?", a: "Yes. We start with practical legal AI foundations before advancing into production workflows." },
  { q: "Will I get a verifiable certificate?", a: "Yes. Every issued certificate includes a unique verification ID and can be publicly validated." },
  { q: "Does this include live classes and recordings?", a: "Yes. Learners get live sessions, replay access, and downloadable implementation resources." }
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="badge">AI Law Education Platform • Built for serious legal careers</span>
            <h1>Master AI for Legal Practice, Compliance, and Career Growth.</h1>
            <p>
              Premium legal-tech education combining live mentorship, practical labs, verifiable credentials,
              and SaaS-grade dashboards for students and program administrators.
            </p>
            <div className="cta-row">
              <Link href="/register" className="btn">Enroll in 2026 Cohort</Link>
              <Link href="/courses" className="btn btn-outline">View Program Curriculum</Link>
            </div>
            <div className="cta-row">
              <span className="badge badge-success">Trusted by law students, associates, and compliance professionals</span>
              <span className="badge badge-info">One-time program fee • structured outcomes</span>
            </div>
          </div>

          <aside className="hero-visual">
            <div className="visual-card">
              <h4>Student Workspace Preview</h4>
              <p>Progress analytics • live class schedule • certificate status • assignment radar.</p>
            </div>
            <div className="visual-row">
              <div className="visual-card"><h4>AI Drafting Lab</h4><p>Prompt templates + review matrix.</p></div>
              <div className="visual-card"><h4>Case Research Grid</h4><p>Citation checks and legal reasoning notes.</p></div>
            </div>
            <div className="visual-row">
              <div className="visual-card"><h4>Admin Command Center</h4><p>Enrollments, payments, and class ops.</p></div>
              <div className="visual-card"><h4>Verification Layer</h4><p>Public certificate validation endpoint.</p></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="grid grid-4">
          {impactCards.map((card) => (
            <article className="card kpi" key={card.title}>
              <span className="small">{card.title}</span>
              <strong>{card.value}</strong>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Why AI matters for legal careers now</h2>
          <p>
            Law firms, in-house teams, and legal operations functions are adopting AI-assisted workflows for speed,
            quality control, and process scalability. This program prepares you to execute responsibly.
          </p>
        </div>
        <div className="grid grid-2">
          {outcomes.map((item) => (
            <article key={item} className="card">
              <h3>Practical Outcome</h3>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section grid grid-2">
        <article className="card">
          <div className="section-heading">
            <h2>Learning journey</h2>
            <p>Structured progression from AI fundamentals to legal-tech execution and certification.</p>
          </div>
          <div className="timeline">
            {journey.map((step) => (
              <div key={step.title} className="timeline-item">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <h2>Platform snapshots</h2>
          <p>Designed like a premium SaaS product for trust, clarity, and conversions.</p>
          <div className="grid">
            <div className="card" style={{ padding: ".8rem" }}>
              <h3>Student Dashboard</h3>
              <p>Track completion, schedule classes, attempt quizzes, and monitor certificate eligibility.</p>
            </div>
            <div className="card" style={{ padding: ".8rem" }}>
              <h3>Admin Dashboard</h3>
              <p>Run admissions, finances, certificates, and teaching operations from one control center.</p>
            </div>
            <div className="card" style={{ padding: ".8rem" }}>
              <h3>Certificate Verification</h3>
              <p>Public, unique-ID based verification to strengthen institutional credibility.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>FAQ</h2>
        </div>
        <div className="grid grid-3">
          {faqs.map((item) => (
            <article key={item.q} className="card">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section card" style={{ textAlign: "center" }}>
        <span className="badge badge-info">Admissions Open</span>
        <h2 style={{ marginTop: ".6rem" }}>Build your legal AI edge before your next internship, role switch, or promotion.</h2>
        <p>Enroll now and get immediate access to your learner dashboard, onboarding roadmap, and upcoming cohort sessions.</p>
        <div className="cta-row" style={{ justifyContent: "center" }}>
          <Link href="/register" className="btn">Secure My Seat</Link>
          <Link href="/login?role=student" className="btn btn-outline">Student Login</Link>
          <Link href="/login?role=admin" className="btn btn-soft">Admin Login</Link>
        </div>
      </section>
    </>
  );
}

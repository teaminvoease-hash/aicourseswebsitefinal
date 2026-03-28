export default function AboutPage() {
  return (
    <section>
      <h1>About AI Law Academy India</h1>
      <p>
        AI Law Academy India is a practical legal-tech learning platform focused on the Indian legal ecosystem.
        We train law students, junior advocates, and legal professionals to use AI responsibly in research,
        drafting, and compliance work.
      </p>
      <div className="grid grid-3" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Our Mission</h3>
          <p className="small">
            Make AI adoption in legal practice structured, ethical, and outcome-focused.
          </p>
        </article>
        <article className="card">
          <h3>How We Teach</h3>
          <p className="small">
            Weekly live sessions, guided assignments, and implementation-first labs.
          </p>
        </article>
        <article className="card">
          <h3>What Makes Us Different</h3>
          <p className="small">
            A complete training system with learner dashboard, progress tracking, and certificate verification.
          </p>
        </article>
      </div>
    </section>
  );
}

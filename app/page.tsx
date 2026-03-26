import Link from "next/link";

const highlights = [
  {
    title: "1-Month Fast-Track Program",
    description: "Complete the entire course in 4 weeks with 8 total live classes.",
  },
  {
    title: "Deep Knowledge + Technical Skills",
    description: "Learn AI fundamentals, legal-tech workflows, prompting, drafting, and practical implementation.",
  },
  {
    title: "Hands-On AI Training",
    description: "Train on real tasks with guided exercises, class assignments, and mentor feedback.",
  },
];

const reasonsToJoin = [
  "Career-focused learning designed for students and working professionals.",
  "Small-batch live classes for better doubt solving and personal guidance.",
  "Industry-relevant curriculum that blends legal understanding with AI execution.",
  "Certificate-ready progress with practical portfolio-building projects.",
];

export default function HomePage() {
  return (
    <>
      <section className="hero hero-upgraded">
        <span className="badge">Admissions Open • New Batch Starting Soon</span>
        <h1>Become Future-Ready with AI Courses Built for Real Careers</h1>
        <p>
          Join our premium <b>1-month course</b> with <b>8 total live classes</b> and hands-on implementation.
          Build deep knowledge, technical skills, and practical AI training that helps you stand out.
        </p>

        <div className="cta-row">
          <Link className="btn flashy-btn" href="/register">
            ✨ Enroll Now
          </Link>
          <Link className="btn btn-outline" href="/courses">
            View Course Plan
          </Link>
        </div>

        <div className="grid grid-3" style={{ marginTop: 24 }}>
          {highlights.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card promo-panel">
        <h2>Why You Should Join These Courses</h2>
        <div className="grid grid-2">
          {reasonsToJoin.map((reason) => (
            <p key={reason} className="benefit-item">
              ✅ {reason}
            </p>
          ))}
        </div>
      </section>

      <section className="card info-strip">
        <div>
          <h3>Student Access & Support</h3>
          <p>
            New students can quickly create an account and start learning through a simple register and login flow.
          </p>
        </div>
        <div className="cta-row">
          <Link href="/register" className="btn">
            Student Register
          </Link>
          <Link href="/login" className="btn btn-outline">
            Student Login
          </Link>
        </div>
      </section>

      <section className="card info-strip">
        <div>
          <h3>Transparent Refund Policy</h3>
          <p>
            We follow a clear and student-friendly refund policy. Please read all terms before payment.
          </p>
        </div>
        <Link href="/refund-policy" className="btn btn-outline">
          Read Refund Policy
        </Link>
      </section>

      <p className="small" style={{ marginTop: 18 }}>
        Educational training program only. Not legal advice.
      </p>
    </>
  );
}

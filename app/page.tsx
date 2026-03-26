import Link from "next/link";
import { catalogCourses, faqs, platformName } from "@/lib/content";

const trust = ["Live + Recorded Delivery", "Verifiable Certificates", "One-Time Transparent Fees", "Admissions Counselor Support"];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <span className="badge">Legal-Tech Admissions Open • April 2026 Cohort</span>
        <h1>Practical AI Training for Law Students, Associates, and Compliance Teams</h1>
        <p>
          {platformName} helps legal professionals adopt AI responsibly across research, drafting, documentation, and case preparation.
          Learn deployable workflows—not theory-heavy content—through structured classes, assignments, and faculty review.
        </p>
        <div className="inline-list" style={{ marginTop: 12 }}>
          <Link href="/register" className="btn">Enroll Now</Link>
          <Link href="/courses" className="btn btn-outline">View Courses</Link>
          <Link href="/student-login" className="btn btn-outline">Student Login</Link>
          <Link href="/contact" className="btn btn-muted">Download Brochure</Link>
        </div>
        <section className="hero-grid">
          <div className="hero-metrics">
            {[["1,500+", "Learners trained"], ["94%", "Learners complete assessments"], ["4.8/5", "Session feedback"], ["24h", "Admissions response window"]].map(([value, label]) => (
              <article key={label} className="metric-card"><strong>{value}</strong><span>{label}</span></article>
            ))}
          </div>
          <aside className="hero-side">
            <h3 style={{ color: "#fff" }}>Next Batch Snapshot</h3>
            <p className="small" style={{ color: "#dce8ff" }}>Start date: April 15, 2026 • Seats filling across research and contract tracks.</p>
            <p className="small" style={{ color: "#dce8ff" }}>Early enrollment benefit: orientation clinic + legal prompt kit.</p>
            <div className="inline-list">
              <a href="https://wa.me/15550102244" className="btn btn-muted">WhatsApp Inquiry</a>
              <Link href="/contact" className="btn btn-outline">Request Callback</Link>
            </div>
          </aside>
        </section>
      </section>

      <section className="grid grid-4" style={{ marginTop: 16 }}>
        {trust.map((item) => <article className="card" key={item}><strong>{item}</strong></article>)}
      </section>

      <section className="grid grid-2" style={{ marginTop: 16 }}>
        <article className="card">
          <h2 className="section-title">Why AI matters for legal careers now</h2>
          <p className="small">Law firms and in-house teams increasingly expect AI-enabled research speed, drafting consistency, and documentation quality control.</p>
          <div className="timeline-item"><strong>Research:</strong> reduce first-pass case law review time.</div>
          <div className="timeline-item"><strong>Drafting:</strong> improve contract and notice turnaround without losing legal judgment.</div>
          <div className="timeline-item"><strong>Compliance:</strong> organize policy and reporting documentation with traceable workflows.</div>
        </article>
        <article className="card">
          <h2 className="section-title">Who should enroll</h2>
          <ul>
            <li>LLB / LLM students and legal interns</li>
            <li>Junior advocates and law firm associates</li>
            <li>Legal researchers and documentation teams</li>
            <li>Compliance and governance professionals</li>
          </ul>
          <p className="small">No coding required. Legal reasoning and commitment to practice assignments are sufficient.</p>
        </article>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h2 className="section-title">Course benefits and outcomes</h2>
        <div className="grid grid-3">
          {[
            ["Live classes + recordings + assignments", "Attend interactive sessions and revise with recordings and downloadable resources."],
            ["Tool-specific practical labs", "Use current AI tools through legal workflows for research, drafting, and compliance tasks."],
            ["Certificate with verification ID", "Completion credentials are verifiable and linked to course-level completion criteria."],
            ["Career-aligned curriculum", "Each module maps to internships, law firm output quality, or in-house legal productivity."],
            ["Objection handling support", "Admissions counselors help with suitability, schedule, and payment concerns."],
            ["Transparent fee model", "One-time fee per course. No hidden charges after enrollment."],
          ].map(([title, note]) => <article className="card" key={title}><h3>{title}</h3><p className="small">{note}</p></article>)}
        </div>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h2 className="section-title">Programs and pricing</h2>
        <div className="grid grid-3">
          {catalogCourses.map((course) => (
            <article key={course.slug} className="card">
              <span className="badge">{course.upcoming ? "Upcoming" : "Open"}</span>
              <h3>{course.title}</h3>
              <p className="small">{course.shortDescription}</p>
              <p><strong>{course.duration}</strong> • {course.mode}</p>
              <p><strong>{course.fee}</strong></p>
              <p className="small">{course.batchStart} • {course.seatsLeft}</p>
              <Link href={`/course/${course.slug}`} className="btn">View Course</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-2" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>How enrollment works</h3>
          {["Submit registration form", "Receive counselor call & syllabus", "Choose course + complete payment", "Access student dashboard instantly", "Attend classes and complete assignments", "Download certificate after eligibility"].map((item, idx) => (
            <div key={item} className="timeline-item"><strong>Step {idx + 1}:</strong> {item}</div>
          ))}
          <Link href="/how-to-enroll" className="btn btn-outline">See Complete Enrollment Flow</Link>
        </article>
        <article className="card">
          <h3>Certificate and verification</h3>
          <p>Each issued certificate includes a unique verification ID that can be validated on the official verification portal.</p>
          <p className="small">Certificate confirms successful course completion only; it does not grant legal license, regulatory approval, or legal advice authority.</p>
          <div className="inline-list">
            <Link href="/verify-certificate" className="btn btn-outline">Verify Certificate</Link>
            <Link href="/student/certificate" className="btn btn-muted">Certificate Center</Link>
          </div>
        </article>
      </section>

      <section className="grid grid-2" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Testimonials</h3>
          <p><strong>LLM Student:</strong> “The legal research workflow classes were directly useful for dissertation and internships.”</p>
          <p><strong>Law Associate:</strong> “Contract drafting modules helped me deliver better first drafts with review discipline.”</p>
          <p><strong>Compliance Analyst:</strong> “Documentation checklists and policy prompts improved our monthly reporting speed.”</p>
        </article>
        <article className="card">
          <h3>Request brochure, syllabus, or callback</h3>
          <form className="grid" style={{ gap: 10 }}>
            <label>Full Name<input placeholder="Your name" /></label>
            <label>Email<input type="email" placeholder="name@example.com" /></label>
            <label>Interest<select><option>Download Brochure</option><option>Get Syllabus</option><option>Book Orientation Class</option><option>Request Callback</option></select></label>
            <button className="btn" type="button">Submit Request</button>
            <p className="form-note">By submitting, you agree to receive admissions communication via email/phone/WhatsApp.</p>
          </form>
        </article>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h3>FAQ Preview</h3>
        {faqs.slice(0, 4).map((item) => <div key={item.q}><strong>{item.q}</strong><p className="small">{item.a}</p></div>)}
        <Link href="/faq" className="btn btn-outline">Read Full FAQ</Link>
      </section>

      <section className="card card-dark" style={{ marginTop: 16 }}>
        <h2>Ready to build legal-tech capability that employers value?</h2>
        <p>Enroll in a structured course, join live sessions, and develop practical AI workflows for legal work output.</p>
        <div className="inline-list">
          <Link href="/register" className="btn">Enroll Now</Link>
          <Link href="/contact" className="btn btn-outline">Talk to Counselor</Link>
        </div>
      </section>
    </>
  );
}

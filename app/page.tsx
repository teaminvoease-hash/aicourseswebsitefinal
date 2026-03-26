import Link from "next/link";
import { catalogCourses, faqs, platformName } from "@/lib/content";

const benefits = [
  "Learn practical AI skills for legal work",
  "Improve legal research speed",
  "Draft contracts and notices faster",
  "Increase productivity in internships and law practice",
  "Build future-ready legal-tech competence",
  "Learn ethical and responsible AI use in legal contexts",
];

const audiences = [
  "Law students and LLB/LLM learners",
  "Junior advocates and legal associates",
  "In-house legal interns",
  "Compliance executives",
  "Legal researchers and documentation professionals",
];

const enrollmentSteps = [
  "Create your student account",
  "Complete your profile and verification details",
  "Choose your course",
  "Make one-time payment",
  "Get instant dashboard access",
  "Attend classes and complete assessments",
  "Receive your completion certificate",
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <span className="badge">Legal-Tech Academy • Admissions Open</span>
        <h1>Master AI for Law and Legal Practice</h1>
        <p>
          {platformName} delivers practical, structured, and professionally guided AI training for law students,
          associates, and compliance professionals. Build legal-tech capability with live classes, workflow labs,
          and role-focused curriculum.
        </p>
        <div className="nav-links" style={{ marginTop: 12 }}>
          <Link href="/courses" className="btn">View Courses</Link>
          <Link href="/register" className="btn btn-outline">Enroll Now</Link>
          <Link href="/student-login" className="btn btn-outline">Student Login</Link>
        </div>
      </section>

      <section style={{ marginTop: 18 }} className="grid grid-3">
        {["Trusted by law learners", "Structured legal-tech curriculum", "Certificate verification ready"].map((item) => (
          <article key={item} className="card"><h3>{item}</h3><p className="small">Professional, outcome-oriented AI training for the legal domain.</p></article>
        ))}
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2 className="section-title">Why choose us</h2>
        <p className="section-note">A serious legal-tech institution style built for long-term professional growth.</p>
        <div className="grid grid-2">
          {benefits.map((b) => <p key={b}>• {b}</p>)}
        </div>
      </section>

      <section className="grid grid-2" style={{ marginTop: 18 }}>
        <article className="card">
          <h3>Who should enroll</h3>
          <ul>{audiences.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="card">
          <h3>How enrollment works</h3>
          {enrollmentSteps.map((item, index) => (
            <div className="timeline-item" key={item}><strong>Step {index + 1}:</strong> {item}</div>
          ))}
          <Link href="/how-to-enroll" className="btn" style={{ marginTop: 8 }}>See Full Enrollment Flow</Link>
        </article>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2 className="section-title">Course highlights</h2>
        <div className="grid grid-3">
          {catalogCourses.slice(0, 3).map((course) => (
            <article key={course.slug} className="card">
              <h3>{course.title}</h3>
              <p className="small">{course.shortDescription}</p>
              <p><strong>{course.duration}</strong> • {course.level}</p>
              <Link href={`/course/${course.slug}`} className="btn btn-outline">View Details</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-2" style={{ marginTop: 18 }}>
        <article className="card">
          <h3>Certificates and verification</h3>
          <p>
            Certificates are issued only after completion verification. Every certificate carries a unique
            verification ID for authenticity checks.
          </p>
          <p className="small">Certificate confirms course completion only; it is not a legal license or statutory qualification.</p>
          <Link href="/verify-certificate" className="btn btn-outline">Verify Certificate</Link>
        </article>
        <article className="card">
          <h3>What learners say</h3>
          <p>“The workflows were practical and immediately useful in legal internships.”</p>
          <p>“Best structured AI-for-law course I found—serious and professional.”</p>
          <p>“Certificate verification and dashboard tracking gave confidence.”</p>
        </article>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h3>FAQ Preview</h3>
        {faqs.slice(0, 3).map((item) => (
          <div key={item.q}><strong>{item.q}</strong><p className="small">{item.a}</p></div>
        ))}
        <Link href="/faq" className="btn btn-outline">Read all FAQs</Link>
      </section>
    </>
  );
}

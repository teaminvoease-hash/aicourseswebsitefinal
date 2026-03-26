import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogCourses } from "@/lib/content";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = catalogCourses.find((item) => item.slug === params.slug);
  if (!course) notFound();

  const related = catalogCourses.filter((item) => item.slug !== course.slug).slice(0, 3);

  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <span className="badge">{course.upcoming ? "Upcoming Cohort" : "Admissions Open"}</span>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <div className="inline-list">
          <span className="pill">Duration: {course.duration}</span>
          <span className="pill">Mode: {course.mode}</span>
          <span className="pill">Level: {course.level}</span>
          <span className="pill">Fee: {course.fee}</span>
        </div>
      </article>

      <article className="grid grid-2">
        <section className="card">
          <h3>Why this course matters</h3>
          <p className="small">Build practice-ready capability in legal workflows where AI can improve turnaround quality while preserving legal review controls.</p>
          <h3>Who this course is for</h3>
          <p className="small">{course.eligibility}</p>
          <h3>Tools and platforms covered</h3>
          <div className="inline-list">{course.tools.map((tool) => <span key={tool} className="pill">{tool}</span>)}</div>
        </section>
        <section className="card">
          <h3>Learning outcomes</h3>
          <ul>{course.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
          <h3>Sample deliverables</h3>
          <ul>
            <li>Role-based legal prompt packs</li>
            <li>Research memo or drafting assignment</li>
            <li>Quality checklist for AI output review</li>
            <li>Portfolio-ready legal-tech workflow submission</li>
          </ul>
        </section>
      </article>

      <article className="card">
        <h3>Syllabus modules</h3>
        <ol>{course.modules.map((item) => <li key={item}>{item}</li>)}</ol>
        <h3>Class format and support</h3>
        <p className="small">Live sessions, revision recordings, assignment reviews, and support through dashboard updates and structured announcements.</p>
        <h3>Certificate details</h3>
        <p className="small">Certificate issued after completion criteria are met (attendance + assignments/quiz). Verification ID available for authenticity checks.</p>
        <h3>Fee and payment details</h3>
        <p className="small">{course.fee}. One-time payment, no hidden charges. Coupon field available during enrollment checkout.</p>
        <div className="inline-list">
          <Link className="btn" href="/register">Enroll Now</Link>
          <Link className="btn btn-outline" href="/contact">Request Syllabus by Email</Link>
        </div>
      </article>

      <article className="card">
        <h3>Course FAQ</h3>
        <p><strong>Do I need prior AI experience?</strong> No. Beginner-friendly onboarding is included.</p>
        <p><strong>Are classes recorded?</strong> Yes, recordings are provided for revision.</p>
        <p><strong>Is this legal advice training?</strong> No, this is educational skill training for legal workflows.</p>
      </article>

      <article className="card">
        <h3>Related courses</h3>
        <div className="grid grid-3">
          {related.map((item) => (
            <article key={item.slug} className="card">
              <h4>{item.title}</h4>
              <p className="small">{item.shortDescription}</p>
              <Link href={`/course/${item.slug}`} className="btn btn-outline">View Course</Link>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

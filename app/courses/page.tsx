import Link from "next/link";
import { catalogCourses } from "@/lib/content";

export default function CoursesPage() {
  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <span className="badge">Career-Focused Legal-Tech Tracks</span>
        <h1>AI Law Courses</h1>
        <p className="small">Choose role-based programs with clear outcomes, certificate eligibility, and transparent one-time pricing.</p>
      </article>

      <section className="grid grid-3">
        {catalogCourses.map((course) => (
          <article className="card" key={course.slug}>
            <span className="badge">{course.upcoming ? "Upcoming" : "Admissions Open"}</span>
            <h3>{course.title}</h3>
            <p className="small">{course.shortDescription}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Mode:</strong> {course.mode}</p>
            <p><strong>Certificate:</strong> {course.certificate}</p>
            <p><strong>Learner level:</strong> {course.level}</p>
            <p><strong>Fee:</strong> {course.fee}</p>
            <p className="small"><strong>Batch:</strong> {course.batchStart} • {course.seatsLeft}</p>
            <div className="inline-list">
              <Link className="btn" href={`/course/${course.slug}`}>View Details</Link>
              <Link className="btn btn-outline" href="/register">Enroll Now</Link>
            </div>
          </article>
        ))}
      </section>

      <article className="card">
        <h3>Need help selecting the right track?</h3>
        <p className="small">Book a free orientation call and get syllabus recommendations based on your role and goals.</p>
        <div className="inline-list">
          <Link href="/contact" className="btn">Book Orientation</Link>
          <a href="https://wa.me/15550102244" className="btn btn-outline">WhatsApp Admissions</a>
        </div>
      </article>
    </section>
  );
}

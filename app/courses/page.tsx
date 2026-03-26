import Link from "next/link";
import { catalogCourses } from "@/lib/content";

export default function CoursesPage() {
  return (
    <section>
      <h1>AI Law Courses</h1>
      <p className="small">Role-oriented, online, certificate-enabled programs for legal-tech readiness.</p>
      <div className="grid grid-3" style={{ marginTop: 12 }}>
        {catalogCourses.map((course) => (
          <article className="card" key={course.slug}>
            <h3>{course.title}</h3>
            <p className="small">{course.shortDescription}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Mode:</strong> {course.mode}</p>
            <p><strong>Certificate:</strong> {course.certificate}</p>
            <p><strong>Fee:</strong> {course.fee}</p>
            <p><strong>Skill level:</strong> {course.level}</p>
            <Link className="btn" href={`/course/${course.slug}`}>Enroll</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

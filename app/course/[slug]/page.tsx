import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogCourses } from "@/lib/content";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = catalogCourses.find((item) => item.slug === params.slug);
  if (!course) notFound();

  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Eligibility:</strong> {course.eligibility}</p>
        <p><strong>Certification:</strong> {course.certificate}</p>
        <p><strong>Fee details:</strong> {course.fee} (one-time full payment)</p>
      </article>

      <article className="card grid grid-2">
        <div>
          <h3>Learning outcomes</h3>
          <ul>{course.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h3>Modules</h3>
          <ol>{course.modules.map((item) => <li key={item}>{item}</li>)}</ol>
        </div>
      </article>

      <article className="card">
        <h3>Instructor</h3>
        <p>{course.instructor}</p>
        <div className="nav-links">
          <Link className="btn" href="/register">Enroll Now</Link>
          <Link className="btn btn-outline" href="/how-to-enroll">Enrollment Process</Link>
        </div>
      </article>

      <article className="card">
        <h3>Course FAQ</h3>
        <p><strong>Are classes live?</strong> Yes, this course includes live sessions and revision recordings.</p>
        <p><strong>Will I get a certificate?</strong> Yes, post-completion, with unique verification ID.</p>
        <p><strong>Does this provide legal advice?</strong> No, this is educational training only.</p>
      </article>
    </section>
  );
}

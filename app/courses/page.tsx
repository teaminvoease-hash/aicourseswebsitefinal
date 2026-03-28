import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CourseListItem = {
  id: string | number;
  title: string;
  shortDescription: string;
  feeInr: number;
  discountedFeeInr: number;
  slug: string;
  level?: string | null;
  durationWeeks?: number | null;
};

export default async function CoursesPage() {
  const courses: CourseListItem[] = await prisma.course.findMany({ where: { isPublished: true } });

  return (
    <section>
      <div className="hero" style={{ padding: "1.1rem" }}>
        <span className="badge">Programs</span>
        <h1 style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)" }}>Premium AI + Law Programs</h1>
        <p>
          Role-based, implementation-oriented curriculum designed for law students, advocates,
          compliance professionals, and legal operations teams.
        </p>
      </div>

      <div className="section grid grid-3">
        {courses.map((course) => (
          <article className="card" key={course.id}>
            <span className="badge badge-info">{course.level ?? "Professional Track"}</span>
            <h3 style={{ marginTop: ".55rem" }}>{course.title}</h3>
            <p>{course.shortDescription}</p>
            <p className="small">Duration: {course.durationWeeks ?? 8} weeks • Live + Recorded</p>
            <p>
              <span className="small">Program Fee</span><br />
              <s>₹{course.feeInr}</s> <strong style={{ fontSize: "1.3rem", color: "#fff" }}>₹{course.discountedFeeInr}</strong>
            </p>
            <div className="cta-row">
              <Link className="btn" href={`/course/${course.slug}`}>View Curriculum</Link>
              <Link className="btn btn-outline" href="/register">Apply</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

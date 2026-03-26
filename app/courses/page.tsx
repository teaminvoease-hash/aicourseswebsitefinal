import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({ where: { isPublished: true } });

  return (
    <section>
      <h1>Courses</h1>
      <div className="grid grid-3">
        {courses.map((course) => (
          <article className="card" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.shortDescription}</p>
            <p>
              <s>₹{course.feeInr}</s> <b>₹{course.discountedFeeInr}</b>
            </p>
            <Link className="btn" href={`/course/${course.slug}`}>
              View Details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

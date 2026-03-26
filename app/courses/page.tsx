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
};

export default async function CoursesPage() {
  const courses: CourseListItem[] = await prisma.course.findMany({ where: { isPublished: true } });

  return (
    <section>
      <h1>Courses</h1>
      <div className="grid grid-3">
        {courses.map((course: CourseListItem) => (
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

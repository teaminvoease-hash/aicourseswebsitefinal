import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PurchaseButton from "@/components/PurchaseButton";

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: { lessons: { orderBy: { orderNo: "asc" } } }
  });

  if (!course) notFound();

  return (
    <section>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>
        Course Fee: <s>₹{course.feeInr}</s> <strong>₹{course.discountedFeeInr}</strong> (One-time payment)
      </p>
      <h3>Modules</h3>
      <ul>
        {course.lessons.map((lesson) => (
          <li key={lesson.id}>{lesson.orderNo}. {lesson.title}</li>
        ))}
      </ul>
      <Link className="btn" href="/register">Register</Link>
      <PurchaseButton courseSlug={course.slug} />
    </section>
  );
}

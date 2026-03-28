import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PurchaseButton from "@/components/PurchaseButton";

type Lesson = { id: string | number; orderNo: number; title: string };

const faqs = [
  { q: "Do I need coding background?", a: "No. The program focuses on legal workflows, AI usage patterns, and practical execution." },
  { q: "How is certification issued?", a: "After completion criteria are met, a verifiable certificate is issued with unique ID." },
  { q: "Can working professionals join?", a: "Yes, live sessions are complemented with recordings and flexible practice modules." }
];

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: { lessons: { orderBy: { orderNo: "asc" } } }
  });

  if (!course) notFound();

  return (
    <section>
      <div className="hero">
        <div className="hero-grid">
          <div>
            <span className="badge">Flagship Program</span>
            <h1 style={{ fontSize: "clamp(1.8rem,3vw,2.9rem)" }}>{course.title}</h1>
            <p>{course.description}</p>
            <div className="cta-row">
              <Link className="btn" href="/register">Apply for Enrollment</Link>
              <PurchaseButton courseSlug={course.slug} />
            </div>
          </div>
          <aside className="card" style={{ background: "rgba(8,14,27,.45)" }}>
            <h3>Program Investment</h3>
            <p><s>₹{course.feeInr}</s> <strong style={{ fontSize: "1.6rem", color: "#fff" }}>₹{course.discountedFeeInr}</strong></p>
            <p className="small">One-time payment • full dashboard access • verifiable completion certificate</p>
            <Link href="/register" className="btn" style={{ width: "100%" }}>Enroll Now</Link>
          </aside>
        </div>
      </div>

      <div className="section grid grid-2">
        <article className="card">
          <h2>Learning outcomes</h2>
          <ul>
            <li>Apply AI-assisted drafting in contracts, notices, and legal correspondence.</li>
            <li>Build structured legal research workflows with verification checkpoints.</li>
            <li>Create reusable prompt systems for litigation and compliance operations.</li>
            <li>Develop portfolio-ready outputs for interviews and role transitions.</li>
          </ul>
        </article>
        <article className="card">
          <h2>Who should enroll</h2>
          <ul>
            <li>Law students preparing for internships and placements.</li>
            <li>Junior advocates and associates improving drafting turnaround.</li>
            <li>In-house legal and compliance professionals adopting AI tooling.</li>
            <li>Founders and legal ops teams scaling legal workflows.</li>
          </ul>
        </article>
      </div>

      <div className="section card">
        <h2>Curriculum timeline</h2>
        <div className="timeline">
          {course.lessons.map((lesson: Lesson) => (
            <div className="timeline-item" key={lesson.id}>
              <h3>Module {lesson.orderNo}: {lesson.title}</h3>
              <p>Hands-on activities, legal templates, and graded implementation tasks.</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section grid grid-3">
        {faqs.map((item) => (
          <article className="card" key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

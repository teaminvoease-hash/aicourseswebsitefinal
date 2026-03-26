import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminMcqPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/admin-login");

  const courses = await prisma.course.findMany({ orderBy: { title: "asc" } });
  const questions = await prisma.mcqQuestion.findMany({
    include: { options: { orderBy: { orderNo: "asc" } }, course: { select: { title: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>MCQ Management</h1>
        <p className="small">Create test questions from admin login. Students can attempt from their login after payment unlock.</p>
      </article>

      <article className="card">
        <h3>Add MCQ Question</h3>
        <form className="grid" style={{ gap: 10 }}>
          <label>Course
            <select name="courseId" required>
              <option value="">Select course</option>
              {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
            </select>
          </label>
          <label>Question<textarea name="question" required /></label>
          <label>Option 1<input name="option1" required /></label>
          <label>Option 2<input name="option2" required /></label>
          <label>Option 3<input name="option3" required /></label>
          <label>Option 4<input name="option4" required /></label>
          <label>Correct option index (0-3)<input name="correctOption" type="number" min={0} max={3} defaultValue={0} required /></label>
          <label>Explanation (optional)<textarea name="explanation" /></label>
          <button className="btn" formAction={async (formData: FormData) => {
            "use server";
            const sessionCheck = getSessionFromCookie();
            if (!sessionCheck || sessionCheck.role !== "ADMIN") return;
            const courseId = String(formData.get("courseId") || "");
            const question = String(formData.get("question") || "");
            const explanation = String(formData.get("explanation") || "");
            const options = ["option1", "option2", "option3", "option4"].map((k) => String(formData.get(k) || ""));
            const correctOption = Number(formData.get("correctOption") || 0);
            if (!courseId || !question || options.some((o) => !o)) return;
            await prisma.mcqQuestion.create({
              data: {
                courseId,
                question,
                explanation: explanation || null,
                options: {
                  create: options.map((optionText, index) => ({ optionText, orderNo: index + 1, isCorrect: index === correctOption }))
                }
              }
            });
          }}>Save Question</button>
        </form>
      </article>

      <article className="card">
        <h3>Existing Questions</h3>
        {questions.map((q) => (
          <div key={q.id} style={{ borderBottom: "1px solid var(--border)", padding: "10px 0" }}>
            <p><strong>{q.course.title}:</strong> {q.question}</p>
            <ul>
              {q.options.map((o) => <li key={o.id}>{o.optionText} {o.isCorrect ? "✅" : ""}</li>)}
            </ul>
          </div>
        ))}
      </article>
    </section>
  );
}

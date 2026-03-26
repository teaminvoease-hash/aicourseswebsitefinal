"use client";

import { useEffect, useState } from "react";

type Question = { id: string; question: string; options: { id: string; text: string }[] };

export default function CourseMcqPage({ params }: { params: { courseId: string } }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/student/mcq?courseId=${params.courseId}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions || []));
  }, [params.courseId]);

  async function submitTest() {
    const res = await fetch("/api/student/mcq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: params.courseId, answers })
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Could not submit test.");
      return;
    }
    setMessage(`Submitted. Score: ${data.scorePercent}% (${data.correct}/${data.total}). ${data.isPassed ? "Passed" : "Not passed yet"}.`);
  }

  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card"><h1>Course MCQ Test</h1></article>
      {questions.map((q, idx) => (
        <article className="card" key={q.id}>
          <p><strong>Q{idx + 1}.</strong> {q.question}</p>
          {q.options.map((opt) => (
            <label key={opt.id} style={{ display: "block", marginBottom: 8 }}>
              <input
                type="radio"
                name={q.id}
                value={opt.id}
                checked={answers[q.id] === opt.id}
                onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
              /> {opt.text}
            </label>
          ))}
        </article>
      ))}
      <button className="btn" onClick={submitTest}>Submit MCQ Test</button>
      <p>{message}</p>
    </section>
  );
}

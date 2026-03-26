const steps = [
  ["Create account", "Register with your academic/professional details."],
  ["Speak to counselor", "Receive course recommendation, brochure, and syllabus."],
  ["Choose course", "Select a program aligned to your legal role and goals."],
  ["Complete one-time payment", "Secure checkout with clear fee visibility and no hidden charges."],
  ["Get dashboard access", "Course modules, schedule, recordings, and materials become available."],
  ["Complete assignments & quiz", "Meet completion criteria through assessments and participation."],
  ["Receive certificate", "Issued after completion verification with unique certificate ID."],
];

export default function HowToEnrollPage() {
  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>How Enrollment Works</h1>
        <p className="small">A transparent, student-friendly admissions workflow designed for working learners and law students.</p>
      </article>
      <article className="card">
        {steps.map(([title, desc], index) => (
          <div className="timeline-item" key={title}><strong>Step {index + 1}: {title}</strong><p className="small">{desc}</p></div>
        ))}
      </article>
    </section>
  );
}

const steps = [
  "Register account",
  "Verify details",
  "Select course",
  "Make one-time payment",
  "Get dashboard access",
  "Attend classes and complete assessments",
  "Receive certificate after completion",
];

export default function HowToEnrollPage() {
  return (
    <section className="card">
      <h1>How to Enroll</h1>
      <p className="small">A clear, auditable, and student-friendly enrollment workflow.</p>
      {steps.map((step, index) => (
        <div className="timeline-item" key={step}><strong>Step {index + 1}:</strong> {step}</div>
      ))}
    </section>
  );
}

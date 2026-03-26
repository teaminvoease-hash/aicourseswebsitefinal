const points = [
  "Course content is for educational and training purposes only.",
  "No session, material, or output from this platform constitutes legal advice.",
  "Learners remain solely responsible for legal review, professional judgment, and compliance obligations.",
  "Certificate issuance confirms completion criteria only; it does not grant a legal practice license or statutory qualification.",
  "AI outputs must be independently validated before professional, regulatory, or litigation use.",
  "No guaranteed internship, placement, income, or case outcome is offered.",
  "Platform availability may depend on third-party infrastructure and tools.",
];

export default function DisclaimerPage() {
  return (
    <section className="card">
      <h1>Disclaimer</h1>
      <p className="small">Last updated: March 26, 2026.</p>
      <ol>{points.map((item) => <li key={item}>{item}</li>)}</ol>
      <p className="small">For formal clarification requests, email legal@lexmindacademy.com.</p>
    </section>
  );
}

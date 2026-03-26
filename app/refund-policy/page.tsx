const sections = [
  ["1. Refund Framework", "Courses are sold on a one-time payment basis. Refund requests are reviewed under this policy."],
  ["2. Eligible Cases", "Refunds may be considered for duplicate payments, technical payment errors, or specific statutory obligations."],
  ["3. Non-Eligible Cases", "Refunds are generally not provided after course access activation, attendance of live classes, or material downloads."],
  ["4. Request Timeline", "Eligible refund requests should be raised within 7 calendar days of payment with supporting evidence."],
  ["5. Review and Processing", "Approved refunds are processed through the original payment channel within reasonable processing timelines."],
  ["6. Communication", "Refund status updates are sent via registered contact details."],
  ["7. Contact", "Submit refund requests to billing@lexmindacademy.com with transaction ID and account details."],
];

export default function RefundPage() {
  return (
    <section className="card">
      <h1>Refund Policy</h1>
      <p className="small">Last updated: March 26, 2026.</p>
      {sections.map(([title, body]) => <article key={title}><h3>{title}</h3><p className="small">{body}</p></article>)}
    </section>
  );
}

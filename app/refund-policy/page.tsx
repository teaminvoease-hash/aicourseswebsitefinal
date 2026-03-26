const sections = [
  "General refund stance", "Refund-eligible cases", "Refund request timeline", "Non-refundable situations",
  "Duplicate payment handling", "Cancellation rules", "Admin review and decision"
];

export default function RefundPage() {
  return (
    <section className="card">
      <h1>Refund Policy</h1>
      <p>All courses follow a one-time payment model. Refunds are limited and processed per policy review criteria.</p>
      {sections.map((item) => (
        <article key={item}><h3>{item}</h3><p className="small">Please submit refund requests through official support channels with payment proof and account details.</p></article>
      ))}
    </section>
  );
}

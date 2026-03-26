import { faqs } from "@/lib/content";

export default function FaqPage() {
  return (
    <section className="card">
      <h1>Frequently Asked Questions</h1>
      <p className="small">Admissions, classes, certificates, payment, and platform policies.</p>
      {faqs.map((item, index) => (
        <article key={item.q} style={{ marginBottom: 14 }}>
          <h3 style={{ marginBottom: 6 }}>{index + 1}. {item.q}</h3>
          <p className="small" style={{ marginTop: 0 }}>{item.a}</p>
        </article>
      ))}
    </section>
  );
}

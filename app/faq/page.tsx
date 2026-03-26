import { faqs } from "@/lib/content";

export default function FaqPage() {
  return (
    <section className="card">
      <h1>Frequently Asked Questions</h1>
      {faqs.map((item) => (
        <article key={item.q} style={{ marginBottom: 14 }}>
          <h3 style={{ marginBottom: 6 }}>{item.q}</h3>
          <p className="small" style={{ marginTop: 0 }}>{item.a}</p>
        </article>
      ))}
    </section>
  );
}

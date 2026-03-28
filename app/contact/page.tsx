export default function ContactPage() {
  return (
    <section>
      <h1>Contact Admissions & Support</h1>
      <p className="small">
        For enrollment, payment, technical issues, or certificate support, reach out through the channels below.
      </p>
      <div className="grid grid-3" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Email</h3>
          <p>support@ailawacademy.in</p>
          <p className="small">Typical response time: within 24 business hours.</p>
        </article>
        <article className="card">
          <h3>Phone / WhatsApp</h3>
          <p>+91-90000-00000</p>
          <p className="small">Mon–Sat, 10:00 AM to 7:00 PM (IST).</p>
        </article>
        <article className="card">
          <h3>Operating Region</h3>
          <p>India (online-first training platform)</p>
          <p className="small">Classes are conducted live online each week.</p>
        </article>
      </div>
    </section>
  );
}

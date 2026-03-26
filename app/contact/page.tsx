export default function ContactPage() {
  return (
    <section className="grid grid-2">
      <article className="card">
        <h1>Contact</h1>
        <p><strong>Email:</strong> support@lexmindacademy.com</p>
        <p><strong>Phone:</strong> +1 (555) 010-2244</p>
        <p><strong>Office:</strong> Placeholder address, Legal-Tech District, City, State</p>
        <p className="small">Support hours: Monday to Saturday, 9:00 AM to 6:00 PM.</p>
      </article>
      <form className="card">
        <h2>Student Query Form</h2>
        <label>Full Name<input required /></label>
        <label>Email<input type="email" required /></label>
        <label>Mobile<input required /></label>
        <label>Subject<input required /></label>
        <label>Message<textarea rows={4} required /></label>
        <button className="btn" type="submit">Submit Query</button>
      </form>
    </section>
  );
}

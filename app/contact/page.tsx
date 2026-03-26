export default function ContactPage() {
  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>Contact Admissions & Student Support</h1>
        <p className="small">For enrollment guidance, batch details, payment support, or dashboard queries, contact us through official channels below.</p>
      </article>
      <section className="grid grid-3">
        <article className="card"><h3>Admissions Support</h3><p>Email: admissions@lexmindacademy.com</p><p>Phone: +1 (555) 010-2244</p><p className="small">Response timeline: within 24 business hours.</p></article>
        <article className="card"><h3>Student Support</h3><p>Email: support@lexmindacademy.com</p><p>WhatsApp: +1 (555) 010-2244</p><p className="small">For schedule, assignments, certificates, and platform access.</p></article>
        <article className="card"><h3>Office</h3><p>LexMind AI Law Academy</p><p>Legal-Tech Business District (Placeholder)</p><p>City, State, ZIP</p></article>
      </section>
      <section className="grid grid-2">
        <form className="card grid" style={{ gap: 10 }}>
          <h2>Inquiry Form</h2>
          <label>Full Name<input required /></label>
          <label>Email<input type="email" required /></label>
          <label>Mobile<input required /></label>
          <label>Inquiry Type<select><option>Course Counseling</option><option>Brochure Request</option><option>Syllabus by Email</option><option>Callback Request</option><option>Student Support</option></select></label>
          <label>Message<textarea rows={4} required /></label>
          <button className="btn" type="button">Submit Inquiry</button>
        </form>
        <article className="card">
          <h2>Counselor Callback</h2>
          <p className="small">Prefer a direct call? Submit callback details and our admissions advisor will contact you.</p>
          <label>Preferred Time Slot<input placeholder="e.g., 6:00 PM - 7:00 PM" /></label>
          <label>Program Interest<input placeholder="Course name or role" /></label>
          <button className="btn" type="button" style={{ marginTop: 10 }}>Request Callback</button>
          <h3 style={{ marginTop: 18 }}>Support FAQ</h3>
          <p><strong>How soon do you reply?</strong> Usually within 24 hours on business days.</p>
          <p><strong>Can I book a demo/orientation class?</strong> Yes, request via inquiry form.</p>
        </article>
      </section>
    </section>
  );
}

const sections = [
  "Personal data collected", "Registration details", "Payment-related information", "How data is used",
  "Storage and protection", "Cookies and sessions", "Third-party service providers", "Communication consent",
  "User rights", "Data retention", "Privacy contact"
];

export default function PrivacyPage() {
  return (
    <section className="card">
      <h1>Privacy Policy</h1>
      <p>We collect only necessary data for account creation, enrollment, course delivery, payments, and certificate issuance.</p>
      {sections.map((item) => (
        <article key={item}><h3>{item}</h3><p className="small">We follow data minimization, security-first storage, and role-based access handling principles.</p></article>
      ))}
    </section>
  );
}

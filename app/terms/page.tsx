const sections = [
  "Acceptance of terms", "Nature of services", "Educational purpose only", "User eligibility", "Registration obligations",
  "Account security", "Payment terms", "Course access policy", "Intellectual property", "Prohibited use", "Certificate policy",
  "Platform rights", "Suspension / termination", "Third-party tools and integrations", "No job guarantee", "No legal advice",
  "Limitation of liability", "Indemnity", "Governing law and jurisdiction", "Contact details"
];

export default function TermsPage() {
  return (
    <section className="card">
      <h1>Terms and Conditions</h1>
      <p>By using this platform, you agree to these terms governing account use, payments, course access, and platform conduct.</p>
      {sections.map((item) => (
        <article key={item}><h3>{item}</h3><p className="small">This section applies to all users and helps maintain secure, educational, and compliant platform usage.</p></article>
      ))}
    </section>
  );
}

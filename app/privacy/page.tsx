const sections = [
  ["1. Data We Collect", "We collect registration details, profile information, payment references, and course activity data required for platform operations."],
  ["2. Purpose of Processing", "Data is used for admissions, authentication, course delivery, certificate issuance, compliance records, and support communication."],
  ["3. Payment Data", "Payment processing is handled through authorized gateway providers. Sensitive payment credentials are not stored on this platform."],
  ["4. Cookies and Sessions", "Session cookies and security tokens are used to maintain authenticated access and role-based dashboard functionality."],
  ["5. Communication Consent", "By registering, users consent to transactional and informational communication related to admission and course progress."],
  ["6. Data Retention", "Data is retained for operational, support, compliance, and certificate-verification requirements unless law requires otherwise."],
  ["7. User Rights", "Users may request profile correction and non-essential communication preferences through official support channels."],
  ["8. Security Controls", "We apply reasonable technical and organizational controls to safeguard personal data from unauthorized access."],
  ["9. Third-Party Services", "Some integrations may involve third-party tools; users should review those providers' terms where relevant."],
  ["10. Contact", "For privacy requests, email privacy@lexmindacademy.com."],
];

export default function PrivacyPage() {
  return (
    <section className="card">
      <h1>Privacy Policy</h1>
      <p className="small">Last updated: March 26, 2026.</p>
      {sections.map(([title, body]) => (
        <article key={title}><h3>{title}</h3><p className="small">{body}</p></article>
      ))}
    </section>
  );
}

const sections = [
  ["1. Acceptance of Terms", "By accessing this platform, you agree to these terms governing enrollment, course access, and user conduct."],
  ["2. Educational Purpose", "All programs are educational. Content is intended for legal-tech skill development and does not constitute legal advice."],
  ["3. Eligibility and Accounts", "Users must provide accurate registration details and maintain account security. Sharing credentials is prohibited."],
  ["4. Payment Rules", "Course fees are one-time per selected program unless stated otherwise. Applicable taxes or gateway fees may apply where required."],
  ["5. Access Policy", "Course access is provided after successful payment verification. Access duration and material availability follow course plan disclosures."],
  ["6. Acceptable Use", "Users shall not misuse platform content, recordings, credentials, or assessment systems."],
  ["7. Intellectual Property", "All course materials, templates, videos, and platform content remain academy intellectual property unless explicitly stated."],
  ["8. Certificates", "Certificates are granted after completion criteria are met. Certificates confirm completion only and are not legal licenses or statutory qualifications."],
  ["9. Limitations of Liability", "The academy is not liable for indirect losses, career outcomes, or third-party tool disruptions beyond reasonable control."],
  ["10. Communication Consent", "By registering, users consent to receiving admissions, class, and support communication via email, SMS, and WhatsApp."],
  ["11. Governing Law & Jurisdiction", "These terms are governed by applicable local law and disputes are subject to jurisdiction as notified in official contact records."],
  ["12. Contact", "For policy or legal queries, email legal@lexmindacademy.com."],
];

export default function TermsPage() {
  return (
    <section className="card">
      <h1>Terms and Conditions</h1>
      <p className="small">Last updated: March 26, 2026.</p>
      {sections.map(([title, body]) => (
        <article key={title}>
          <h3>{title}</h3>
          <p className="small">{body}</p>
        </article>
      ))}
    </section>
  );
}

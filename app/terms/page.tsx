const sections = [
  {
    title: "1) Enrollment & Eligibility",
    body: "Students must provide accurate details during registration. Any false profile data may result in suspension of account access. The platform is intended for learners, legal professionals, and related users who are legally capable of entering into a service agreement."
  },
  {
    title: "2) Course Access & Usage",
    body: "Course materials, class recordings, notes, and downloadable resources are for enrolled learners only. Sharing login credentials, distributing paid content, or screen-recording protected lessons for public sharing is strictly prohibited."
  },
  {
    title: "3) Fees, Payments, and Refunds",
    body: "All fees must be paid through authorized payment flows. Access to paid modules may depend on successful fee status. Refunds, if applicable, follow the published refund policy page and may include processing timelines and eligibility checks."
  },
  {
    title: "4) Responsible AI & Professional Conduct",
    body: "Learners must use course material responsibly and avoid misuse of AI tools for unlawful or unethical activity. Class interactions must remain respectful. Harassment, abuse, impersonation, or policy violations can lead to immediate account restriction."
  },
  {
    title: "5) Certificates & Completion",
    body: "Certificate issuance depends on fulfillment of completion criteria such as attendance, assignments, and progress milestones. The academy may verify records before issuing any completion certificate or verification identifier."
  },
  {
    title: "6) Platform Policies and Updates",
    body: "We may update course plans, schedules, faculty, terms, or platform features to improve service quality and compliance. Continued use of the website after updates means acceptance of revised terms."
  }
];

export default function TermsPage() {
  return (
    <section>
      <h1>Terms & Conditions</h1>
      <p className="small">
        Please read these terms carefully before enrolling in any AI law training course on this platform.
      </p>
      <div className="grid" style={{ marginTop: 16 }}>
        {sections.map((section) => (
          <article className="card" key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

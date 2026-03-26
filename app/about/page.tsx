import { platformName } from "@/lib/content";

export default function AboutPage() {
  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>About {platformName}</h1>
        <p>We are a legal-tech academy focused on practical AI upskilling for legal education and modern legal operations. Our programs prioritize quality, accountability, and responsible use in legal workflows.</p>
      </article>
      <section className="grid grid-2">
        <article className="card">
          <h2>Founder & Faculty (Placeholder)</h2>
          <p className="small">Institution-style trainer profile section for legal-tech faculty credentials, legal practice background, and teaching outcomes.</p>
        </article>
        <article className="card">
          <h2>Career Outcome Focus</h2>
          <p className="small">Programs are mapped to internship quality, associate productivity, legal research discipline, and compliance documentation readiness.</p>
        </article>
      </section>
    </section>
  );
}

import { platformName } from "@/lib/content";

export default function AboutPage() {
  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>About {platformName}</h1>
        <p>
          We are a legal-tech education platform focused on practical AI capability building for the legal profession.
          Our training supports students and professionals with structured learning, ethical AI use, and workplace-ready workflows.
        </p>
      </article>
      <article className="card">
        <h2>Mission and Vision</h2>
        <p><strong>Mission:</strong> Enable legal professionals to apply AI responsibly in research, drafting, compliance, and case preparation.</p>
        <p><strong>Vision:</strong> Build a future-ready legal workforce that combines legal reasoning with technology fluency.</p>
      </article>
      <article className="card">
        <h2>Why AI matters for legal professionals</h2>
        <p>
          AI is changing how legal teams work: from faster research and documentation to improved drafting consistency and productivity.
          Lawyers who understand AI workflows are better positioned for modern law-firm and in-house expectations.
        </p>
      </article>
      <article className="card">
        <h2>Future of legal practice with AI</h2>
        <p>
          Legal outcomes still require human judgment. AI can assist in speed and structure, but legal accountability remains with professionals.
          Our curriculum teaches this balance clearly: technology leverage with legal responsibility.
        </p>
      </article>
    </section>
  );
}

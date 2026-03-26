export type CourseCatalogItem = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  duration: string;
  mode: string;
  certificate: string;
  fee: string;
  level: string;
  outcomes: string[];
  modules: string[];
  instructor: string;
  eligibility: string;
};

export const platformName = "LexMind AI Law Academy";

export const catalogCourses: CourseCatalogItem[] = [
  {
    slug: "ai-tools-legal-research",
    title: "AI Tools for Legal Research",
    shortDescription: "Use modern AI systems to accelerate case-law discovery, citation checks, and statute mapping.",
    description:
      "A practical legal-research program focused on prompt strategies, source validation, jurisdictional filtering, and responsible use of AI while researching legal issues.",
    duration: "6 Weeks",
    mode: "Online (Live + Recorded)",
    certificate: "Yes — completion certificate with verification ID",
    fee: "₹7,500 (one-time)",
    level: "Beginner to Intermediate",
    outcomes: [
      "Reduce legal research turnaround time",
      "Improve precedent discovery and comparative analysis",
      "Build repeatable AI-assisted legal research workflows"
    ],
    modules: [
      "Research Prompt Frameworks for Lawyers",
      "Case Law and Statute Discovery with AI",
      "Source Validation and Hallucination Control",
      "Research Memos and Citation Workflows"
    ],
    instructor: "Adv. Rhea Mehta, Legal Research & AI Trainer",
    eligibility: "Law students, associates, legal researchers, compliance teams"
  },
  {
    slug: "ai-contract-drafting",
    title: "AI in Contract Drafting",
    shortDescription: "Draft and review agreements faster while preserving legal precision and risk-awareness.",
    description:
      "Learn clause libraries, AI-assisted negotiation redlines, risk extraction, and legal drafting quality controls for commercial contracts.",
    duration: "8 Weeks",
    mode: "Online (Live + Workshop Labs)",
    certificate: "Yes — completion certificate with verification ID",
    fee: "₹9,000 (one-time)",
    level: "Intermediate",
    outcomes: [
      "Draft contracts and notices with better consistency",
      "Build clause risk-check routines",
      "Use AI for first-draft acceleration with human review"
    ],
    modules: [
      "Contract Lifecycle and AI Use Cases",
      "Drafting Prompts and Clause Templates",
      "Risk Flagging and Issue Spotting",
      "Playbook-Based Redlining and Final Review"
    ],
    instructor: "Aarav Sinha, Contracts Counsel & Legal-Tech Consultant",
    eligibility: "Law students, junior advocates, associates, in-house legal interns"
  },
  {
    slug: "ai-case-briefing-legal-writing",
    title: "AI for Case Briefing and Legal Writing",
    shortDescription: "Produce stronger briefs, structured arguments, and precise legal writing with AI assistance.",
    description:
      "Master AI-supported briefing, argument tree creation, drafting style controls, and quality review checklists for legal writing.",
    duration: "5 Weeks",
    mode: "Online",
    certificate: "Yes — completion certificate with verification ID",
    fee: "₹6,800 (one-time)",
    level: "Beginner",
    outcomes: [
      "Prepare case briefs with clear issue framing",
      "Improve legal writing clarity and structure",
      "Use AI ethically while preserving legal reasoning"
    ],
    modules: [
      "Brief Anatomy and AI Workflow",
      "Issue-Rule-Analysis-Conclusion Automation",
      "Style, Tone, and Citation Controls",
      "Review Rubrics for Legal Writing"
    ],
    instructor: "Nisha Rao, Legal Writing Specialist",
    eligibility: "LLB/LLM students, judicial aspirants, legal researchers"
  },
  {
    slug: "ai-compliance-documentation",
    title: "AI for Compliance and Documentation",
    shortDescription: "Automate policy drafting and compliance documentation with defensible workflows.",
    description:
      "Create AI-driven compliance processes for policy documentation, control mapping, periodic review, and reporting support.",
    duration: "6 Weeks",
    mode: "Online",
    certificate: "Yes — completion certificate with verification ID",
    fee: "₹8,200 (one-time)",
    level: "Intermediate",
    outcomes: [
      "Speed up compliance documentation",
      "Improve consistency in policy records",
      "Create internal review-ready legal documentation"
    ],
    modules: [
      "Compliance Use Cases and Risk Boundaries",
      "Policy Drafting Assistants",
      "Control Testing Documentation",
      "Audit-Ready Evidence Management"
    ],
    instructor: "Sanjana Kulkarni, Compliance Lead",
    eligibility: "Compliance professionals, legal associates, governance teams"
  },
  {
    slug: "ai-productivity-law-students-associates",
    title: "AI Productivity for Law Students and Associates",
    shortDescription: "Build high-performance daily workflows for research, drafting, and case preparation.",
    description:
      "A practical productivity bootcamp for legal professionals to streamline repetitive work, organize legal knowledge, and deliver faster outputs.",
    duration: "4 Weeks",
    mode: "Online",
    certificate: "Yes — completion certificate with verification ID",
    fee: "₹5,900 (one-time)",
    level: "Beginner",
    outcomes: [
      "Improve productivity in internships and practice",
      "Create repeatable legal task automations",
      "Reduce turnaround time for routine drafting"
    ],
    modules: [
      "Legal Workflow Automation Basics",
      "Document Summaries and Task Queues",
      "Prompt Libraries for Daily Legal Work",
      "Responsible AI Usage Checklist"
    ],
    instructor: "Arjun Desai, Legal Ops Specialist",
    eligibility: "Students, associates, junior advocates, legal interns"
  },
  {
    slug: "prompt-engineering-lawyers",
    title: "Prompt Engineering for Lawyers",
    shortDescription: "Design precise prompts for legal drafting, review, research, and compliance tasks.",
    description:
      "Advanced prompt design for legal contexts covering structure, constraints, source requirements, and auditability.",
    duration: "3 Weeks",
    mode: "Online",
    certificate: "Yes — completion certificate with verification ID",
    fee: "₹4,800 (one-time)",
    level: "All Levels",
    outcomes: [
      "Craft high-quality legal prompts",
      "Control AI outputs with constraints",
      "Create reusable prompt playbooks for teams"
    ],
    modules: [
      "Prompt Architecture for Legal Use",
      "Instruction Layering and Output Controls",
      "Review Loops and Quality Assurance",
      "Prompt Playbook Design"
    ],
    instructor: "Dr. Kabir Anand, Legal-Tech Faculty",
    eligibility: "All law learners and legal professionals"
  }
];

export const faqs = [
  {
    q: "Are these courses live or recorded?",
    a: "Each program includes scheduled live classes, recordings for revision, and downloadable reference materials."
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. Certificates are issued after successful completion criteria are met, and every certificate includes a unique verification ID."
  },
  {
    q: "Is this course suitable for law students?",
    a: "Yes. The curriculum is designed for law students, associates, junior advocates, and legal researchers."
  },
  {
    q: "Does this platform provide legal advice?",
    a: "No. All courses are educational and skill-development oriented, and do not constitute legal advice."
  },
  {
    q: "Is there a refund available?",
    a: "Refund handling follows the published refund policy, including limited cases such as duplicate payment situations."
  },
  {
    q: "How do I access classes after payment?",
    a: "After successful payment and enrollment, course access is unlocked in your dashboard with class schedules and materials."
  },
  {
    q: "How is certificate issuance handled?",
    a: "Admins issue certificates after completion verification. Students can then view and download them from the certificate module."
  }
];

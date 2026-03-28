import Link from "next/link";

const links = [
  ["Platform", "/about"],
  ["Programs", "/courses"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
  ["Verify Certificate", "/verify-certificate"]
] as const;

export default function SiteHeader() {
  return (
    <header className="header">
      <div className="announcement">
        <div className="container announcement-inner">
          <span>2026 Cohort Now Open • AI Law Career Accelerator</span>
          <span className="small">Trusted learning workflows for legal drafting, research, and compliance teams.</span>
        </div>
      </div>
      <div className="container nav">
        <Link href="/" className="brand">
          <span className="brand-mark">⚖</span>
          <span>LexMind AI Law Academy</span>
        </Link>

        <nav className="nav-links">
          {links.map(([label, href]) => (
            <Link key={href} className="nav-link" href={href}>
              {label}
            </Link>
          ))}
          <Link href="/login?role=student" className="btn btn-soft">Student Login</Link>
          <Link href="/register" className="btn">Apply Now</Link>
        </nav>
      </div>
    </header>
  );
}

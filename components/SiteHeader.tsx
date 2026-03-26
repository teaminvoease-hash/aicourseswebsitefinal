import Link from "next/link";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Courses", "/courses"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
  ["Verify Certificate", "/verify-certificate"]
] as const;

export default function SiteHeader() {
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="brand">
          AI Law Academy India
        </Link>
        <nav className="nav-links">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <Link href="/login" className="badge">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

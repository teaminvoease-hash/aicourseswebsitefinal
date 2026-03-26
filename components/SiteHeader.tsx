import Link from "next/link";
import { platformName } from "@/lib/content";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Courses", "/courses"],
  ["How to Enroll", "/how-to-enroll"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
  ["Verify Certificate", "/verify-certificate"],
] as const;

export default function SiteHeader() {
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="brand">
          {platformName}
        </Link>
        <nav className="nav-links">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <Link href="/student-login" className="btn btn-outline">
            Student Login
          </Link>
          <Link href="/register" className="btn">
            Enroll Now
          </Link>
        </nav>
      </div>
    </header>
  );
}

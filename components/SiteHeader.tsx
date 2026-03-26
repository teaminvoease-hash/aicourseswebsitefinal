import Link from "next/link";
import { platformName } from "@/lib/content";

const links = [
  ["Home", "/"],
  ["Courses", "/courses"],
  ["How to Enroll", "/how-to-enroll"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
  ["Verify Certificate", "/verify-certificate"],
] as const;

export default function SiteHeader() {
  return (
    <header className="header">
      <div className="urgency-strip">
        <div className="container urgency-wrap">
          <span>Next cohort starts <strong>April 15, 2026</strong> • Limited seats across core legal-tech tracks.</span>
          <div className="inline-list">
            <Link href="/contact" className="pill">Talk to Counselor</Link>
            <a href="https://wa.me/15550102244" className="pill">WhatsApp Inquiry</a>
          </div>
        </div>
      </div>
      <div className="container nav">
        <Link href="/" className="brand">{platformName}</Link>
        <nav className="nav-links">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="nav-cta">
          <Link href="/student-login" className="btn btn-outline">Student Login</Link>
          <Link href="/register" className="btn">Enroll Now</Link>
        </div>
      </div>
    </header>
  );
}

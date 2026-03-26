import Link from "next/link";
import { platformName } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-wrap">
        <div>
          <p className="brand">{platformName}</p>
          <p className="small">Institution-style AI law education for practical legal work, documentation, compliance, and responsible AI adoption.</p>
          <p className="small"><strong>Admissions:</strong> admissions@lexmindacademy.com • +1 (555) 010-2244</p>
        </div>
        <div>
          <h4>Academy</h4>
          <div className="grid" style={{ gap: 6 }}>
            <Link href="/about">About</Link>
            <Link href="/courses">All Courses</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/how-to-enroll">Enrollment Process</Link>
          </div>
        </div>
        <div>
          <h4>Policies</h4>
          <div className="grid" style={{ gap: 6 }}>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/admin-login">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

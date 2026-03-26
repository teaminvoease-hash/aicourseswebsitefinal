import Link from "next/link";
import { platformName } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-wrap">
        <div>
          <p className="brand">{platformName}</p>
          <p className="small">AI legal education for future-ready legal professionals.</p>
        </div>
        <div className="nav-links">
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/admin-login">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}

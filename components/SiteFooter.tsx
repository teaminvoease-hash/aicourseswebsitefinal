import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>LexMind AI Law Academy</h3>
          <p>
            A legal-tech education platform focused on practical AI execution for law students, advocates,
            and in-house legal operations teams.
          </p>
          <p className="small">© {new Date().getFullYear()} LexMind AI Law Academy. All rights reserved.</p>
        </div>
        <div>
          <div className="footer-links">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/login?role=admin">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container" style={{ padding: "1.2rem 0" }}>
        <p className="small">© {new Date().getFullYear()} AI Law Academy India</p>
        <div className="nav-links">
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}

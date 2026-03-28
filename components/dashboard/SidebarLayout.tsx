import Link from "next/link";
import type { Route } from "next";

type NavItem = { href: Route; label: string };

export default function SidebarLayout({
  title,
  subtitle,
  nav,
  activeHref,
  children
}: {
  title: string;
  subtitle: string;
  nav: NavItem[];
  activeHref: string;
  children: React.ReactNode;
}) {
  return (
    <section className="shell">
      <aside className="sidebar">
        <span className="badge badge-info">Workspace</span>
        <h3 style={{ marginTop: ".55rem" }}>{title}</h3>
        <p className="small" style={{ marginTop: 0 }}>{subtitle}</p>
        <nav>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={activeHref === item.href ? "active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </section>
  );
}

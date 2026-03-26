import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { platformName } from "@/lib/content";

export const metadata: Metadata = {
  title: `${platformName} | AI Law Courses`,
  description:
    "Premium AI law courses for law students, legal associates, compliance professionals, and legal-tech learners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="container">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { platformName } from "@/lib/content";

export const metadata: Metadata = {
  title: `${platformName} | AI Law Courses & Legal-Tech Training`,
  description: "Premium AI law courses for law students, associates, and compliance professionals with practical workflows, live classes, and verifiable certificates.",
  keywords: ["AI law courses", "legal tech training", "AI for legal research", "contract drafting AI", "law student AI course"],
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

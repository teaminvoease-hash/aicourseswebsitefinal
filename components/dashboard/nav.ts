import type { Route } from "next";

export const studentNav: Array<{ href: Route; label: string }> = [
  { href: "/student", label: "Dashboard Home" },
  { href: "/student/course", label: "My Courses" },
  { href: "/student/progress", label: "Course Progress" },
  { href: "/student/live-schedule", label: "Live Schedule" },
  { href: "/student/materials", label: "Study Materials" },
  { href: "/student/assignments", label: "Assignments & Quiz" },
  { href: "/student/certificate", label: "Certificate" },
  { href: "/student/payments", label: "Payment History" },
  { href: "/student/profile", label: "Profile" },
  { href: "/student/help", label: "Help & Support" }
];

export const adminNav: Array<{ href: Route; label: string }> = [
  { href: "/admin", label: "Operations Overview" },
  { href: "/admin/students", label: "Students Management" },
  { href: "/admin/courses", label: "Course Management" },
  { href: "/admin/enrollments", label: "Enrollments" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/certificates", label: "Certificates" },
  { href: "/admin/schedules", label: "Schedules" },
  { href: "/admin/materials", label: "Learning Materials" },
  { href: "/admin/assignments", label: "Assignments / Quiz" },
  { href: "/admin/content", label: "Content Management" },
  { href: "/admin/leads", label: "Leads & Inquiries" },
  { href: "/admin/coupons", label: "Coupons & Offers" },
  { href: "/admin/settings", label: "Settings" }
];

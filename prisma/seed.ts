import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@ailawacademy.in";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeThisStrongPassword";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: "ADMIN", fullName: "Platform Admin", mobile: "9999999999" },
    create: {
      fullName: "Platform Admin",
      email: adminEmail,
      mobile: "9999999999",
      passwordHash,
      role: "ADMIN"
    }
  });

  const course = await prisma.course.upsert({
    where: { slug: "ai-law-practice-india" },
    update: {},
    create: {
      slug: "ai-law-practice-india",
      title: "AI for Legal Practice in India",
      shortDescription: "Use AI tools ethically and productively in Indian legal workflows.",
      description:
        "Comprehensive practical course for Indian law students and legal professionals. Includes research workflows, drafting augmentation, compliance, and ethics.",
      feeInr: 4000,
      discountedFeeInr: 3000,
      durationWeeks: 12
    }
  });

  const lessons = [
    "Intro to AI in Indian Legal Ecosystem",
    "AI-Assisted Legal Research",
    "Drafting Petitions and Contracts with AI",
    "Data Privacy, DPDP Act and AI",
    "Courtroom Readiness and Verification Workflows"
  ];

  for (let i = 0; i < lessons.length; i += 1) {
    await prisma.lesson.upsert({
      where: { courseId_orderNo: { courseId: course.id, orderNo: i + 1 } },
      update: { title: lessons[i] },
      create: {
        courseId: course.id,
        orderNo: i + 1,
        title: lessons[i],
        content: `Module ${i + 1} detailed content.`
      }
    });
  }

  await prisma.coupon.upsert({
    where: { code: "WELCOME500" },
    update: {},
    create: {
      code: "WELCOME500",
      discountInr: 500,
      isActive: true
    }
  });



  await prisma.appSetting.upsert({
    where: { key: "smtp_host" },
    update: {},
    create: {
      key: "smtp_host",
      value: "smtp.example.com"
    }
  });

  await prisma.siteContent.upsert({
    where: { pageKey: "home_hero" },
    update: {},
    create: {
      pageKey: "home_hero",
      title: "India's Practical AI Law Course",
      body: "Master AI workflows for legal education and professional practice."
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

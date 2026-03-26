import { z } from "zod";

const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(10).max(15),
  password: z.string().regex(strongPassword, "Password must include upper, lower, number and special character"),
  lawCollege: z.string().min(2),
  yearSemester: z.string().min(1),
  cityState: z.string().min(2),
  profession: z.string().min(2),
  profilePhotoUrl: z.string().url().optional().or(z.literal(""))
});

export const loginSchema = z.object({
  emailOrMobile: z.string().min(4),
  password: z.string().min(8)
});

import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(10).max(15),
  password: z.string().min(8),
  lawCollege: z.string().min(2),
  yearSemester: z.string().min(1),
  cityState: z.string().min(2),
  profession: z.string().min(2),
  profilePhotoUrl: z.string().url().optional().or(z.literal(""))
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

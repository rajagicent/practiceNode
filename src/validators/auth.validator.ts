import { z } from "zod";

export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2),
role: z.enum(['ADMIN', 'SUPER_ADMIN', 'USER'])
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

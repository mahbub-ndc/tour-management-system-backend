import { z } from "zod";

/**
 * Create User Validation
 */
export const createUserZodSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),

    phone: z.string().optional(),

    address: z.string().optional(),
  }),
});

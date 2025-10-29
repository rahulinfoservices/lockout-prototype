import z from "zod";

// Validation schema
export const loginSchema = z.object({
  email: z.union([
    z.literal("").refine(() => false, { message: "Please provide an email" }),
    z.email("Invalid email address"),
  ]),
  password: z
    .string()
    .min(1, "Please provide your password")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

import z from "zod";

// Validation schema
export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.union([
      z.email("Invalid email address"),
      z.literal("").refine(() => false, { message: "Email is required" }),
    ]),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

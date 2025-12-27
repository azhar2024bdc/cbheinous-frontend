import { z } from "zod";

const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character"
  );

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: strongPasswordSchema,
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true)
    .optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: strongPasswordSchema,
    confirmPassword: z.string().min(8, "Please confirm your password"),
    location: z.string(),
    phone: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const verificationSchema = z.object({
  code: z
    .array(z.string())
    .length(6)
    .refine(
      (code) => code.every((digit) => digit.length === 1 && /^\d$/.test(digit)),
      {
        message: "Please enter a valid 6-digit code",
      }
    ),
});

export const resetPasswordSchema = z
  .object({
    newPassword: strongPasswordSchema,
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const professionalRegistrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: strongPasswordSchema,
    confirmPassword: z.string(),
    availability: z.array(z.string()).min(1, "Please select at least one day"),
    location: z.string().min(2, "Location must be at least 2 characters"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    bio: z.string().min(2, "Bio must be at least 2 characters"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and privacy policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const checkPasswordStrength = (password: string) => {
  const checks = {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password),
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;

  return {
    ...checks,
    strength:
      passedChecks === 5 ? "strong" : passedChecks >= 3 ? "medium" : "weak",
    score: passedChecks,
  };
};

export type ProfessionalRegistrationFormData = z.infer<
  typeof professionalRegistrationSchema
>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type VerificationFormData = z.infer<typeof verificationSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type PasswordStrength = ReturnType<typeof checkPasswordStrength>;

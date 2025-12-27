"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  // eslint-disable-next-line no-unused-vars
  onResetPassword?: (data: ResetPasswordFormData) => void;
}

export default function ResetPasswordForm({

  onResetPassword,
}: ResetPasswordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  const access_token = useSelector(
    (state: RootState) => state.auth.access_token
  );

  const onSubmit = async (data: ResetPasswordFormData) => {
    router.push("/super-admin");
    setIsSubmitting(true);
    try {
      const newData = { password: data.newPassword, token: access_token };
      const res = await resetPassword(newData);

      if (res?.data) {
        toast.success(res?.data?.message);
        router.push("/dashboard");
      }
      onResetPassword?.(data);
    } catch (error) {
      console.error("Password reset failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-200 p-8 w-full max-w-md ">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Create your new password
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              {...register("newPassword")}
              type="password"
              id="newPassword"
              placeholder="afiya32553hf"
              className={`w-full px-3 py-3 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                errors.newPassword
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : newPassword && !errors.newPassword
                  ? "border-green-300 focus:ring-green-500 focus:border-green-500"
                  : "border-gray-300 focus:ring-primary focus:border-primary"
              }`}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              placeholder="afiya32553hf"
              className={`w-full px-3 py-3 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                errors.confirmPassword
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : confirmPassword &&
                    !errors.confirmPassword &&
                    newPassword === confirmPassword
                  ? "border-green-300 focus:ring-green-500 focus:border-green-500"
                  : "border-gray-300 focus:ring-primary focus:border-primary"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting || isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium text-sm transition-colors ${
              !isValid || isSubmitting
                ? "bg-primary/50 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            }`}
          >
            {isSubmitting || isLoading
              ? "Resetting Password..."
              : "Reset Password"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full text-center text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
}

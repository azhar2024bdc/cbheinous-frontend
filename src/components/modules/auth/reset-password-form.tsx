"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
  checkPasswordStrength,
} from "@/types/auth";

import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

import { AuthButton } from "@/components/ui/core/MyButton/auth-btn";
import { AuthLayout } from "./auth-layout";
import { FormInput } from "@/components/ui/core/MyForm/me/form-input";

export function ResetPasswordForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const currentPasswordStrength = checkPasswordStrength(newPassword || "");

  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;
  const showMatchIndicator =
    confirmPassword.length >= newPassword.length &&
    confirmPassword.length > 8 &&
    newPassword.length > 8;

  const handleFormSubmit = async (data: ResetPasswordFormData) => {
    try {
      const token = sessionStorage.getItem("token");
      const newData = {
        password: data.newPassword,
        token,
      };
      const res = await resetPassword(newData).unwrap();
      if (res?.success) {
        toast.success(
          res?.message || res?.data?.message || "Password changed."
        );
        router.push("/login");
        sessionStorage.removeItem("token");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Welcome back! Please enter your details."
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <FormInput
            name="newPassword"
            control={control}
            label="New Password"
            type="password"
            placeholder="Enter new password"
            icon="lock"
            // error={errors.newPassword?.message}
            size="middle"
          />

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="!-mt-2 space-y-2">
              <div className="space-y-1 text-xs">
                <div
                  className={
                    currentPasswordStrength.minLength
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {currentPasswordStrength.minLength ? "✓" : "X"} At least 8
                  characters
                </div>
                <div
                  className={
                    currentPasswordStrength.hasUppercase
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {currentPasswordStrength.hasUppercase ? "✓" : "X"} One
                  uppercase letter
                </div>
                <div
                  className={
                    currentPasswordStrength.hasLowercase
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {currentPasswordStrength.hasLowercase ? "✓" : "X"} One
                  lowercase letter
                </div>
                <div
                  className={
                    currentPasswordStrength.hasNumber
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {currentPasswordStrength.hasNumber ? "✓" : "X"} One number
                </div>
                <div
                  className={
                    currentPasswordStrength.hasSpecial
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {currentPasswordStrength.hasSpecial ? "✓" : "X"} One special
                  character
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <FormInput
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            type="password"
            placeholder="Enter new password again"
            icon="lock"
            // error={errors.confirmPassword?.message}
          />

          {/* Password Match Indicator */}
          {showMatchIndicator && (
            <div className="!-mt-2">
              {passwordsMatch ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Passwords match</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Passwords don't match</span>
                </div>
              )}
            </div>
          )}
        </div>

        <AuthButton
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading || !isValid}
          className="mt-6"
        >
          Change Password
        </AuthButton>
      </form>
    </AuthLayout>
  );
}

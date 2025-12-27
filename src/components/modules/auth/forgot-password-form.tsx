"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/types/auth";

import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { AuthButton } from "@/components/ui/core/MyButton/auth-btn";
import { AuthLayout } from "./auth-layout";
import { FormInput } from "@/components/ui/core/MyForm/me/form-input";

export function ForgotPasswordForm() {
  const [forgotPassword, { isLoading: loading }] = useForgotPasswordMutation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const handleFormSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const res = await forgotPassword(data).unwrap();
      if (res?.success) {
        toast.success(
          res?.message ||
            res?.data?.message ||
            "Password reset link sent to your email."
        );
        router.push("/verify-otp");
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("from", "password");
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
      title="Forgot Your Password"
      subtitle="Enter your email address to reset your password"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormInput
          name="email"
          control={control}
          placeholder="Enter your Email"
          type="email"
          icon="email"
          error={errors.email?.message}
        />

        <AuthButton
          htmlType="submit"
          loading={loading}
          disabled={loading || !isValid}
          className="mt-6"
        >
          Continue
        </AuthButton>
      </form>
    </AuthLayout>
  );
}

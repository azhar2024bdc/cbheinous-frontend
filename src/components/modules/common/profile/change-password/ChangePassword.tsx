"use client";

import { AuthButton } from "@/components/modules/auth/auth-btn";
import { FormInput } from "@/components/ui/core/MyForm/me/form-input";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";


import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const resetPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async(data: ResetPasswordFormData) => {
    const newData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    }

    try {
      const res = await changePassword(newData).unwrap()
      if(res?.success){
        toast.success(res?.message || res?.data?.message || "Password changed successfully.")
      }
      reset();
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Something went wrong."
      );
    }

  };
  return (
    <div>
      {/* <Text variant="body" className="mb-6">
        Please enter your new Password below. Make sure it’s strong and secure.
      </Text> */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormInput
          name="oldPassword"
          control={control}
          label="Old Password"
          type="password"
          placeholder="Enter old password"
          icon="lock"
          error={errors.oldPassword?.message}
          size="large"
          height={10}
        />

        <FormInput
          name="newPassword"
          control={control}
          label="New Password"
          type="password"
          placeholder="Enter new password"
          icon="lock"
          error={errors.newPassword?.message}
          size="large"
          height={10}
        />

        <FormInput
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
          placeholder="Enter new password again"
          icon="lock"
          error={errors.confirmPassword?.message}
          size="large"
          height={10}
        />

        <AuthButton htmlType="submit" className="mt-8">
          {
            isLoading
              ? <Loader className=" animate-spin" />
              : "Change Password"
          }
        </AuthButton>
      </form>
    </div>
  );
};

export default ChangePassword;


"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
import MutationLoading from "@/components/ui/core/Loader/MutationLoader";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [loginNow, { isLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isLoadingForgot }] =
    useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const res = await loginNow(data);
      if (res?.data) {
        const decodedToken: any = jwtDecode(res?.data?.data?.accessToken);
        dispatch(
          setUser({
            access_token: res?.data?.data?.accessToken,
            user: {
              id: decodedToken?.id,
              email: decodedToken?.email,
              role: decodedToken?.role,
            },
          })
        );
        Cookie.set("accessToken", res?.data?.data?.accessToken);
        toast.success(res?.data?.message);
        if (res?.data?.data?.role === "ADMIN") {
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
     router.push("/forgot-password");
    try {
      const forgotData = {
        email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      };
      const res = await forgotPassword(forgotData);
      if (res?.data) {
        toast.success(res?.data?.message);
        router.push("/auth/forgot-password");
        router.refresh();
      }
    } catch (error) {
      const errors = error as any;
      toast.error(errors?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-primary-bg">
      <div className="bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-200 p-8 w-full max-w-md ">
        <h1 className="text-xl font-medium text-gray-900 mb-6 text-center">
          Login Admin Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@gmail.com"
              {...register("email")}
              className={`w-full px-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="ghy+3456jhf"
              {...register("password")}
              className={`w-full px-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-right">
            <button
              onClick={handleForgotPassword}
              disabled={isSubmitting || isLoading || isLoadingForgot}
              type="button"
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              {isLoadingForgot ? (
                <MutationLoading text="Processing..." />
              ) : (
                "Forgot Password?"
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-primary hover:bg-primary/80 text-white font-medium py-2.5 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting || isLoading ? (
              <MutationLoading text="Processing..." />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                watchedEmail && !errors.email ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span>Email validation</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div
              className={`w-2 h-2 rounded-full ${
                watchedPassword && !errors.password
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            />
            <span>Password validation (min 6 chars)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

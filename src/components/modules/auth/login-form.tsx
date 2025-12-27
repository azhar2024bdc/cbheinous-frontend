"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import Cookie from "js-cookie";

import React from "react";
import { AuthLayout } from "./auth-layout";

import {
  checkPasswordStrength,
  LoginFormData,
  loginSchema,
} from "@/types/auth";
import MyModal from "@/components/ui/core/Modals/MyModal";
import { FormInput } from "@/components/ui/core/MyForm/me/form-input";
import { AuthButton } from "@/components/ui/core/MyButton/auth-btn";
import { FormCheckbox } from "@/components/ui/core/MyForm/me/form-checkbox";

const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const [email, setEmail] = React.useState("");

  const isAdmin = email === adminEmail;

  const currentSchema = isAdmin ? adminLoginSchema : loginSchema;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(currentSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const watchedValues = watch();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = React.useState(false);

  const router = useRouter();
  const password = watch("password");
  const watchedEmail = watch("email");

  React.useEffect(() => {
    setEmail(watchedEmail);
  }, [watchedEmail]);

  const handleFormSubmit = async (data: LoginFormData) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login(user).unwrap();
      console.log(res);
      if (res?.success) {
        const accessToken = res?.data?.accessToken;
        const decodedToken: any = jwtDecode(accessToken);
        dispatch(
          setUser({
            access_token: accessToken,
            user: {
              id: decodedToken?.id,
              email: decodedToken?.email,
              role: decodedToken?.role,
              name: decodedToken?.name,
              image: decodedToken?.image,
            },
          })
        );
        Cookie.set("accessToken", accessToken);
        toast.success(res?.message || "Login successful!");
        if (res?.data?.role === "ADMIN") {
          window.location.href = "/dashboard/super-admin";
        } else if (res?.data?.role === "ENGINEER") {
          window.location.href = "/dashboard/engineer";
        } else if (res?.data?.role === "USER") {
          window.location.href = "/";
        }
      }
      if (res?.err?.statusCode === 203 || res?.err?.data?.statusCode === 203) {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Login failed. Please try again."
      );
      if (
        error?.data?.err?.statusCode === 406 ||
        error?.err?.statusCode === 406 ||
        error?.status === 406
      ) {
        setIsOpen(true);
      }
      if (
        error?.data?.err?.statusCode === 404 ||
        error?.err?.statusCode === 404 ||
        error?.status === 404
      ) {
        setIsDocumentOpen(true);
      }
    }
  };

  const currentPasswordStrength = checkPasswordStrength(password || "");

  const handleGoogleSignIn = async () => {};

  return (
    <AuthLayout
      title="Welcome Back 👋🏻"
      subtitle="Please enter the sign in information."
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormInput
          name="email"
          control={control}
          label="Email"
          type="email"
          placeholder="Enter your Email"
          icon="email"
          error={errors.email?.message}
        />

        <div className="space-y-2">
          <FormInput
            name="password"
            control={control}
            label="Password"
            type="password"
            placeholder="Enter your Password"
            icon="lock"
            error={errors.password?.message}
          />

          {!isAdmin && password && (
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

          <div className="text-right">
            <div className="flex  items-center justify-between space-x-2">
              <div className="flex items-center gap-x-2">
                <FormCheckbox
                  name="agreeToTerms"
                  control={control}
                  checked={watchedValues.agreeToTerms}
                  onChange={(e) => setValue("agreeToTerms", e.target.checked)}
                  className=""
                />
                <p>Remember me</p>
              </div>
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-sm text-primary hover:text-gray-800 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>

        <AuthButton
          htmlType="submit"
          className="mt-6"
          disabled={isLoading || !isValid}
        >
          {isLoading ? <Loader className="animate-spin" /> : "Login"}
        </AuthButton>
        {/*  */}

        <div className="mb-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or sign in with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          <span className="text-sm font-medium">Google</span>
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                // dispatch(clearRole());
                router.push("/select-role");
              }}
              className="text-primary hover:underline font-medium"
            >
              Sign Up
            </button>
          </span>
        </div>
      </form>
      <MyModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
          {/* Success Icon Animation */}
          <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-primary/30">
            <svg
              className="w-8 h-8 text-primary animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div className="absolute inset-0 rounded-full ring-2 ring-primary/40 selection:animate-ping"></div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900">
            Your request has been sent 🎉
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 max-w-xs">
            Please wait for approval from the admin. You'll be notified once
            it's approved.
          </p>

          {/* Optional Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            disabled={isLoading || password?.length < 6}
            className="mt-4 px-5 py-2.5 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Got it
          </button>
        </div>
      </MyModal>
      <MyModal isOpen={isDocumentOpen} onClose={() => setIsDocumentOpen(false)}>
        <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
          {/* Success Icon Animation */}
          <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-primary/30">
            <svg
              className="w-8 h-8 text-primary animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div className="absolute inset-0 rounded-full ring-2 ring-primary/40 selection:animate-ping"></div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900">
            Congrats! Your request has been approved 🎉
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 max-w-xs">
            Please upload the required documents to continue.
          </p>

          {/* Optional Close Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/enginer-profile-update");
            }}
            disabled={isLoading || password?.length < 6}
            className="mt-4 px-5 py-2.5 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Upload Documents
          </button>
        </div>
      </MyModal>
    </AuthLayout>
  );
}

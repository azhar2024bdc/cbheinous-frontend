/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import {
  useOtpMutation,
  useResendOtpMutation,
} from "@/redux/features/auth/authApi";
import { Loader2 } from "lucide-react";
import OTPloader from "@/components/ui/core/Loader/OTPloader";

interface OTPInputProps {
  numberOfDigits?: number;
  onSubmit?: (code: string) => Promise<void> | void;
  title?: string;
  description?: string;
  label?: string;
  submitButtonText?: string;
  isLoading?: boolean;
}

export default function OTPInput({
  numberOfDigits = 6,
  // onSubmit,
  title = "Check Your Email",
  description = "Please enter your verification code.",
  label = `Write ${numberOfDigits} digit code`,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyNow, { isLoading }] = useOtpMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useResendOtpMutation();

  const verificationSchema = z.object({
    code: z
      .string()
      .length(numberOfDigits, `Code must be exactly ${numberOfDigits} digits`)
      .regex(/^\d+$/, "Code must contain only numbers"),
  });

  type VerificationFormData = z.infer<typeof verificationSchema>;

  const {
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  const codeValue = watch("code");

  const handleFormSubmit = async () => {
    try {
      const email = sessionStorage.getItem("email");
      const from = sessionStorage.getItem("from");
      const newData = {
        email,
        otp: Number(codeValue),
      };

      const res = await verifyNow(newData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        if (from === "register") {
          sessionStorage.removeItem("from");
          sessionStorage.setItem("token", res?.data?.accessToken);
          router.push("/login");
        } else {
          sessionStorage.removeItem("from");
          sessionStorage.setItem("token", res?.data?.accessToken);
          router.push("/reset-password");
        }
        sessionStorage.removeItem("email");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  useEffect(() => {
    if (codeValue.length === numberOfDigits) {
      handleFormSubmit();
    }
  }, [codeValue, numberOfDigits]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const currentCode = codeValue || "";
    const newCode = currentCode.split("");
    newCode[index] = value;

    const updatedCode = Array.from(
      { length: numberOfDigits },
      (_, i) => newCode[i] || ""
    ).join("");
    setValue("code", updatedCode);
    trigger("code");

    if (value && index < numberOfDigits - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      const currentCode = codeValue || "";
      const newCode = currentCode.split("");

      if (newCode[index]) {
        newCode[index] = "";
      } else if (index > 0) {
        newCode[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }

      const updatedCode = Array.from(
        { length: numberOfDigits },
        (_, i) => newCode[i] || ""
      ).join("");
      setValue("code", updatedCode);
      trigger("code");
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < numberOfDigits - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, numberOfDigits);
    setValue("code", pastedData);
    trigger("code");

    const nextIndex = Math.min(pastedData.length, numberOfDigits - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const digits = Array.from(
    { length: numberOfDigits },
    (_, i) => (codeValue || "")[i] || ""
  );

  const handleResend = async () => {
    try {
      const email = sessionStorage.getItem("email");
      const newData = {
        email,
      };
      const res = await resendOtp(newData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {isLoading && <OTPloader />}
      {/* <Logo /> */}
      <div className="bg-white mt-5 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-200 p-8 sm:w-[450px] w-[320px]">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-center text-gray-700 mb-4">
              {label}
            </label>

            <div className="flex flex-wrap gap-3 justify-center max-w-full">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`
                    w-12 h-12 text-center text-lg font-medium border rounded-lg
                    focus:outline-none focus:ring-2 transition-colors
                    ${
                      errors.code
                        ? "border-danger focus:ring-danger focus:border-danger"
                        : "border-gray-300 focus:ring-primary focus:border-primary"
                    }
                    ${digit ? "bg-gray-50" : "bg-white"}
                  `}
                  placeholder={String(index + 1)}
                  disabled={isLoading}
                />
              ))}
            </div>

            {errors.code && (
              <p className="mt-2 text-sm text-red-600 text-center">
                {errors.code.message}
              </p>
            )}
          </div>
        </div>
        {/* Resend OTP */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleResend}
            className="text-sm font-medium text-primary hover:underline"
            disabled={isLoading || isResendLoading}
          >
            {isResendLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Resend OTP"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

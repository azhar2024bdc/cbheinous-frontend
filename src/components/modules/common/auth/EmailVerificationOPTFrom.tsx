"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useOtpMutation } from "@/redux/features/auth/authApi";

import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/features/auth/authSlice";
import Cookie from "js-cookie";
import MutationLoading from "@/components/ui/core/Loader/MutationLoader";


const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Code must contain only numbers"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

export default function EmailVerificationForm() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [otpVerify, { isLoading }] = useOtpMutation();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const codeValue = watch("code");


  const onSubmit = async (data: VerificationFormData) => {
    router.push("/reset-password");
    try {
      const otpdata = {
        email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        otp: Number(data.code),
        type: "FORGOT",
      };
      const res = await otpVerify(otpdata);
      if (res?.data) {
        toast.success(res?.data?.message);

 
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

        router.push("/auth/reset-password");
        router.refresh();
      }
    } catch (error) {

      const errors = error as any;
      toast.error(errors?.data?.message || "Something went wrong");
    }

    console.log("Verification code:", data.code);
    toast.success("Verification successful");
  };

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
      { length: 6 },
      (_, i) => newCode[i] || ""
    ).join("");
    setValue("code", updatedCode);
    trigger("code");

    if (value && index < 5) {
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
        { length: 6 },
        (_, i) => newCode[i] || ""
      ).join("");
      setValue("code", updatedCode);
      trigger("code");
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    setValue("code", pastedData);
    trigger("code");

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const digits = Array.from(
    { length: 6 },
    (_, i) => (codeValue || "")[i] || ""
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-bg">
      <div className="bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-200 p-8 w-full max-w-md ">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Check Your Email
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Please enter your 6 digit code. Then check and confirm your new
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-center text-gray-700 mb-4">
              Write 6 digit code
            </label>

            <div className="flex gap-3 justify-center">
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
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary focus:border-primary"
                  }
                  ${digit ? "bg-gray-50" : "bg-white"}
                `}
                  placeholder={String(index + 1)}
                />
              ))}
            </div>

            {errors.code && (
              <p className="mt-2 text-sm text-red-600 text-center">
                {errors.code.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              !codeValue ||
              codeValue.length < 6 ||
              codeValue.length > 6 ||
              isLoading
            }
            className={`
            w-full py-3 px-4 rounded-lg font-medium text-white transition-colors
            ${
              isSubmitting || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            }
          `}
          >
            {isSubmitting || isLoading ? (
              <MutationLoading text="Verifying..." />
            ) : (
              "Verify Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
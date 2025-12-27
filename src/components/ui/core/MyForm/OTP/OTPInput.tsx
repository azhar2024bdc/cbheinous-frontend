/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
// import { Loader } from "lucide-react";
import { toast } from "sonner";
import OTPloader from "../../Loader/OTPloader";


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
}: // submitButtonText = "Verify Code",
// isLoading = false,
OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Dynamic schema based on numberOfDigits
  const verificationSchema = z.object({
    code: z
      .string()
      .length(numberOfDigits, `Code must be exactly ${numberOfDigits} digits`)
      .regex(/^\d+$/, "Code must contain only numbers"),
  });

  type VerificationFormData = z.infer<typeof verificationSchema>;

  const {
    // handleSubmit,
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
  const [loading, setLoading] = useState(false);

  // Disable scrolling when loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  const codeValue = watch("code");

  const handleFormSubmit = async () => {
    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        toast.success(codeValue);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    // finally{
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (codeValue.length === numberOfDigits) {
      // setHasSubmitted(true);

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {loading && <OTPloader />}
      <div className="bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-200 p-8 sm:w-[450px] w-[320px]">
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
                  disabled={loading}
                />
              ))}
            </div>

     

            {errors.code && (
              <p className="mt-2 text-sm text-red-600 text-center">
                {errors.code.message}
              </p>
            )}
          </div>

          {/* <button
            type="button"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={
              isSubmitting ||
              !codeValue ||
              codeValue.length !== numberOfDigits ||
              isLoading
            }
            className={`
              w-full py-3 px-4 rounded-lg font-medium text-white transition-colors
              ${
                isSubmitting ||
                isLoading ||
                codeValue?.length !== numberOfDigits
                  ? "bg-primary/25 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/75 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              }
            `}
          >
            {isSubmitting || isLoading ? (
              <Loader className="animate-spin mx-auto" size={20} />
            ) : (
              submitButtonText
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
}

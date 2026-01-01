/* eslint-disable no-unused-vars */
// Updated registration form with phone field
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  checkPasswordStrength,
  RegisterFormData,
  registerSchema,
} from "@/types/auth";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { AuthButton } from "@/components/ui/core/MyButton/auth-btn";
import { AuthLayout } from "./auth-layout";
import { FormInput } from "@/components/ui/core/MyForm/me/form-input";
import LocationInput from "./locationInput";
import { FormCheckbox } from "@/components/ui/core/MyForm/me/form-checkbox";
import { FormPhoneInput } from "./form-phone-input";

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
  onLoginClick?: () => void;
  loading?: boolean;
}

type LocationData = {
  locationName: string;
  latitude: number;
  longitude: number;
};

export function RegisterForm({ loading = false }: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "", // Add this
      password: "",
      confirmPassword: "",
      location: "",
      latitude: 0,
      longitude: 0,
      agreeToTerms: false,
      isWishToSellHome: false,
    },
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const watchedValues = watch();

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const router = useRouter();

  // Check role redirect
  if (Cookies.get("selectedRole") === "provider") {
    router.push("/professional-registration");
    return null;
  }

  const handleFormSubmit = async (data: RegisterFormData) => {
    console.log("Submitting form:", data);
    console.log("Errors:", errors);

    const newData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
      role: "USER",
    };

    try {
      const res = await register(newData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("from", "register");
        router.push("/verify-otp");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to register. Please try again."
      );
    }
  };

  const currentPasswordStrength = checkPasswordStrength(password || "");
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const showMatchIndicator =
    confirmPassword.length >= password.length &&
    confirmPassword.length > 8 &&
    password.length > 8;

  const handleLocationChange = (location: LocationData) => {
    setValue("location", location.locationName, { shouldValidate: true });
    setValue("latitude", location.latitude as any, { shouldValidate: true });
    setValue("longitude", location.longitude as any, { shouldValidate: true });
  };

  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormInput
          name="name"
          control={control}
          label="Name"
          placeholder="Enter your Name"
          icon="user"
          error={errors.name?.message}
        />

        {/* Email Field */}
        <FormInput
          name="email"
          control={control}
          label="Email"
          type="email"
          placeholder="Enter your Email"
          icon="email"
          error={errors.email?.message}
        />

        {/* Phone Number Field - NEW */}
        <FormPhoneInput
          name="phone"
          control={control}
          label="Phone Number"
          placeholder="Enter your phone number"
          error={errors.phone?.message}
          defaultCountry="BD"
          required
        />

        {/* Location Input */}
        <div className="grid w-full items-center gap-3 mt-5">
          <LocationInput
            name="location"
            placeholder="Choose your location"
            onChange={handleLocationChange}
          />

          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>


        <FormInput
          name="password"
          control={control}
          label="Password"
          type="password"
          placeholder="Enter your Password"
          icon="lock"
          error={errors.password?.message}
        />

        {/* Password Strength Indicators */}
        {password && (
          <div className="!mt-1 space-y-2">
            <div className="space-y-1 text-xs">
              <div
                className={
                  currentPasswordStrength.minLength
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                {currentPasswordStrength.minLength ? "✓" : "○"} At least 8
                characters
              </div>
              <div
                className={
                  currentPasswordStrength.hasUppercase
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                {currentPasswordStrength.hasUppercase ? "✓" : "○"} One uppercase
                letter
              </div>
              <div
                className={
                  currentPasswordStrength.hasLowercase
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                {currentPasswordStrength.hasLowercase ? "✓" : "○"} One lowercase
                letter
              </div>
              <div
                className={
                  currentPasswordStrength.hasNumber
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                {currentPasswordStrength.hasNumber ? "✓" : "○"} One number
              </div>
              <div
                className={
                  currentPasswordStrength.hasSpecial
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                {currentPasswordStrength.hasSpecial ? "✓" : "○"} One special
                character
              </div>
            </div>
          </div>
        )}

        {/* Confirm Password Field */}
        <FormInput
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
          placeholder="Enter Confirm Password"
          icon="lock"
          error={errors.confirmPassword?.message}
        />

        {/* Password Match Indicator */}
        {showMatchIndicator && (
          <div className="!mt-1">
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

        {/* I want to sell my property */}
        <div className="!my-2">
          <div className="flex   items-start space-x-2 ">
            <FormCheckbox
              name="isWishToSellHome"
              control={control}
              checked={watchedValues.isWishToSellHome}
              onChange={(e) =>
                setValue("isWishToSellHome", e.target.checked, {
                  shouldValidate: true,
                })
              }
              className="mt-1"
            />
            <span className="text-sm text-gray-600 mt-1">
              I want to sell my property{" "}
            </span>
          </div>

        </div>

        {/* Terms Checkbox */}
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <FormCheckbox
              name="agreeToTerms"
              control={control}
              checked={watchedValues.agreeToTerms}
              onChange={(e) =>
                setValue("agreeToTerms", e.target.checked, {
                  shouldValidate: true,
                })
              }
              className="mt-1"
            />
            <span className="text-sm text-gray-600 mt-1">
              I agree to the{" "}
              <Link
                href="/terms-and-conditions"
                className="text-primary hover:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy policy
              </Link>
            </span>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-500">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <AuthButton
          htmlType="submit"
          loading={loading || isRegisterLoading}
          disabled={
            !isValid ||
            loading ||
            isRegisterLoading ||
            !watchedValues.agreeToTerms
          }
          className="mt-6"
        >
          {isRegisterLoading ? (
            <Loader className="animate-spin" />
          ) : (
            "Create your account"
          )}
        </AuthButton>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-primary hover:underline font-medium"
            >
              Login
            </button>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}

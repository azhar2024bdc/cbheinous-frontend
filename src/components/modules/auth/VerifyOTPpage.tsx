"use client";

import OTPInput from "@/components/ui/core/MyForm/OTP/OTPInput";
import React from "react";
import { AuthLayout } from "./auth-layout";

const VerifyOTPpage = () => {
  return (
    <div>
      <AuthLayout title="Verify OTP" subtitle="Enter the OTP sent to your email">
        <OTPInput numberOfDigits={6} />
      </AuthLayout>
    </div>
  );
};

export default VerifyOTPpage;

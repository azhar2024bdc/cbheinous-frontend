"use client";

import OTPInput from "@/components/ui/core/MyForm/OTP/OTPInput";
import React from "react";

const VerifyOTPpage = () => {
  return (
    <div>
      <OTPInput numberOfDigits={6} />
    </div>
  );
};

export default VerifyOTPpage;

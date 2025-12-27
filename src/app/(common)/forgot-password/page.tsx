// import EmailVerificationForm from "@/components/modules/common/auth/EmailVerificationOPTFrom";
// import OTPInput from "@/components/ui/core/MyForm/OTP/OTPInput";
import VerifyOTPpage from "@/components/modules/common/auth/VerifyOTPpage";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <EmailVerificationForm /> */}
      {/* <OTPInput
        onSubmit={(code) => {
          console.log(code);
        }}
      /> */}
      <VerifyOTPpage />
    </div>
  );
};

export default page;




import ProfileSidebar from "@/components/modules/common/profile/ProfleSidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start py-4 sm:py-6  container mx-auto gap-y-6 lg:gap-x-6 xl:gap-x-10">
      <ProfileSidebar />
      <div className="flex-1 w-full lg:w-auto min-w-0">{children}</div>
    </div>
  );
};

export default layout;

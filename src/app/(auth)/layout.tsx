import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <div className="font-poppins">{children}</div>
    </div>
  );
};

export default layout;

import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      {/* <NavBar /> */}
      <div className="h-full font-inter bg-primary-bg">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default layout;

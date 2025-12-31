
import React from "react";

import homepage from "@/assets/images/homepage-bg.png";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="h-screen">
      <div
        style={{ backgroundImage: `url(${homepage.src})` }}
        className=" bg-cover bg-red-600  h-full bg-top -z-10 sm:mt-10 mt-5 "
      >
        <div className="container mx-auto">
          <div className="max-w-[607px] mx-auto ">
            <h1 className="sm:text-[46px] text-[32px] text-center text-text-secondary">
              Make Offers on Any Home in America
            </h1>
            <Link
              className="bg-primary rounded py-[20px] mx-auto px-[30px] mt-12 block w-max"
              href={""}
            >
              <div className="flex items-center gap-2">
                <button className="text-[16px] text-text-primary font-medium ">
                  Make an Offer
                </button>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0034 9.414L7.39642 18.021L5.98242 16.607L14.5884 8H7.00342V6H18.0034V17H16.0034V9.414Z"
                    fill="#0F0E0E"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

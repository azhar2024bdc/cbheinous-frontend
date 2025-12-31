"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import bg from "@/assets/images/make-offer-bg.png";
import design from "@/assets/images/design.png";
import HotelSearchMap from "./HotelSearchMap";

const MakeOffer = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(inputValue);
  };

  return (
    <>
      {/* BG */}
      <div className="relative w-full sm:h-auto h-[500px] overflow-visible">
        <Image
          src={bg}
          alt="make-offer-bg"
          sizes="100vw"
          className="z-0 w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto">
        <div className="relative rounded-sm 2xl:max-w-[892px] max-w-[852px] mx-auto sm:-mt-3 2xl:-mt-5 bg-white z-50 shadow-[0_8px_20px_rgba(227,176,53,0.25),0_8px_20px_rgba(227,176,53,0.15)]">
          {/* Design */}
          <div className="absolute -z-10 -top-1 left-1/2 -translate-x-1/2 w-[101%] pointer-events-none">
            <Image
              src={design}
              alt="design"
              sizes="100vw"
              className="scale-x-[1.03] h-7 md:h-auto"
              style={{ width: "100%" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 space-y-2 bg-white sm:p-6 p-2">
            <label className="text-sm font-bold text-gray-800 uppercase tracking-tight">
              Location
            </label>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full border border-gray-200 rounded-md">
                  <input
                    type="text"
                    placeholder="Search Any Address"
                    className="w-full h-12 px-4 rounded-md border-gray-200 focus:ring-[#eab308] focus:border-[#eab308]"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#eab308] hover:bg-[#d9a306] border border-[#eab308] 
                  text-white font-semibold h-12 px-8 rounded-md flex items-center gap-2 
                  shrink-0 w-full md:w-auto"
                >
                  <Search className="w-4 h-4" />
                  <span>Make Offer</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map */}
        <HotelSearchMap
          searchQuery={location}
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
          className="h-[600px] mt-10"
        />
      </div>
    </>
  );
};

export default MakeOffer;

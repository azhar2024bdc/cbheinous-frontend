"use client";

import {
  earning_from_platform,
  pet_performence,
  pet_sitter_performence,
} from "@/assets/icons/ioncs";
import { useGetEarningStatQuery } from "@/redux/features/auth/authApi";
import checkFraction from "@/utils/checkFraction";
import { Loader2 } from "lucide-react";

export default function RevenueCards() {
  const { isLoading, data } = useGetEarningStatQuery(undefined);

  const userData = data?.data;

  // console.log(userData)

  if (isLoading) {
    return <Loader2 />;
  }
  // "totalIndividualEarnings": 0,
  //         "totalSponsorEarnings": 4.9990000000000006,
  //         "totalQuickEarnings": 0
  const revenueData = [
    {
      title: "Earning from Platform",
      amount: "$" + checkFraction(userData?.totalSponsorEarnings || 0),
      icon: earning_from_platform,
    },
    {
      title: "Pet Performance",
      amount: "$" + checkFraction(userData?.totalIndividualEarnings || 0),
      icon: pet_performence,
    },
    {
      title: "Pet Sitter Performance",
      amount: "$" + checkFraction(userData?.totalQuickEarnings || 0),
      icon: pet_sitter_performence,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {revenueData.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex justify-center gap-3 "
        >
          <div className="flex items-center gap-2 mb-2">{item.icon}</div>
          <div className="">
            <span className="text-sm text-gray-600">{item.title}</span>
            <p className="text-xl font-bold text-gray-900">{item.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

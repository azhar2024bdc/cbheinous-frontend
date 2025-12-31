"use client";

import { SubsArrowIcon } from "@/assets/icons/ioncs";
import { Check } from "lucide-react";
import React, { useState } from "react";

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

const Subscriptions = () => {
  const [plans, ] = useState<Plan[]>([
    {
      id: "1",
      name: "Basic plan",
      price: 10,
      features: [
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
      ],
    },
    {
      id: "2",
      name: "Standard Plan",
      price: 40,
      features: [
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
      ],
      isPopular: true,
    },
    {
      id: "3",
      name: "Premium Plan",
      price: 99,
      features: [
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
        "Lorem Ipsum dummy text",
      ],
    },
  ]);
  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-[1.2rem]">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="md:text-[40px] text-[32px] font-bold text-text-secondary mb-3">
            Start Free, Grow with Us
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Enjoy your first 3 service offers for free. Upgrade anytime to reach
            more clients and unlock premium features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-12 md:gap-y-0 md:gap-x-12  max-w-5xl mx-auto mt-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-sm p-6 relative ${
                plan.isPopular
                  ? "ring-2 ring-yellow-400 transform scale-105"
                  : "border"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-6 md:-top-10 right-0">
                  <div className=" text-yellow-700 px-4 py-1 rounded-full text-xs font-medium flex  gap-[2px]">
                    <span>{SubsArrowIcon()}</span>
                    <span className="-mt-1">Popular</span>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{plan.name}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Edit Button */}
              <button
                // onClick={() => handleEditClick(plan)}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.isPopular
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                    : "bg-text-secondary text-white hover:bg-gray-800"
                }`}
              >
               Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;

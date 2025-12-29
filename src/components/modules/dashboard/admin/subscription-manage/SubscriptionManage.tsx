"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import bg from "@/assets/images/subscription-bg.png";
import { SubsArrowIcon } from "@/assets/icons/ioncs";

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export default function SubscriptionManage() {
  const [plans, setPlans] = useState<Plan[]>([
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    features: ["", "", "", "", ""],
  });

  const handleEditClick = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      features: [...plan.features],
    });
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleSave = () => {
    if (editingPlan) {
      setPlans(
        plans.map((plan) =>
          plan.id === editingPlan.id
            ? {
                ...plan,
                name: formData.name,
                price: formData.price,
                features: formData.features,
              }
            : plan
        )
      );
    }
    handleClose();
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg.src})` }}
      className="min-h-screen bg-cover  py-12 px-4 "
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Start Free, Grow with Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enjoy your first 3 service offers for free. Upgrade anytime to reach
            more clients and unlock premium features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-4">
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
                <div className="absolute -top-10 right-0">
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
                onClick={() => handleEditClick(plan)}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.isPopular
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Edit Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Edit Plan</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (per month)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        placeholder={`Feature ${index + 1}`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newFeatures = formData.features.filter(
                            (_, i) => i !== index
                          );
                          setFormData({ ...formData, features: newFeatures });
                        }}
                        className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      features: [...formData.features, ""],
                    });
                  }}
                  className="mt-3 w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-yellow-400 hover:text-yellow-600 transition-colors font-medium"
                >
                  + Add New Feature
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-yellow-400 text-gray-900 font-medium rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

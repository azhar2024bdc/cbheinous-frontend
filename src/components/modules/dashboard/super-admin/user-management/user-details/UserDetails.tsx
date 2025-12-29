"use client";

import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import { BackIcon } from "@/assets/icons/ioncs";
import { useRouter } from "next/navigation";

export default function UserDetails() {
  const router = useRouter();
  return (
    <div className=" ">
      <button
        onClick={() => router.back()}
        className="mb-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <BackIcon />
      </button>

      <div className="max-w-2xl border rounded-xl ">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">User Information</h2>

          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces"
                alt="User profile"
                className="w-full h-full object-cover"
                width={200}
                height={200}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Bryan Adams</span>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Example@gmail.com</span>
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">+123-4568887</span>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">California, USA</span>
              </div>
            </div>

            {/* Join date */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Join date
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">12/04/01/2025</span>
              </div>
            </div>

            {/* Subscription */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Subscription
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Basic plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

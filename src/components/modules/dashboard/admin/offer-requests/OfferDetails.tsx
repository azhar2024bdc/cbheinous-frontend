"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Home,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

const messageSchema = z.object({
  propertyAddress: z.string().min(1, "Property address is required"),
  ownerName: z.string().min(1, "Owner's name is required"),
  offerPrice: z.string().min(1, "Offer price is required"),
  houseOwnerName: z.string().min(1, "House owner's name is required"),
  houseOwnerEmail: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type MessageFormData = z.infer<typeof messageSchema>;

export default function OfferDetails() {
  const [status, setStatus] = useState("Pending");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      propertyAddress: "1102 Flatline Ct, Waukesha, WI 53188, USA",
      ownerName: "Michael A",
      offerPrice: "$750,00.00",
      houseOwnerName: "",
      houseOwnerEmail: "owneremail@gmail.com",
      message: "",
    },
  });

  const onSubmit = (data: MessageFormData) => {
    console.log("Form submitted:", data);
    alert("Message sent successfully!");
    reset();
  };

  return (
    <div className=" ">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 font-medium">
              Information Status
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 border-2 border-yellow-400 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>In Review</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Buyer Information */}
          <div className="bg-white rounded-xl  border p-6">
            <h2 className="text-xl font-semibold mb-6">Buyer Information</h2>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-400">👤</span>
                  <span className="text-gray-700">Bryan Adams</span>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">bryanadams@gmail.com</span>
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">+23 26448887</span>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">California, USA</span>
                </div>
              </div>

              {/* Offer Date and Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Date
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 text-sm">12/04/2025</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Amount
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 text-sm">$ 750,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="bg-white rounded-xl  border p-6">
            <h2 className="text-xl font-semibold mb-6">Property Information</h2>

            <div className="space-y-5">
              {/* Property Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <Home className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700 text-sm">
                    47 W 13th St, New York, NY 10011, USA
                  </span>
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Alabama</span>
                </div>
              </div>

              {/* State and Zip Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">California</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">58854</span>
                  </div>
                </div>
              </div>

              {/* Property Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Image
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop"
                      alt="Property front view"
                      className="w-full h-full object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
                      alt="Property side view"
                      className="w-full h-full object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-semibold my-6">Send Message</h1>

      <div className="">
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl  border p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Property Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address :
                </label>
                <input
                  type="text"
                  {...register("propertyAddress")}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  readOnly
                />
                {errors.propertyAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.propertyAddress.message}
                  </p>
                )}
              </div>

              {/* Owner's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner's Name :
                </label>
                <input
                  type="text"
                  {...register("ownerName")}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  readOnly
                />
                {errors.ownerName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.ownerName.message}
                  </p>
                )}
              </div>

              {/* Offer Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Price :
                </label>
                <input
                  type="text"
                  {...register("offerPrice")}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-green-600 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                  readOnly
                />
                {errors.offerPrice && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.offerPrice.message}
                  </p>
                )}
              </div>

              {/* House owner's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  House owner's Name
                </label>
                <input
                  type="text"
                  {...register("houseOwnerName")}
                  placeholder="Enter house owner's name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {errors.houseOwnerName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.houseOwnerName.message}
                  </p>
                )}
              </div>

              {/* House owner's Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  House owner's Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    {...register("houseOwnerEmail")}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    readOnly
                  />
                </div>
                {errors.houseOwnerEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.houseOwnerEmail.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={6}
                  placeholder="Write a message"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

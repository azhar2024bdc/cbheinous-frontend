"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, ArrowRight } from "lucide-react";
import { Select } from "antd";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  contactNo: z.string().regex(/^\+?[\d\s-()]+$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  offerAmount: z
    .string()
    .min(1, "Offer amount is required")
    .regex(/^\d+$/, "Must be a valid number"),
  propertyAddress: z
    .string()
    .min(5, "Property address must be at least 5 characters"),
  city: z.string().min(1, "Please select a city"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
});

type FormData = z.infer<typeof formSchema>;

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
const states = ["NY", "CA", "IL", "TX", "AZ"];

export default function NewOffer() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    console.log("Uploaded Files:", uploadedFiles);
    alert("Form submitted successfully! Check console for details.");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Contact Details Section 🔑 */}  
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Contact Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Enter your full Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Full Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact No
                </label>
                <input
                  {...register("contactNo")}
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {errors.contactNo && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactNo.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Write the center Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Amount
                </label>
                <input
                  {...register("offerAmount")}
                  type="text"
                  placeholder="$170,000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {errors.offerAmount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.offerAmount.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Property Information Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Property Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Address
                </label>
                <input
                  {...register("propertyAddress")}
                  type="text"
                  placeholder="Enter your Full Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {errors.propertyAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.propertyAddress.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>

                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "Please select a city" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select your city"
                        // size="large"
                        className="w-full h-[42px]"
                        options={cities.map((city) => ({
                          value: city,
                          label: city,
                        }))}
                        onChange={(value) => field.onChange(value)} 
                      />
                    )}
                  />

                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>

     

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: "Please select a state" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select your state"
                        // size="large"
                        className="w-full h-[42px]"
                        options={states.map((state) => ({
                          value: state,
                          label: state,
                        }))}
                        onChange={(value) => field.onChange(value)} 
                      />
                    )}
                  />

                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <input
                  {...register("zipCode")}
                  type="text"
                  placeholder="Enter Zip Code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload property photos for better evaluation (optional)
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept="image/*"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                  </label>
                  {uploadedFiles.length > 0 && (
                    <p className="mt-2 text-sm text-green-600">
                      {uploadedFiles.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              Submit Offer
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

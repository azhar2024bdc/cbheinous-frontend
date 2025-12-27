"use client";

import MyFormInput from "@/components/ui/core/MyForm/MyFormInput/MyFormInput";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "antd";
import Image from "next/image";
import MyFormDatePicker from "@/components/ui/core/MyForm/MyFormDatePicker/MyFormDatePicker";

import MyFormTextArea from "@/components/ui/core/MyForm/MyFormTextArea/MyFormTextArea";

// Zod validation schema
const groupBuySchema = z
  .object({
    productName: z
      .string()
      .min(1, "Product name is required")
      .min(3, "Product name must be at least 3 characters")
      .max(100, "Product name must not exceed 100 characters"),

    offerEndDate: z
      .string()
      .min(1, "Offer end date is required")
      .refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }, "End date must be today or in the future"),

  

    description: z
      .string()
      .min(1, "Description is required")
      .min(20, "Description must be at least 20 characters")
      .max(5000, "Description must not exceed 5000 characters"),
  })
  
  

type GroupBuyFormData = z.infer<typeof groupBuySchema>;

const CreateAnnouncement = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const methods = useForm<GroupBuyFormData>({
    resolver: zodResolver(groupBuySchema),
    mode: "onChange",
    defaultValues: {
      productName: "",
      offerEndDate: "",
      description: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  
  } = methods;

  const onSubmit = async (data: GroupBuyFormData) => {
    try {
      console.log("Form submitted:", data);
      console.log(uploadedImage, "uploadedImage - This is now a File object");

      // Example: Create FormData for API call with file upload
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("offerEndDate", data.offerEndDate);

      formData.append("description", data.description);


      if (uploadedImage) formData.append("productImage", uploadedImage);

      // await createGroupBuy(formData);
      alert("Group Buy created successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to create Group Buy. Please try again.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store the actual File object
      setUploadedImage(file);

      // Create preview URL for display
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="">
      <div className="mb-8">
        <h2 className="text-[32px] font-semibold">Create Group Buy</h2>
        <p className="text-gray-600">
          Manage Active Group Deals and Participants
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Basic Information</h3>

            <MyFormInput
              type="text"
              label="Product Name"
              name="productName"
              placeHolder="Enter product name"
            />

            <MyFormDatePicker label="Offer End Date" name="offerEndDate" />
          </div>

          <div className="space-y-4 md:mb-6 mb-32">
            <h3 className="text-xl font-semibold">Description</h3>
            <label className="block text-base font-normal text-text-primary mb-2">
              Write about your Group Buy Description and Product features.
            </label>

            <MyFormTextArea name="description" placeHolder="Description" />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Upload Product Image</h3>

            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg
                    className="w-12 h-12 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-gray-600">Click to upload product image</p>
                  <p className="text-sm text-gray-400 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="relative inline-block">
                <Image
                  src={imagePreview}
                  alt="Uploaded product"
                  className="max-w-xs rounded-lg shadow-md"
                  height={200}
                  width={200}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="default"
              size="large"
              className="px-8"
              onClick={() => {
                methods.reset();
                removeImage();
              }}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isSubmitting}
              className="px-8 bg-primary hover:bg-primary/70"
            >
              Create Group Buy
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateAnnouncement;

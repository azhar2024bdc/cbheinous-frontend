"use client";

import QuillEditor from "@/components/ui/core/editors/QuillEditor";
import MyFormInput from "@/components/ui/core/MyForm/MyFormInput/MyFormInput";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "antd";
import Image from "next/image";
import MyFormDatePicker from "@/components/ui/core/MyForm/MyFormDatePicker/MyFormDatePicker";
import MyFormSelect from "@/components/ui/core/MyForm/MyFormSelect/MyFormSelect";

// Zod validation schema
const groupBuySchema = z.object({
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
  
  originalPrice: z
    .string()
    .min(1, "Original price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Original price must be a positive number",
    }),
  
  discountPrice: z
    .string()
    .min(1, "Discount price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Discount price must be a positive number",
    }),
  
  catalogFile: z.string().optional(),
  
  googleDriveLink: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return val.includes("drive.google.com") || val.includes("docs.google.com");
      },
      { message: "Please provide a valid Google Drive link" }
    ),
  
  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(5000, "Description must not exceed 5000 characters"),
}).refine(
  (data) => {
    const originalPrice = Number(data.originalPrice);
    const discountPrice = Number(data.discountPrice);
    return discountPrice < originalPrice;
  },
  {
    message: "Discount price must be less than original price",
    path: ["discountPrice"],
  }
);

type GroupBuyFormData = z.infer<typeof groupBuySchema>;

const CreateNewGroupNow = () => {
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const methods = useForm<GroupBuyFormData>({
    
    resolver: zodResolver(groupBuySchema),
    mode: "onChange",
    defaultValues: {
      productName: "",
      offerEndDate: "",
      originalPrice: "",
      discountPrice: "",
      catalogFile: "",
      googleDriveLink: "",
      description: "",
    },
    
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: GroupBuyFormData) => {
    try {
      console.log("Form submitted:", data);
      console.log(uploadedImage, "uploadedImage - This is now a File object");
      
      // Example: Create FormData for API call with file upload
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("offerEndDate", data.offerEndDate);
      formData.append("originalPrice", data.originalPrice);
      formData.append("discountPrice", data.discountPrice);
      formData.append("description", data.description);
      
      if (data.catalogFile) formData.append("catalogFile", data.catalogFile);
      if (data.googleDriveLink) formData.append("googleDriveLink", data.googleDriveLink);
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2  className="text-[32px] font-semibold">Create Group Buy</h2>
        <p className="text-gray-600">Manage Active Group Deals and Participants</p>
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
            
            <MyFormDatePicker
              label="Offer End Date"
              name="offerEndDate"
            />
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Pricing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MyFormInput
                type="number"
                label="Original Price"
                name="originalPrice"
                placeHolder="$0.00"
              />
              
              <MyFormInput
                type="number"
                label="Discount Price"
                name="discountPrice"
                placeHolder="$0.00"
              />
            </div>
          </div>

          <MyFormSelect
            label="Select Category"
            name="brands"
            placeHolder="Select Category"
            options={[
              { value: "electronics", label: "Electronics" },
              { value: "clothing", label: "Clothing" },
              { value: "home", label: "Home & Garden" },
            ]}
          />
          
          <MyFormSelect
            label="Select Category"
            name="category"
            placeHolder="Select Category"
            mode="tags"
            options={[
              { value: "electronics", label: "Electronics" },
              { value: "clothing", label: "Clothing" },
              { value: "home", label: "Home & Garden" },
            ]}
          />
          <MyFormSelect
            label="Select Category"
            name="shirts"
            placeHolder="Select Category"
            mode="multiple"
            options={[
              { value: "electronics", label: "Electronics" },
              { value: "clothing", label: "Clothing" },
              { value: "home", label: "Home & Garden" },
            ]}
          />


          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Links</h3>
            
            <MyFormInput
              type="text"
              label="Catalog File"
              name="catalogFile"
              placeHolder="Upload or enter catalog file link"
            />
            
            <MyFormInput
              type="url"
              label="Google Drive Link"
              name="googleDriveLink"
              placeHolder="https://drive.google.com/..."
            />
          </div>

          <div className="space-y-4 md:mb-6 mb-32">
            <h3 className="text-xl font-semibold">Description</h3>
            <label className="block text-base font-normal text-text-primary mb-2">
              Write about your Group Buy Description and Product features.
            </label>
            
            <QuillEditor
              value={description}
              onChange={(value) => {
                setDescription(value);
                setValue("description", value, { shouldValidate: true });
              }}
              placeholder="Write something about your product..."
            />
            
            {errors.description && (
              <small className="text-red-500 mt-1">
                {errors.description.message}
              </small>
            )}
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
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
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

export default CreateNewGroupNow;
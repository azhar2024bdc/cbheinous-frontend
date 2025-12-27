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
import { toast } from "sonner";

// Zod validation schema
const groupBuySchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),
});

type GroupBuyFormData = z.infer<typeof groupBuySchema>;

const CreateChatManage = () => {
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const methods = useForm<GroupBuyFormData>({
    resolver: zodResolver(groupBuySchema),
    mode: "onChange",
    defaultValues: {
      productName: "",
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

      // await createGroupBuy(formData);
      toast.success("Group Buy created successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.success("Failed to create Group Buy. Please try again.");
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
        <h2 className="text-[32px] font-semibold">Create Open Chat</h2>
        <p className="text-gray-600">
          Manage Active Group Deals and Participants
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <MyFormInput
              type="text"
              label="Title"
              name="productName"
              placeHolder="Enter title"
            />
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

export default CreateChatManage;

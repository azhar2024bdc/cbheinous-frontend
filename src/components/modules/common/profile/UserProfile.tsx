"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/authApi";
// import LoadingComponent from "../shared/loading/Loading";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import Image from "next/image";
import MyFormInput from "@/components/ui/core/MyForm/MyFormInput/MyFormInput";
import { FormRadio } from "@/components/ui/core/MyForm/me/form-radio";
import MyFormTextArea from "@/components/ui/core/MyForm/MyFormTextArea/MyFormTextArea";
import { Button } from "antd";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading } = useGetMeQuery(undefined, { skip: !user?.role });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const loggedInUser = useMemo(() => data?.data, [data]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const methods = useForm({
    defaultValues: {
      name: "",
      gender: "",
      address: "",
      isWishToSellHome: false,
    },
  });

  useEffect(() => {
    if (loggedInUser) {
      methods.reset({
        name: loggedInUser.name || "",
        gender: loggedInUser.gender || "",
        address: loggedInUser.description || "",
        isWishToSellHome: loggedInUser.isWishToSellHome || false,
      });
    }
  }, [loggedInUser, methods]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    const newData = {
      name: data.name,
      gender: data.gender,
      description: data.address,
      isWishToSellHome: data.isWishToSellHome,
    };

    formData.append("bodyData", JSON.stringify(newData));
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }

    try {
      const res = await updateUser(formData).unwrap();
      if (res?.success) {
        toast.success(
          res?.message || res?.data?.message || "Profile updated successfully."
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Something went wrong."
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  //   if (isLoading) {
  //     return <LoadingComponent />;
  //   }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <Image
              src={
                previewUrl ||
                loggedInUser?.profileImage ||
                "/default-avatar.png"
              }
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border"
              width={100}
              height={100}
            />

            {/* Edit icon overlay */}
            <label
              htmlFor="profileImage"
              className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:scale-105 transition-transform"
            >
              ✏️
            </label>

            {/* Hidden file input */}
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <MyFormInput
          name="name"
          type="text"
          label="Full Name:"
          placeHolder="Enter your name"
        />

        <p>Email: {loggedInUser?.email}</p>

        <FormRadio
          name="gender"
          label="Gender:"
          options={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
          ]}
          // defaultValue={loggedInUser?.gender}
        />

        <FormRadio
          name="isWishToSellHome"
          label="Do you wish to sell your home:"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "No" },
          ]}
          // defaultValue={loggedInUser?.gender}
        />

        <MyFormTextArea
          name="address"
          label="Bio(Optional):"
          placeHolder="Enter your Bio"
        />

        <div className="flex justify-end pt-10">
          <Button htmlType="submit" className="bg-primary">
            {isUpdating ? (
              <Loader className="animate-spin" />
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserProfile;

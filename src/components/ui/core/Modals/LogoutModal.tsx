"use client";

import { logout } from "@/redux/features/auth/authSlice";

import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { toast } from "sonner";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  if (!isOpen) return null;

  const handleCancel = () => {
    onClose();
  };

  const handleLogout = async () => {
    onConfirm();
    dispatch(logout());


    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
  
    router.push("/login");
    toast.success("Logout successful!");
  };

  return (
    <>

      <div
        className="fixed inset-0 bg-black/60 z-[999]"
        onClick={handleCancel}
      />


      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">

          <div className="px-6 py-4 border-b border-gray-100">
            <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-alart text-center">
              Logout
            </h2>
          </div>

  
          <div className="px-6 py-6">
            <p className="text-gray-800 text-center text-lg mb-8">
              Are you sure you want to log out?
            </p>

  
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 px-6 bg-primary text-white rounded-full font-medium hover:bg-primary/80 transition-colors duration-200"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;

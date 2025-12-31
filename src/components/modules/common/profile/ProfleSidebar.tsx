"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import { useLoggedUser } from "@/hooks/useLoggedUser";
import LogoutModal from "@/components/ui/core/Modals/LogoutModal";
import {
  changeIcon,
  logoutIcon,
  offerIcon,
  subscriptionIcon,
  termsIcon,
  userIcon,
} from "@/assets/icons/ioncs";

const ProfileSidebar = () => {
  const pathname = usePathname();

  const { loggedUser, isLoading } = useLoggedUser();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    setIsOpen(false);
  };

  const items = [
    {
      title: "User Information",
      link: "/profile-info",
      icon: userIcon,
    },

    {
      title: "My offer list",
      link: "/my-offer-list",
      icon: offerIcon,
    },
    {
      title: "Change Password",
      link: "/change-password",
      icon: changeIcon,
    },
    {
      title: "My Subscriptions",
      link: "/my-subscriptions",
      icon: subscriptionIcon,
    },

    {
      title: "Terms & Privacy",
      link: "/terms-and-privacy",
      icon: termsIcon,
    },
    // {
    //   title: "Help & Support",
    //   link: "/help-and-support",
    //   icon: helpSupportIcon,
    // },
  ];

  // if (loggedUser?.role === "JOB_SEEKER") {
  //   items.splice(2, 2); // Remove "My Subscriptions" and "My Services" for JOB_SEEKER
  // }

  // if (isLoading) return <LoadingComponent />;

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky 
          top-0 lg:top-auto
          left-0 lg:left-auto
          w-[280px] sm:w-[300px] lg:w-[300px] xl:w-[320px]
          h-screen lg:h-[calc(100vh-208px)] 
          p-4 sm:p-6
          rounded-none lg:rounded-xl
          bg-[#F8F8F8]
          z-40
          transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          flex flex-col
          overflow-y-auto lg:overflow-visible
          shadow-2xl lg:shadow-none
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden self-end mb-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <svg
            className="w-5 h-5 "
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

        {/* Navigation Items */}
        <div className="flex flex-col gap-y-1.5 sm:gap-y-2 flex-1">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-x-2 sm:gap-x-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700 hover:text-gray-900 ${
                pathname === item.link ? "bg-primary" : "text-[#1A1A1A]"
              }`}
            >
              <span className="text-gray-500 flex-shrink-0">{item.icon}</span>
              <span className="font-medium text-sm sm:text-base">
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-200 lg:border-0 sticky bottom-0 bg-[#F8F8F8] lg:static pb-2">
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-x-2 sm:gap-x-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="text-gray-500 flex-shrink-0">{logoutIcon}</span>
            <p className="text-alart text-sm sm:text-base font-medium text-danger">
              Logout
            </p>
          </button>
        </div>
      </div>

      <LogoutModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default ProfileSidebar;

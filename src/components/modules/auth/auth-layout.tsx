"use client";

import type React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

import bg from "@/assets/images/bg.png";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen  flex items-center justify-center py-12 sm:mx-0 mx-3 relative">
      <div className="max-w-lg w-full bg-white">
        <div className="text-center mb-5 ">
          <div className="mx-auto h-[123px] w-[211px] flex items-center justify-center mb-0 z-20">
            <Link href="/">
              <Image src={logo} alt="logo" width={211} height={123} />
            </Link>
          </div>

          <div className="mt-8">
            {title && (
              <h2 className=" sm:text-[36px] text-[24px] font-bold text-primary">{title}</h2>
            )}

            {subtitle && (
              <p className=" text-sm text-text-secondary">{subtitle}</p>
            )}
          </div>
        </div>

        <div className=" pb-8 px-6  rounded-lg  ">
          {children}
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${bg.src})` }}
        className="absolute top-1/2 -translate-y-1/2 inset-0 max-h-[700px] w-full bg-cover bg-center -z-10"
      ></div>
    </div>
  );
}

"use client"

import type React from "react"

import { Button, type ButtonProps } from "antd"

interface AuthButtonProps extends Omit<ButtonProps, "variant"> {
  children: React.ReactNode
  authVariant?: "primary" | "secondary"
  className?: string
  // loading?: boolean
  // loadingText?: string
}

export function AuthButton({
  children,
  authVariant = "primary",
  className = "",
  // loading,
  // loadingText,
  ...props
}: AuthButtonProps) {
  const baseClasses = "h-12 rounded-lg font-medium text-base w-full"

  const variantClasses = {
    primary: "bg-primary hover:!bg-primary border-primary hover:border-primary !text-white disabled:!bg-primary/50  disabled:text-white",
    secondary: "bg-white hover:bg-gray-50 border-gray-200 text-gray-700",
  }

  return (
    <Button
      {...props}
      className={`${baseClasses} ${variantClasses[authVariant]} ${className}`}
      type={authVariant === "primary" ? "primary" : "default"}
      
    >
      {children}
    </Button>
  )
}

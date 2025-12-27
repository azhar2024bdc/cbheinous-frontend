

import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  text?: string;
  fullScreen?: boolean;
  className?: string;
  textcolor?: string
}

const MutationLoading: React.FC<LoadingProps> = ({
  size = "md",
  color = "",
  text = "Loading...",
  fullScreen = false,
  className = "",
  textcolor=""
}) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-b-2",
    md: "h-5 w-5 border-b-2",
    lg: "h-6 w-6 border-2",
    xl: "h-8 w-8 border-2",
  };

  const containerClasses = `flex items-center justify-center ${className} ${
    fullScreen ? "h-screen w-screen fixed inset-0" : ""
  }`;

  return (
    <div className={containerClasses}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-${color} mr-3`}
      ></div>
      {text && <span className={`text-${textcolor}`}>{text}</span>}
    </div>
  );
};

export default MutationLoading;
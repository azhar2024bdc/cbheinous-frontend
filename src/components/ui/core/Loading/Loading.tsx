"use client";

import { Spin } from "antd";
import { useEffect } from "react";

interface LoadingProps {
  size?: "small" | "default" | "large";
  loading?: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  return (
    <main className=" fixed top-0 left-0 w-full h-screen flex items-center justify-center z-[9999] overflow-hidden">
      <Spin size="large" />
    </main>
  );
};

export default Loading;

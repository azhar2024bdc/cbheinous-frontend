"use client";

import { useGetAllTermsQuery } from "@/redux/features/terms-policy/termsApi";
import { useMemo, useState } from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-1 font-semibold transition-colors ${
        active
          ? "text-primary border-b-2 border-primary"
          : "text-gray-500 border-b-2 border-transparent hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-8">
      {[1, 2].map((i) => (
        <div key={i} className="mb-8">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface TermsData {
  id: string;
  type: "PRIVACY_POLICY" | "TERMS_OF_SERVICE";
  topic: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function TermsAndPolicy() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

  const { isLoading, isFetching, data } = useGetAllTermsQuery(undefined);
  const termsData = useMemo(() => data?.data || [], [data]);

  // Filter data based on active tab and topic
  const currentTabData = useMemo(() => {
    if (activeTab === "privacy") {
      return termsData.filter(
        (item: TermsData) => 
          item.topic.toLowerCase().includes("privacy") ||
          item.type === "PRIVACY_POLICY" && !item.topic.toLowerCase().includes("terms")
      );
    } else {
      return termsData.filter(
        (item: TermsData) => 
          item.topic.toLowerCase().includes("terms") ||
          item.type === "TERMS_OF_SERVICE"
      );
    }
  }, [termsData, activeTab]);

  // Helper function to format description with line breaks
  const formatDescription = (description: string) => {
    return description.split("\n").map((line, index) => (
      <p key={index}>{line || "\u00A0"}</p>
    ));
  };

  const renderContent = () => {
    if (isLoading || isFetching) {
      return <SkeletonLoader />;
    }

    if (currentTabData.length === 0) {
      return (
        <div className="text-gray-500 text-center py-8">
          No {activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"} available
        </div>
      );
    }

    return currentTabData.map((item: TermsData) => (
      <Section key={item.id} title={item.topic}>
        {formatDescription(item.description)}
      </Section>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="">
        <div className="max-w-[768px] flex gap-x-4">
          <TabButton
            active={activeTab === "terms"}
            onClick={() => setActiveTab("terms")}
          >
            Terms of Service
          </TabButton>
          <TabButton
            active={activeTab === "privacy"}
            onClick={() => setActiveTab("privacy")}
          >
            Privacy Policy
          </TabButton>
        </div>
      </div>

      <div className="py-8">
        {renderContent()}
      </div>
    </div>
  );
}
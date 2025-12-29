"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select } from "antd";

// Zod schema for form validation
const termsPolicySchema = z.object({
  type: z.string().min(1, "Please select a type"),
  topic: z.string().min(1, "Topic is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type TermsPolicyFormData = z.infer<typeof termsPolicySchema>;

interface PolicyItem {
  id: string;
  type: string;
  topic: string;
  description: string;
}

export default function TermsAndPolicy() {
  const [policies, setPolicies] = useState<PolicyItem[]>([
    {
      id: "1",
      type: "Terms & Condition",
      topic: "Terms & Condition",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
    },
    {
      id: "2",
      type: "Privacy Policy",
      topic: "Privacy Policy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TermsPolicyFormData>({
    resolver: zodResolver(termsPolicySchema),
  });

  const onSubmit = (data: TermsPolicyFormData) => {
    if (editingId) {
      setPolicies(
        policies.map((p) => (p.id === editingId ? { ...p, ...data } : p))
      );
      setEditingId(null);
    } else {
      const newPolicy: PolicyItem = {
        id: Date.now().toString(),
        ...data,
      };
      setPolicies([...policies, newPolicy]);
    }
    reset();
    setShowForm(false);
  };

  const handleEdit = (policy: PolicyItem) => {
    setEditingId(policy.id);
    reset(policy);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setPolicies(policies.filter((p) => p.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    reset();
  };

  return (
    <div className=" p-6">
      <div className="max-w-4xl bg-white rounded-lg  p-6 shadow-all-side">
        <div className="6 mb-6">
          <h1 className="text-2xl font-semibold mb-6">Terms & Policy</h1>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-6 py-2 rounded-md transition-colors"
            >
              Add Terms & Policy
            </button>
          )}

          {showForm && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Terms & Policy" : "Add Terms & Policy"}
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Type
                </label>
         
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        {
                          value: "Terms & Condition",
                          label: "Terms & Condition",
                        },
                        { value: "Privacy Policy", label: "Privacy Policy" },
                      ]}
                      className="w-full "
                    //   classNamePrefix="react-select"
                    size="large"
                    />
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  {...register("topic")}
                  placeholder="Enter topic"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                />
                {errors.topic && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.topic.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Write description"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-6 py-2 rounded-md transition-colors"
                >
                  {editingId ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>

        {!showForm && (
          <div className="space-y-4">
            {policies.map((policy) => (
              <div key={policy.id} className="">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{policy.topic}</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDelete(policy.id)}
                      className="text-red-500 hover:text-red-600 font-medium px-4 py-1 border border-red-500 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(policy)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-6 py-1 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

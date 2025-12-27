"use client"

import { Input } from "antd"
import type { TextAreaProps } from "antd/es/input"

import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form"

const { TextArea } = Input

interface FormTextAreaProps<T extends FieldValues> extends Omit<TextAreaProps, "name"> {
  name: FieldPath<T>
  control: Control<T>
  label?: string
  error?: string
}

export function FormTextArea<T extends FieldValues>({
  name,
  control,
  label,
  error,
  className = "",
  ...props
}: FormTextAreaProps<T>) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            {...props}
            rows={4}
            className={`rounded-lg border-gray-200 ${error ? "border-red-500" : ""} ${className}`}
            status={error ? "error" : undefined}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

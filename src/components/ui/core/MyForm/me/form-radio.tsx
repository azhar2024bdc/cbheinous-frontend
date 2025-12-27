"use client";

import { Radio, type RadioGroupProps } from "antd";
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface FormRadioProps<T extends FieldValues>
  extends Omit<RadioGroupProps, "name"> {
  name: FieldPath<T>;
  control?: Control<T>;
  label?: string;
  error?: string;
  options: Array<{ label: string; value: string }>;
}

export function FormRadio<T extends FieldValues>({
  name,
  control,
  label,
  error,
  options,
  className = "",
  ...props
}: FormRadioProps<T>) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Radio.Group {...field} {...props} className={`custom-radio-group ${className}`}>
            {options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                className="flex items-center gap-2 custom-radio"
              >
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Custom Radio Styles */}
      <style jsx global>{`
        /* Radio button checked state - change primary color */
        .custom-radio .ant-radio-checked .ant-radio-inner {
          border-color: #FFB30E !important; /* indigo-500 */
          background-color: #FFB30E !important;
        }

        /* Radio button hover state */
        .custom-radio .ant-radio-wrapper:hover .ant-radio-inner {
          border-color: #FFB30E !important;
        }

        /* Radio button inner dot */
        .custom-radio .ant-radio-checked .ant-radio-inner::after {
          background-color: #ffffff;
        }

        /* Radio button focus state */
        .custom-radio .ant-radio:focus-within .ant-radio-inner {
          border-color: #FFB30E !important;
          box-shadow: 0 0 0 3px rgba(255, 179, 14, 0.1);
        }

        /* Radio button disabled state */
        .custom-radio .ant-radio-disabled .ant-radio-inner {
          background-color: #f3f4f6 !important;
          border-color: #d1d5db !important;
        }

        /* Radio text spacing */
        .custom-radio .ant-radio-wrapper {
          margin-right: 16px;
          display: flex;
          align-items: center;
        }

        /* Radio group spacing */
        .custom-radio-group {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
"use client";

import { Checkbox, type CheckboxProps } from "antd";
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface FormCheckboxProps<T extends FieldValues>
  extends Omit<CheckboxProps, "name"> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  error?: string;
  helperText?: string;
  checkboxLabel?: string;
  primaryColor?: string;
  hoverColor?: string;
  focusColor?: string;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  //   label,
  error,
  //   helperText,
  checkboxLabel,
  primaryColor = `var-[--primary-color]`,
  hoverColor = `var-[--primary-color]`,
  focusColor = `var-[--primary-color]`,
  className = "",
  ...props
}: FormCheckboxProps<T>) {
  const uniqueId = `checkbox-${name}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  return (
    <div className="">
      {/* {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )} */}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            {...props}
            checked={field.value}
            onChange={(e) => {
              field.onChange(e.target.checked);
              props.onChange?.(e);
            }}
            className={`custom-checkbox ${uniqueId} ${className}`}
          >
            {checkboxLabel}
          </Checkbox>
        )}
      />

      {/* {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )} */}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Custom Checkbox Styles */}
      <style jsx global>{`
        /* Checkbox wrapper */
        .custom-checkbox.${uniqueId}.ant-checkbox-wrapper {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: #374151;
        }

        /* Checkbox base style */
        .custom-checkbox.${uniqueId} .ant-checkbox-inner {
          border-radius: 0.25rem;
          border: 2px solid #d1d5db;
          width: 18px;
          height: 18px;
          transition: all 0.2s ease;
        }

        /* Checkbox hover state */
        .custom-checkbox.${uniqueId}:hover .ant-checkbox-inner {
          border-color: ${hoverColor} !important;
        }

        /* Checkbox checked state */
        .custom-checkbox.${uniqueId} .ant-checkbox-checked .ant-checkbox-inner {
          background-color: ${primaryColor} !important;
          border-color: ${primaryColor} !important;
        }

        /* Checkbox checked hover state */
        .custom-checkbox.${uniqueId}:hover
          .ant-checkbox-checked
          .ant-checkbox-inner {
          background-color: ${hoverColor} !important;
          border-color: ${hoverColor} !important;
        }

        /* Checkbox focus state */
        .custom-checkbox.${uniqueId}
          .ant-checkbox:focus-within
          .ant-checkbox-inner {
          border-color: ${focusColor} !important;
          box-shadow: 0 0 0 3px ${focusColor}19;
        }

        /* Checkbox checkmark color */
        .custom-checkbox.${uniqueId}
          .ant-checkbox-checked
          .ant-checkbox-inner::after {
          border-color: #ffffff;
        }

        /* Checkbox indeterminate state */
        .custom-checkbox.${uniqueId}
          .ant-checkbox-indeterminate
          .ant-checkbox-inner::after {
          background-color: ${primaryColor} !important;
        }

        /* Checkbox disabled state */
        .custom-checkbox.${uniqueId}
          .ant-checkbox-disabled
          .ant-checkbox-inner {
          background-color: #f3f4f6 !important;
          border-color: #d1d5db !important;
        }

        .custom-checkbox.${uniqueId} .ant-checkbox-disabled + span {
          color: #9ca3af;
        }

        /* Checkbox label spacing */
        .custom-checkbox.${uniqueId} .ant-checkbox + span {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }

        /* Remove default Ant Design after pseudo element */
        .custom-checkbox.${uniqueId} .ant-checkbox-wrapper::after {
          display: none;
        }
      `}</style>
    </div>
  );
}

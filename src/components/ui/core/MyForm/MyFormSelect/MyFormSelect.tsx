/* eslint-disable no-unused-vars */

"use client";
import { Form, Select } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { SelectProps } from "antd";
import "./MyFormSelect.css";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface MyFormSelectProps {
  label?: string;
  labelClassName?: string;
  name: string;
  options?: SelectProps["options"];
  disabled?: boolean;
  mode?: "multiple" | "tags"; 
  placeHolder: string;
  className?: string;
  isSearch?: boolean;
  defaultValue?: string;
  getSelectedValue?: (newValue: any) => void;
  isLoading?: boolean;
  showValidationColor?: boolean;
}

const MyFormSelect = ({
  label,
  labelClassName,
  name,
  options,
  disabled,
  mode,
  placeHolder,
  className,
  isSearch = false,
  defaultValue,
  getSelectedValue,
  isLoading = false,
  showValidationColor = true,
}: MyFormSelectProps) => {
  const { setValue, control, formState: { touchedFields } } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
  
  useEffect(() => {
    if (getSelectedValue) {
      getSelectedValue(inputValue);
    }
  }, [inputValue, getSelectedValue]);

  useEffect(() => {
    setValue(name, defaultValue, { shouldValidate: false });
  }, [defaultValue, name, setValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error, isTouched } }) => {
        // Determine validation state
        const touched = isTouched || touchedFields[name];
        const hasError = touched && error;
        
        let isValid = false;
        if (mode) {
          // Multiple or tags mode - check if array has items
          isValid = touched && inputValue && Array.isArray(inputValue) && inputValue.length > 0 && !error;
        } else {
          // Single mode - check if value exists
          isValid = touched && inputValue !== undefined && inputValue !== null && inputValue !== "" && !error;
        }

        // Determine status for Ant Design Select
        let status: "error" | "warning" | undefined = undefined;
        if (showValidationColor) {
          if (hasError) {
            status = "error";
          } else if (isValid) {
            status = "warning"; // Ant Design uses "warning" for success-like state
          }
        }

        return (
          <div className="flex flex-col justify-center gap-1">
            {/* Label */}
            {label && (
              <p
                className={cn(
                  "ps-1 mb-1 text-[#101828] text-base font-normal leading-6",
                  labelClassName
                )}
              >
                {label}
              </p>
            )}

            {/* Ant Design Select */}
            <Form.Item style={{ marginBottom: "0px" }}>
              <Select
                mode={mode}
                style={{ width: "100%" }}
                className={cn(
                  className, 
                  "placeholder:!text-text-secondary",
                  mode ? `custom-select-${mode}` : "custom-select-single",
                  {
                    "select-success": showValidationColor && isValid,
                    "select-error": showValidationColor && hasError,
                  }
                )}
                {...field}
                ref={null}
                value={field.value ?? defaultValue}
                onChange={(value) => field.onChange(value)}
                options={options}
                size="large"
                disabled={disabled}
                placeholder={placeHolder}
                showSearch={isSearch}
                loading={isLoading}
                status={status}
                filterOption={
                  isSearch
                    ? (input, option) =>
                        (option?.label ?? "")
                          ?.toString()
                          ?.toLowerCase()
                          ?.includes(input?.toLowerCase())
                    : undefined
                }
              />

              {/* Error Message */}
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>

            {/* Custom Styles */}
            <style jsx>{`
              :global(.select-success .ant-select-selector) {
                border-color: #52c41a !important;
                box-shadow: 0 0 0 2px rgba(82, 196, 26, 0.1) !important;
              }
              
              :global(.select-success:hover .ant-select-selector),
              :global(.select-success.ant-select-focused .ant-select-selector) {
                border-color: #52c41a !important;
              }
              
              :global(.select-error .ant-select-selector) {
                border-color: #ff4d4f !important;
                box-shadow: 0 0 0 2px rgba(255, 77, 95, 0.1) !important;
              }
              
              :global(.select-error:hover .ant-select-selector),
              :global(.select-error.ant-select-focused .ant-select-selector) {
                border-color: #ff4d4f !important;
              }

              /* Selector base styles */
              :global(.custom-select-single .ant-select-selector),
              :global(.custom-select-multiple .ant-select-selector),
              :global(.custom-select-tags .ant-select-selector) {
                
                height: auto !important;
               
                display: flex !important;
                align-items: center !important;
              }
              
              :global(.custom-select-single .ant-select-selector) {
                
              }
              
              /* Selection overflow wrapper */
              :global(.custom-select-single .ant-select-selection-overflow),
              :global(.custom-select-multiple .ant-select-selection-overflow),
              :global(.custom-select-tags .ant-select-selection-overflow) {
                display: flex !important;
                align-items: center !important;
                flex-wrap: wrap !important;
                
              }
              
              /* Selected value text */
              :global(.custom-select-single .ant-select-selection-item) {
                line-height: normal !important;
                
                display: flex !important;
                align-items: center !important;
                height: 100% !important;
              }
              
              /* Tags in multiple/tags mode */
              :global(.custom-select-multiple .ant-select-selection-item),
              :global(.custom-select-tags .ant-select-selection-item) {
               
                height: 24px !important;
                line-height: 22px !important;
                display: inline-flex !important;
                align-items: center !important;
              }
              
              /* Search input */
              :global(.custom-select-single .ant-select-selection-search),
              :global(.custom-select-multiple .ant-select-selection-search),
              :global(.custom-select-tags .ant-select-selection-search) {
               
                display: flex !important;
                align-items: center !important;
              }
              
              :global(.custom-select-single .ant-select-selection-search-input) {
               
              }
              
              :global(.custom-select-multiple .ant-select-selection-search-input),
              :global(.custom-select-tags .ant-select-selection-search-input) {
                height: 24px !important;
              
              }
              
              /* Placeholder */
              :global(.custom-select-single .ant-select-selection-placeholder) {
               
                display: flex !important;
                align-items: center !important;
              }
              
              :global(.custom-select-multiple .ant-select-selection-placeholder),
              :global(.custom-select-tags .ant-select-selection-placeholder) {
                line-height: 24px !important;
               
                display: flex !important;
                align-items: center !important;
              }
              
              /* Icons */
              :global(.custom-select-single .ant-select-arrow),
              :global(.custom-select-multiple .ant-select-arrow),
              :global(.custom-select-tags .ant-select-arrow) {
                top: 50% !important;
                transform: translateY(-50%) !important;
                margin-top: 0 !important;
              }
              
              :global(.custom-select-single .ant-select-clear),
              :global(.custom-select-multiple .ant-select-clear),
              :global(.custom-select-tags .ant-select-clear) {
                top: 50% !important;
                transform: translateY(-50%) !important;
              }
            `}</style>
          </div>
        );
      }}
    />
  );
};

export default MyFormSelect;
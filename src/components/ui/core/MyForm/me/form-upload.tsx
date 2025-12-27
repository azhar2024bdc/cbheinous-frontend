"use client";

import { Upload, type UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface FormUploadProps<T extends FieldValues>
  extends Omit<UploadProps, "name"> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  error?: string;
  buttonText?: string;
}

export function FormUpload<T extends FieldValues>({
  name,
  control,
  label,
  error,
  buttonText = "Click or Drag File to Upload",
  ...props
}: FormUploadProps<T>) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="w-full">
            <Upload.Dragger
              {...props}
              fileList={field.value || []}
              onChange={(info) => field.onChange(info.fileList)}
              beforeUpload={() => false}
              className={`custom-upload-dragger ${error ? "error" : ""}`}
              showUploadList={{
                showPreviewIcon: false,
                showDownloadIcon: false,
                showRemoveIcon: true,
              }}
            >
              <div className="flex flex-col items-center justify-center py-6">
                <UploadOutlined className="text-2xl text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">{buttonText}</p>
                <p className="text-gray-400 text-xs mt-1">
                  or drag and drop files here
                </p>
              </div>
            </Upload.Dragger>

            {field.value && field.value.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {field.value.length} file(s) selected
              </div>
            )}
          </div>
        )}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Custom Global Styles */}
      <style jsx global>{`
        .custom-upload-dragger.ant-upload.ant-upload-drag {
          width: 100%;
          border: 2px dashed #d1d5db !important; /* gray-300 */
          border-radius: 0.75rem !important;
          background: #ffffff !important;
          transition: all 0.25s ease;
        }

        /* Hover state */
        .custom-upload-dragger.ant-upload.ant-upload-drag:hover {
          border-color: #6366f1 !important; /* indigo-500 */
          background: rgba(99, 102, 241, 0.03) !important;
        }

        /* Drag-over focus state */
        .custom-upload-dragger.ant-upload.ant-upload-drag.ant-upload-drag-hover {
          border-color: #4f46e5 !important; /* indigo-600 */
          background: rgba(99, 102, 241, 0.08) !important;
        }

        /* Error state */
        .custom-upload-dragger.error.ant-upload.ant-upload-drag {
          border-color: #ef4444 !important; /* red-500 */
        }

        /* Remove all pseudo-element borders */
        .custom-upload-dragger.ant-upload.ant-upload-drag::before,
        .custom-upload-dragger.ant-upload.ant-upload-drag::after {
          display: none !important;
          content: none !important;
          border: none !important;
        }

        /* Target the drag container wrapper */
        .custom-upload-dragger .ant-upload-btn {
          padding: 0 !important;
        }

        /* Center content properly */
        .custom-upload-dragger .ant-upload-drag-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.5rem 0;
        }

        /* Upload list consistency */
        .ant-upload-list-item {
          border-radius: 0.375rem;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}

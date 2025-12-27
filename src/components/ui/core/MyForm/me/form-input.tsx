"use client";

import { Input, type InputProps } from "antd";
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, "name"> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  error?: string;
  type?: "text" | "email" | "password";
  icon?: "user" | "email" | "lock";
  height?: number;
  className?: string;
}

const iconMap = {
  user: <UserOutlined className="text-gray-400" />,
  email: <MailOutlined className="text-gray-400" />,
  lock: <LockOutlined className="text-gray-400" />,
  location: <LockOutlined className="text-gray-400" />,
};

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  error,
  type = "text",
  icon,
  className = "",
  height = 12,
  ...props
}: FormInputProps<T>) {
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
        render={({ field }) => {
          if (type === "password") {
            return (
              <Input.Password
                {...field}
                {...props}
                prefix={icon ? iconMap[icon] : undefined}
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone twoToneColor="#9ca3af" />
                  ) : (
                    <EyeInvisibleOutlined className="!text-primary" />
                  )
                }
                className={`h-${height} rounded-lg border-gray-200 ${
                  error ? "border-red-500" : ""
                } ${className}`}
                status={error ? "error" : undefined}
              />
            );
          }

          return (
            <Input
              {...field}
              {...props}
              type={type}
              prefix={icon ? iconMap[icon] : undefined}
              className={`h-${height} rounded-lg border-gray-200 ${
                error ? "border-red-500" : ""
              } ${className}`}
              status={error ? "error" : undefined}
            />
          );
        }}
      />

      {/* <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error;
          const isTouched = fieldState.isTouched;
          const isValid = !hasError && isTouched;

          if (type === "password") {
            return (
              <Input.Password
                {...field}
                {...props}
                prefix={icon ? iconMap[icon] : undefined}
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone twoToneColor="#9ca3af" />
                  ) : (
                    <EyeInvisibleOutlined className="!text-primary" />
                  )
                }
                className={`h-${height} rounded-lg border ${
                  hasError
                    ? "!border-red-500"
                    : isValid
                    ? "!border-green-500"
                    : "border-gray-200"
                } ${className}`}
                // status={hasError ? "error" : isValid ? "success" : undefined}
              />
            );
          }

          return (
            <Input
              {...field}
              {...props}
              type={type}
              prefix={icon ? iconMap[icon] : undefined}
              className={`h-${height} rounded-lg border ${
                hasError
                  ? "border-red-500"
                  : isValid
                  ? "border-green-500"
                  : "border-gray-200"
              } ${className}`}
              // status={hasError ? "error" : isValid ? "success" : undefined}
            />
          );
        }}
      /> */}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

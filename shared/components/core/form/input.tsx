import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { cn } from "tailwind-variants/lite";

interface InputProps extends TextInputProps {
  label?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  error?: string;
}

export default function Input({
  label,
  leftAdornment,
  rightAdornment,
  error,
  className = "",
  ...textInputProps
}: InputProps) {
  return (
    <View className="gap-0.5">
      {label ? (
        <Text className="mb-2 text-lg font-medium text-gray-700">{label}</Text>
      ) : null}

      <View className="relative">
        {leftAdornment ? (
          <View className="absolute top-1/2 left-6 z-10 -translate-1/2">
            {leftAdornment}
          </View>
        ) : null}

        <TextInput
          className={cn(
            "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-xl placeholder:text-gray-400 focus:border-2 focus:border-teal-500 focus:outline-none",
            {
              "pl-12": !!leftAdornment,
              "pr-12": !!rightAdornment,
              "border-red-500": !!error,
            },
            className,
          )}
          {...textInputProps}
        />

        {rightAdornment ? (
          <View className="absolute top-1/2 right-0 z-10 -translate-1/2">
            {rightAdornment}
          </View>
        ) : null}
      </View>
    </View>
  );
}

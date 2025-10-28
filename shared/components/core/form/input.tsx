import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

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
    <View className="gap-1">
      {label ? (
        <Text className="mb-2 text-sm font-medium text-gray-700">{label}</Text>
      ) : null}

      <View className="relative">
        {leftAdornment ? (
          <View className="absolute top-1/2 left-6 z-10 -translate-1/2">
            {leftAdornment}
          </View>
        ) : null}

        <TextInput
          className={`w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 text-xl ${
            leftAdornment ? "pl-12" : "pl-4"
          } ${rightAdornment ? "pr-12" : "pr-4"} ${
            error ? "border-red-500" : ""
          } ${className}`}
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

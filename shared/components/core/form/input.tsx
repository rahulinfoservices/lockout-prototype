import React, { useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);

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
            "w-full rounded-xl border bg-gray-50 pt-4 pb-4 text-xl",
            isFocused ? "border-teal-500" : "border-gray-200",
            leftAdornment ? "pl-12" : "pl-4",
            rightAdornment ? "pr-12" : "pr-4",
            error && "border-red-500",
            className,
          )}
          {...textInputProps}
          onFocus={e => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
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

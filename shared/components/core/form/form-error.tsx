import { PropsWithChildren } from "react";
import { Text } from "react-native";

export default function FormError({ children }: PropsWithChildren) {
  return (
    <Text className="mt-1.5 ml-1 text-lg font-medium text-red-500">
      {children}
    </Text>
  );
}

import { Text, View } from "react-native";

export interface LabelDividerProps {
  label: string;
}

export default function LabelDivider({ label = "OR" }: LabelDividerProps) {
  return (
    <View className="flex-row items-center gap-4 py-8">
      <View className="h-0.5 flex-1 bg-gray-200" />

      <Text className="text-lg text-gray-500">{label}</Text>

      <View className="h-0.5 flex-1 bg-gray-200" />
    </View>
  );
}

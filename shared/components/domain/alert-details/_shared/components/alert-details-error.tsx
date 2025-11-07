import { Text, View } from "react-native";

export const AlertDetailsError = ({ error }: { error: string }) => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-5">
      <Text className="mb-2 text-lg font-semibold text-red-600">
        Error loading the details...
      </Text>
      <Text className="text-center text-sm text-gray-600">{error}</Text>
    </View>
  );
};

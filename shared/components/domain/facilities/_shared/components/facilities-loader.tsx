import { ActivityIndicator, Text, View } from "react-native";

export const FacilitiesLoader = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-5">
      <ActivityIndicator size="large" color="#667eea" />
      <Text className="mt-3 text-base text-gray-600">
        Loading facilities...
      </Text>
    </View>
  );
};

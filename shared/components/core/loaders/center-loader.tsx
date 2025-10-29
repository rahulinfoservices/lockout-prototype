import { ActivityIndicator, View } from "react-native";

export const CenterLoader = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#9ca3af" />
    </View>
  );
};

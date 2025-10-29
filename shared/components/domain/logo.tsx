import { Text, View } from "react-native";

export default function Logo() {
  return (
    <View className="mb-2 flex-row items-center justify-center gap-4">
      <View className="h-2 w-2 rounded-full bg-white" />

      <View className="rounded-full bg-white p-4 shadow-2xl">
        <Text className="bold text-center text-2xl text-teal-500 uppercase">
          Lockout USA
        </Text>
      </View>

      <View className="h-2 w-2 rounded-full bg-white" />
    </View>
  );
}

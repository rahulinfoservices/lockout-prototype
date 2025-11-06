import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function SchoolIdScreen() {
  const { "school-id": schoolId } = useLocalSearchParams<{
    "school-id": string;
  }>();

  return (
    <View>
      <Text>School ID: {schoolId}</Text>
    </View>
  );
}

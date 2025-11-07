import { Text, View } from "react-native";

export interface SecurityAlertDetailsProps {
  schoolId: string;
  zipCode: string;
}

export default function SecurityAlertDetails(props: SecurityAlertDetailsProps) {
  const { schoolId, zipCode } = props;

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold text-gray-800">
        {schoolId} in {zipCode}
      </Text>
    </View>
  );
}

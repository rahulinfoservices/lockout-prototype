import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { cn } from "tailwind-variants/lite";

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value: string | number;
  isLockdown ?: boolean;
};

export const MetaItem = ({ icon, value, isLockdown }: Props) => {
  if (!value) return null;

  return (
    <View className="flex-row items-center mr-4 mb-1">
      <MaterialCommunityIcons
        name={icon}
        size={14}
        color={isLockdown ? "#dc2626" : "#6b7280"}
        style={{ marginRight: 4 }}
      />
      <Text 
       className={cn("text-base font-sm text-gray-700", {
                      "text-red-800": isLockdown,
                    })}
      >
        {value}
      </Text>
    </View>
  );
};

import { Text, View } from "react-native";
import { cn } from "tailwind-variants/lite";

import { STATUS_CONFIG } from "@/shared/types/statusConfig";

type Props = {
  status?: string;
};

export const StatusBadge = ({ status }: Props) => {
  if (!status?.trim()) return null;

  const config =
    STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ||
    STATUS_CONFIG.DEFAULT;

  return (
    <View
      className={cn(
        "shrink-0 rounded-full px-3 py-1",
        config.bg
      )}
    >
      <Text className={cn("text-sm font-bold", config.text)}>
        {config.label}
      </Text>
    </View>
  );
};

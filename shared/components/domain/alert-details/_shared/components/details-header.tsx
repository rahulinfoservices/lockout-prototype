import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { styled } from "nativewind";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { cn } from "tailwind-variants/lite";

import { useAlertStore } from "@/shared/stores/use-alert-store";
import { AlertCategory } from "@/shared/types/alert";
import { Facility } from "@/shared/types/facility";

interface DetailsHeaderProps {
  facilty: Facility;
  alertCategory?: AlertCategory;
}

const ChevronLeftIcon = styled(ArrowLeft);

export const DetailsHeader = (props: DetailsHeaderProps) => {
  const { facilty, alertCategory } = props;
  const router = useRouter();
  const alert = useAlertStore(state =>
    alertCategory === "ALERTS" ? state.securityAlert : state.deviceHealthAlert,
  );

  const getStatusText = useCallback(() => {
    if (alertCategory === "ALERTS") {
      if (alert?.alertType === "full_lockdown_mode") return "FULL LOCKDOWN";
      if (alert?.alertType === "all_clear") return "ALL CLEAR";
    } else {
      if (alert?.deviceHealth === "Online") return "ONLINE";
      if (alert?.deviceHealth === "LowBat") return "LOW BATTERY";
      if (alert?.deviceHealth === "Offline") return "OFFLINE";
    }
  }, [alert?.alertType, alert?.deviceHealth, alertCategory]);

  const getStatusColor = useCallback(() => {
    if (alertCategory === "ALERTS") {
      if (alert?.alertType === "full_lockdown_mode") return "danger";
      if (alert?.alertType === "all_clear") return "success";
    } else {
      if (alert?.deviceHealth === "Online") return "success";
      if (alert?.deviceHealth === "LowBat") return "warning";
      if (alert?.deviceHealth === "Offline") return "danger";
    }
  }, [alert?.alertType, alert?.deviceHealth, alertCategory]);

  const onBack = useCallback(() => {
    if (alertCategory === "ALERTS") {
      router.dismissTo("/security-alerts");
    } else {
      router.dismissTo("/device-health");
    }
  }, [alertCategory, router]);

  return (
    <View className="mt-2.5 mb-1 px-4">
      <View className="flex-row items-center justify-between">
        {/* Left: Back Button */}
        <Pressable className="py-2" onPress={onBack}>
          <ChevronLeftIcon className="text-gray-700" size={24} />
        </Pressable>

        {/* Center: Facility Info */}
        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold text-gray-800">
            {facilty.name || "Unknown Facility"}
          </Text>
          <Text className="text-sm text-gray-600">
            {facilty.district || "Unknown District"} • {facilty.zip || ""}
          </Text>
        </View>

        {/* Right: Status Badge */}
        <View
          className={cn("rounded-full px-3 py-1.5", {
            "bg-red-100": getStatusColor() === "danger",
            "bg-yellow-100": getStatusColor() === "warning",
            "bg-green-100": getStatusColor() === "success",
          })}
        >
          <Text
            className={cn("text-sm font-semibold", {
              "text-red-700": getStatusColor() === "danger",
              "text-yellow-700": getStatusColor() === "warning",
              "text-green-700": getStatusColor() === "success",
            })}
          >
            {getStatusText()}
          </Text>
        </View>
      </View>
    </View>
  );
};

import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { styled } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "tailwind-variants/lite";

import { AlertCategory } from "@/shared/types/alert";
import { Facility } from "@/shared/types/facility";

interface DetailsHeaderProps {
  facilty: Facility;
  status?: string; // optional status prop
  alertCategory?: AlertCategory;
}

const ChevronLeftIcon = styled(ArrowLeft);

export const DetailsHeader = (props: DetailsHeaderProps) => {
  const { facilty, status = "active" } = props;
  const router = useRouter();

  const isOnline = status === "Online";
  const isLowBattery = status === "LowBat";
  const isOffline = status === "Offline";
  const isAlert = status === "full_lockdown_mode";
  const isAllclear = status === "all_clear";

  const statusText = (() => {
    if (isAlert) return "FULL LOCKDOWN";
    if (isOffline) return "OFFLINE";
    if (isLowBattery) return "LOW BATTERY";
    if (isOnline) return "ONLINE";
    if (isAllclear) return "ALL CLEAR";
    return ""; // fallback if none match
  })();
  return (
    <View className="px-1 pb-1">
      <View
        style={{
          marginTop: 10,
        }}
      >
        <View className="flex-row items-center justify-between">
          {/* Left: Back Button */}
          <TouchableOpacity
            className="rounded-lg p-3"
            onPress={() => router.back()}
          >
            <ChevronLeftIcon className="text-gray-700" size={24} />
          </TouchableOpacity>

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
              "bg-red-100": isOffline || isAlert,
              "bg-yellow-100": isLowBattery,
              "bg-green-100": isOnline || isAllclear,
            })}
          >
            <Text
              className={cn("text-sm font-semibold", {
                "text-red-700": isOffline || isAlert,
                "text-yellow-700": isLowBattery,
                "text-green-700": isOnline || isAllclear,
              })}
            >
              {statusText}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

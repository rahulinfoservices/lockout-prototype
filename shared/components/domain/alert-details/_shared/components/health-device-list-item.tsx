import { Text, View } from "react-native";
import { cn } from "tailwind-variants/lite";

import { NullableSecurityAlert } from "@/shared/types/alert";
import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";

export interface HealthDeviceListItemProps {
  item: DeviceDetails;
  alert: NullableSecurityAlert;
  zone: ZoneDetails;
  room: RoomDetails;
}

export const HealthDeviceListItem = (props: HealthDeviceListItemProps) => {
  const { item, alert, zone, room } = props;
  const isDeviceIdSame = alert?.deviceId === item.deviceId;
  const isOnline =
    !alert?.deviceHealth || alert.deviceHealth === "Online" || !isDeviceIdSame;
  const isLowBattery = alert?.deviceHealth === "LowBat" && isDeviceIdSame;
  const isOffline = alert?.deviceHealth === "Offline" && isDeviceIdSame;

  return (
    <View className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-800">
          Device #{item.deviceId}
        </Text>

        <View
          className={cn("rounded-full px-3 py-1.5", {
            "bg-red-100": isOffline,
            "bg-yellow-100": isLowBattery,
            "bg-green-100": isOnline,
          })}
        >
          <Text
            className={cn("text-sm font-semibold", {
              "text-red-700": isOffline,
              "text-yellow-700": isLowBattery,
              "text-green-700": isOnline,
            })}
          >
            {isOffline ? "OFFLINE" : isLowBattery ? "LOW BATTERY" : "ONLINE"}
          </Text>
        </View>
      </View>

      <View className="mb-2 flex-row items-center gap-2">
        <Text className="text-sm text-gray-600">{zone.name}</Text>
        <Text className="text-sm text-gray-400">•</Text>
        <Text className="text-sm text-gray-600">{room.name}</Text>
      </View>
    </View>
  );
};

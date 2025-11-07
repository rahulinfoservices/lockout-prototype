import { Text, View } from "react-native";
import { cn } from "tailwind-variants/lite";

import { NullableSecurityAlert } from "@/shared/types/alert";
import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";

export interface AlertDeviceListItemProps {
  item: DeviceDetails;
  zone: ZoneDetails;
  room: RoomDetails;
  alert: NullableSecurityAlert;
}

export const AlertDeviceListItem = (props: AlertDeviceListItemProps) => {
  const { item, alert, zone, room } = props;

  const isAlert =
    alert?.alertType === "full_lockdown_mode" &&
    item.deviceId === alert.deviceId;

  return (
    <View className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-800">
          Device #{item.deviceId}
        </Text>

        <View
          className={cn("rounded-full px-3 py-1.5", {
            "bg-red-100": isAlert,
            "bg-green-100": !isAlert,
          })}
        >
          <Text
            className={cn("text-sm font-semibold", {
              "text-red-700": isAlert,
              "text-green-700": !isAlert,
            })}
          >
            {isAlert ? "LOCKDOWN" : "ALL CLEAR"}
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

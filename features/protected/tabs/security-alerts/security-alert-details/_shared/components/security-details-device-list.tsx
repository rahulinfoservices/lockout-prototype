import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";
import { useCallback } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { cn } from "tailwind-variants/lite";

export interface SecurityDetailsDeviceListProps {
  devices: DeviceDetails[];
  zone: ZoneDetails;
  room: RoomDetails;
}

export const SecurityDetailsDeviceList = (
  props: SecurityDetailsDeviceListProps,
) => {
  const { devices, zone, room } = props;

  const renderHeader = () => {
    return (
      <Text className="mb-4 text-2xl font-semibold text-gray-800">
        Devices ({devices.length})
      </Text>
    );
  };

  const renderItem: ListRenderItem<DeviceDetails> = useCallback(({ item }) => {
    const isAlert = item.securityStatus === "full_lockdown_mode";
    const isSecure = item.securityStatus === "all_clear";

    return (
      <View className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-800">
            Device #{item.deviceId}
          </Text>

          <View
            className={cn("rounded-full px-3 py-1.5", {
              "bg-red-100": isAlert,
              "bg-green-100": isSecure,
            })}
          >
            <Text
              className={cn("text-sm font-semibold", {
                "text-red-700": isAlert,
                "text-green-700": isSecure,
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
  }, []);

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      renderItem={renderItem}
      data={devices}
      keyExtractor={device => device.deviceId}
      ListEmptyComponent={
        <View className="rounded-xl border border-gray-200 bg-white p-6">
          <Text className="text-center text-gray-500">No devices found</Text>
        </View>
      }
      contentContainerClassName="mx-3 my-5 bg-white p-4 rounded-3xl shadow-sm"
    />
  );
};

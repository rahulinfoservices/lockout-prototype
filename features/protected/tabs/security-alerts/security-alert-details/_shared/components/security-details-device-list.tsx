import { useGetAlert } from "@/shared/hooks/use-get-security-alert";
import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";
import { useCallback, useEffect } from "react";
import { Alert, FlatList, ListRenderItem, Text, View } from "react-native";
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
  const { alert, error: alertError } = useGetAlert("ALERTS");

  const renderHeader = () => {
    return (
      <Text className="mb-4 text-2xl font-semibold text-gray-800">
        Devices ({devices.length})
      </Text>
    );
  };

  const renderItem: ListRenderItem<DeviceDetails> = useCallback(
    ({ item }) => {
      const isAlert =
        alert?.alertType === "full_lockdown_mode" &&
        item.deviceId === alert.deviceId;

      console.log(alert, item);

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
    },
    [alert],
  );

  useEffect(() => {
    if (alertError) {
      // Fade out card
      Alert.alert(
        "Oops!",
        `There seems to be an issue fetching security alert details. ${alertError}`,
      );
    }
  }, [alertError]);

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

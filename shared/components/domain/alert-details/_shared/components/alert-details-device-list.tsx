import { useCallback, useEffect } from "react";
import { Alert, FlatList, ListRenderItem, Text, TouchableOpacity, View } from "react-native";
import { cn } from "tailwind-variants/lite";

import { useGetAlert } from "@/shared/hooks/use-get-security-alert";
import { AlertCategory } from "@/shared/types/alert";
import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";
import { Download } from "lucide-react-native";

export interface AlertDetailsDeviceListProps {
  devices: DeviceDetails[];
  zone: ZoneDetails;
  room: RoomDetails;
  alertCategory: AlertCategory;
}

export const AlertDetailsDeviceList = (props: AlertDetailsDeviceListProps) => {
  const { devices, zone, room, alertCategory } = props;
  const { alert, error: alertError } = useGetAlert(alertCategory);

  
const renderHeader = () => {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Text className="text-2xl font-semibold text-gray-800">
        Devices ({devices.length})
      </Text>

      {alertCategory != "ALERTS" && (
        <TouchableOpacity>
          <Download size={24} className="text-gray-600" />
        </TouchableOpacity>
      )}
    </View>
  );
};

  const renderAlertItem: ListRenderItem<DeviceDetails> = useCallback(
    ({ item , index}) => {
      const isAlert =
        alert?.alertType === "full_lockdown_mode" &&
        item.deviceId === alert.deviceId;

        const position = index + 1;

      return (
        <View className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-800">
              Device {position} : {item.deviceId}
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
    [alert?.alertType, alert?.deviceId, room.name, zone.name],
  );

  const renderDeviceItem: ListRenderItem<DeviceDetails> = useCallback(
    ({ item , index}) => {
      const isDeviceIdSame = alert?.deviceId === item.deviceId;
      const isOnline =
        !alert?.deviceHealth ||
        alert.deviceHealth === "Online" ||
        !isDeviceIdSame;
      const isLowBattery = alert?.deviceHealth === "LowBat" && isDeviceIdSame;
      const isOffline = alert?.deviceHealth === "Offline" && isDeviceIdSame;
      const position = index + 1;

      return (
        <View className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-800">
              Device {position} : {item.deviceId}
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
                {isOffline
                  ? "OFFLINE"
                  : isLowBattery
                    ? "LOW BATTERY"
                    : "ONLINE"}
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
    [alert?.deviceHealth, alert?.deviceId, room.name, zone.name],
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
      renderItem={
        alertCategory === "ALERTS" ? renderAlertItem : renderDeviceItem
      }
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

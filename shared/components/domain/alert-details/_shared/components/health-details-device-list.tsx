import { useCallback, useEffect } from "react";
import { Alert, FlatList, ListRenderItem, Text, View } from "react-native";

import { useGetAlert } from "@/shared/hooks/use-get-security-alert";
import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";

import { HealthDeviceListItem } from "./health-device-list-item";

export interface HealthDetailsDeviceListProps {
  devices: DeviceDetails[];
  zone: ZoneDetails;
  room: RoomDetails;
}

export const HealthDetailsDeviceList = (
  props: HealthDetailsDeviceListProps,
) => {
  const { devices, zone, room } = props;
  const { alert, error: alertError } = useGetAlert("TELEMETRY");

  const renderHeader = () => {
    return (
      <Text className="mb-4 text-2xl font-semibold text-gray-800">
        Devices ({devices.length})
      </Text>
    );
  };

  const renderDeviceItem: ListRenderItem<DeviceDetails> = useCallback(
    ({ item }) => {
      return (
        <HealthDeviceListItem
          item={item}
          alert={alert}
          zone={zone}
          room={room}
        />
      );
    },
    [alert, room, zone],
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
      renderItem={renderDeviceItem}
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

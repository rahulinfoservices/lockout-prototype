import { useCallback, useEffect } from "react";
import { Alert, FlatList, ListRenderItem, Text, View } from "react-native";

import { useAlertStore } from "@/shared/stores/use-alert-store";
import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";

import { getSortedDeviceListByDeviceHealth } from "../utils/sort-device-list";
import { HealthDeviceListItem } from "./health-device-list-item";

export interface HealthDetailsDeviceListProps {
  devices: DeviceDetails[];
  zone: ZoneDetails;
  room: RoomDetails;
  renderHeader: () => React.JSX.Element;
}

export const HealthDetailsDeviceList = (
  props: HealthDetailsDeviceListProps,
) => {
  const { devices, zone, room, renderHeader } = props;
  const alert = useAlertStore(state => state.deviceHealthAlert);
  const alertError = useAlertStore(state => state.deviceHealthError);
  const deviceList = getSortedDeviceListByDeviceHealth(devices, alert);

  const renderDeviceItem: ListRenderItem<DeviceDetails> = useCallback(
    ({ item, index }) => {
      return (
        <HealthDeviceListItem
          item={item}
          alert={alert}
          zone={zone}
          room={room}
          position={index + 1}
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
      data={deviceList}
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

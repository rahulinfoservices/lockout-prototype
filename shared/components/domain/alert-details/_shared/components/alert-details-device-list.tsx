import { useCallback, useEffect } from "react";
import { Alert, FlatList, ListRenderItem, Text, View } from "react-native";

import { useAlertStore } from "@/shared/stores/use-alert-store";
import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";

import { getSortedDeviceListByAlertType } from "../utils/sort-device-list";
import { AlertDeviceListItem } from "./alert-device-list-item";

export interface AlertDetailsDeviceListProps {
  devices: DeviceDetails[];
  zone: ZoneDetails;
  room: RoomDetails;
  renderHeader: () => React.JSX.Element;
}

export const AlertDetailsDeviceList = (props: AlertDetailsDeviceListProps) => {
  const { devices, zone, room, renderHeader } = props;
  const alert = useAlertStore(state => state.securityAlert);
  const alertError = useAlertStore(state => state.securityError);
  const deviceList = getSortedDeviceListByAlertType(devices, alert);

  const renderAlertItem: ListRenderItem<DeviceDetails> = useCallback(
    ({ item, index }) => {
      return (
        <AlertDeviceListItem
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
      renderItem={renderAlertItem}
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

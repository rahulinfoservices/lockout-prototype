import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";
import { useCallback } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";

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
    return <Text>{item.deviceId}</Text>;
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

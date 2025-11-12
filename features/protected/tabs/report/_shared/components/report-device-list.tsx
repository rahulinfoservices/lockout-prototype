import React from "react";
import { FlatList, View } from "react-native";

import { ReportDeviceCard, ReportDeviceItem } from "./report-device-card";

interface DeviceListProps {
  devices: ReportDeviceItem[];
}

export const ReportDeviceList = ({ devices }: DeviceListProps) => {
  return (
    <View className="flex-1">
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ReportDeviceCard device={item} />}
        contentContainerStyle={{ paddingBottom: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

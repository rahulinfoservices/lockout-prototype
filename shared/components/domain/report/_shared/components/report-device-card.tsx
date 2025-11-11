import React from "react";
import { Text, View } from "react-native";

export type DeviceItem = {
  id: string;
  name: string;
  type: string;
  facility: string;
  location: string;
  address: string;
  time: string;
  status: "Online" | "Offline" | "Low Battery" | "Warning";
};

interface DeviceCardProps {
  device: DeviceItem;
}

export const DeviceCard = ({ device }: DeviceCardProps) => {
  // Status color mapping
  const statusColor =
    device.status === "Online"
      ? "bg-green-100 text-green-800"
      : device.status === "Offline"
        ? "bg-red-100 text-red-800"
        : "bg-yellow-100 text-yellow-800";

  return (
    <View className="bg-white rounded-xl border border-gray-300 overflow-hidden mb-4">
      {/* Header: Device ID + Status */}
      <View className="flex-row justify-between items-center bg-gray-100 px-5 py-3 border-b border-gray-200">
        <Text className="font-semibold text-gray-700 text-lg">{device.id}</Text>
        <Text
          className={`px-3 py-1 rounded-full ${statusColor} text-sm font-semibold`}
        >
          {device.status.toUpperCase()}
        </Text>
      </View>

      {/* Device Details */}
      <View className="px-5 py-4 space-y-3">
        <View className="flex-row">
          <Text className="w-32 text-gray-700 font-semibold">Device Name:</Text>
          <Text className="text-gray-800">{device.name}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-32 text-gray-700 font-semibold">Device Type:</Text>
          <Text className="text-gray-800">{device.type}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-32 text-gray-700 font-semibold">Facility:</Text>
          <Text className="text-gray-800">{device.facility}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-32 text-gray-700 font-semibold">Location:</Text>
          <Text className="text-gray-800">{device.location}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-32 text-gray-700 font-semibold">Address:</Text>
          <Text className="text-gray-800">{device.address}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-32 text-gray-700 font-semibold">Time:</Text>
          <Text className="text-gray-800">{device.time}</Text>
        </View>
      </View>

    </View>
  );
};

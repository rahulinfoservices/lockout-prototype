import React from "react";
import { Text, View } from "react-native";

export type ReportDeviceItem = {
  id: string;
  type: string;
  facility: string;
  location: string;
  address: string;
  time: string;
  status: "Online" | "Offline" | "Low Battery" | "Warning";
};

interface ReportDeviceCardProps {
  device: ReportDeviceItem;
}

export const ReportDeviceCard = ({ device }: ReportDeviceCardProps) => {
  // Status color mapping
  const statusColor =
    device.status === "Online"
      ? "bg-green-100 text-green-800"
      : device.status === "Offline"
        ? "bg-red-100 text-red-800"
        : "bg-yellow-100 text-yellow-800";

  return (
    <View className="mb-4 overflow-hidden rounded-xl border border-gray-300 bg-white">
      {/* Header: Device ID + Status */}
      <View className="flex-row items-center justify-between border-b border-gray-200 bg-gray-100 px-5 py-3">
        <Text className="text-lg font-semibold text-gray-700">{device.id}</Text>
        <Text
          className={`rounded-full px-3 py-1 ${statusColor} text-sm font-semibold`}
        >
          {device.status ? device.status.toUpperCase() : "UNKNOWN"}
        </Text>
      </View>

      {/* Device Details */}
      <View className="space-y-3 px-5 py-4 pr-6">
       
        <View className="flex-row">
          <Text className="w-32 font-semibold text-gray-700">Device Type:</Text>
          <Text className="flex-1 text-gray-800">{device.type}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-32 font-semibold text-gray-700">Facility:</Text>
          <Text className="flex-1 text-gray-800">{device.facility}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-32 font-semibold text-gray-700">Location:</Text>
          <Text className="flex-1 text-gray-800">{device.location}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-32 font-semibold text-gray-700">Address:</Text>
          <Text className="flex-1 text-gray-800">{device.address}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-32 font-semibold text-gray-700">Time:</Text>
          <Text className="flex-1 text-gray-800">{device.time}</Text>
        </View>
      </View>
    </View>
  );
};

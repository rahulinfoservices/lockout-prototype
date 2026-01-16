import { Shield, X } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Modal,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ReportDeviceItem } from "@/shared/types/report";

import { ReportDeviceCard } from "./report-device-card";

interface DownloadModalProps {
  visible: boolean;
  onClose: () => void;
  devices: ReportDeviceItem[];
  generatedDate: string;
  title: string;
}

export const DownloadModal = ({
  visible,
  onClose,
  devices,
  generatedDate,
  title,
}: DownloadModalProps) => {
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 24 : 44;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* Background dim */}
      <View className="absolute inset-0 bg-black/30" />

      {/* Modal Content */}
      <View
        style={{
          flex: 1,
          paddingTop: statusBarHeight + 10,
          paddingBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        <View className="flex-1 overflow-hidden rounded-2xl bg-white">
          {/* Top Header */}
          <View className="rounded-t-2xl bg-teal-500/90 px-4 py-2">
            {/* Top Right: Close + Download */}
            <View className="mb-1 flex-row justify-end space-x-4">
              <TouchableOpacity onPress={onClose}>
                <X size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Text + Shield on the same row */}
            <View className="flex-row items-center justify-between">
              {/* Left: Text */}
              <View>
                <Text className="text-4xl font-extrabold text-white">
                  LockOut USA
                </Text>
                <Text className="mt-1 text-sm font-semibold text-white">
                  Security System
                </Text>
              </View>

              {/* Right: Shield */}
              <Shield size={40} color="white" />
            </View>
            {/* White 1px Separator */}
            <View className="mt-4 border-t border-white" />
            <View className="mt-4 mb-4 flex-row items-center justify-between">
              {/* Left: Text */}
              <View>
                <Text className="text-3xl font-extrabold text-white">
                  Critical Devices Report{" "}
                </Text>
                <Text className="mt-1 text-sm font-semibold text-white">
                  Generated on {generatedDate}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-1">
            {/* Divider */}
            <View className="h-px bg-gray-200" />

            {/* Content */}
            <View className="flex-1 px-4 pt-4">
              <Text className="mb-4 text-2xl font-bold text-black">
                Device Details ({devices.length})
              </Text>

              {/* Device Cards */}
              <FlatList
                data={devices}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <ReportDeviceCard device={item} />}
                contentContainerStyle={{ paddingBottom: 16, gap: 16 }} // spacing between items
                showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: -4 }} // optional: slight negative margin for alignment
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

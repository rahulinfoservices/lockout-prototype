import { Shield, X } from "lucide-react-native";
import React from "react";
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


export type ReportModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  systemName?: string;
  systemSubtitle?: string;
};


export const ReportModalHeader = ({
  title,
  subtitle,
  onClose,
  showCloseButton = true,
  systemName = "LockOut USA",
  systemSubtitle = "Security System",
}: ReportModalProps) => {
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 24 : 44;

  return (
    <View
      style={{
        paddingTop: statusBarHeight,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: "#14B8A6",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
    >
      {/* Top Right Close Button */}
      {showCloseButton && onClose && (
        <View className="mb-2 flex-row justify-end">
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* System Name + Shield */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            className="text-4xl font-extrabold text-white"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {systemName}
          </Text>
          <Text
            className="mt-1 text-sm font-semibold text-white"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {systemSubtitle}
          </Text>
        </View>
        <Shield size={40} color="white" />
      </View>

      {/* Separator */}
      <View className="mt-4 border-t border-white" />

      {/* Title + Shield */}
      <View className="mt-4 mb-2 flex-row items-center justify-between">
        <View>
          {title && (
            <Text className="text-2xl font-extrabold text-white">{title}</Text>
          )}
          {subtitle && (
            <Text className="mt-1 text-sm font-semibold text-white">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

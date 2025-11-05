import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { cn } from "tailwind-variants/lite";

import { FacilityWithDevices } from "@/shared/types/facility";

interface FacilityDeviceCardProps {
  item: FacilityWithDevices;
  onPress?: () => void;
}

export const FacilityDeviceCard = ({
  item,
  onPress,
}: FacilityDeviceCardProps) => {
  const hasCriticalIssue = item.hasTampered;
  const hasWarning = item.hasLowBattery && !item.hasTampered;

  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (hasCriticalIssue) {
      // Pulsing animation for tampered devices
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );

      scale.value = withRepeat(
        withSequence(
          withTiming(1.02, {
            duration: 800,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    }
  }, [hasCriticalIssue, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!hasCriticalIssue) return {};

    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  // Count devices by status
  const tamperedCount = item.devices.filter(
    d => d.status === "Tampered",
  ).length;
  const lowBatteryCount = item.devices.filter(
    d => d.status === "Low Battery",
  ).length;
  const onlineCount = item.devices.filter(d => d.status === "Online").length;

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        className={cn(
          "mb-3 rounded-xl border p-4 shadow-sm active:opacity-70",
          {
            "border-red-500 bg-red-50 shadow-md": hasCriticalIssue,
            "border-yellow-500 bg-yellow-50 shadow-sm": hasWarning,
            "border-gray-200 bg-white shadow-sm": !item.hasIssues,
          },
        )}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View className="mb-2 flex-row items-center justify-between">
          <Text
            className={cn("text-xl font-semibold text-gray-800", {
              "text-xl font-bold text-red-800": hasCriticalIssue,
              "text-xl font-semibold text-yellow-800": hasWarning,
            })}
          >
            {item.name}
          </Text>

          {hasCriticalIssue ? (
            <View className="rounded-full bg-red-500 px-3 py-1">
              <Text className="text-sm font-bold text-white">TAMPERED</Text>
            </View>
          ) : hasWarning ? (
            <View className="rounded-full bg-yellow-500 px-3 py-1">
              <Text className="text-sm font-bold text-white">LOW BATTERY</Text>
            </View>
          ) : (
            <View className="rounded-full bg-green-500 px-3 py-1">
              <Text className="text-sm font-bold text-white">ALL CLEAR</Text>
            </View>
          )}
        </View>

        <View className="mb-3 flex-row flex-wrap items-center gap-3">
          <View
            className={cn("rounded-full px-3 py-1", {
              "bg-red-100": hasCriticalIssue,
              "bg-yellow-100": hasWarning,
              "bg-blue-50": !item.hasIssues,
            })}
          >
            <Text
              className={cn("text-base font-medium text-blue-700", {
                "text-red-800": hasCriticalIssue,
                "text-yellow-800": hasWarning,
              })}
            >
              {item.zip}
            </Text>
          </View>

          {item.district ? (
            <View
              className={cn("rounded-full px-3 py-1", {
                "bg-red-100": hasCriticalIssue,
                "bg-yellow-100": hasWarning,
                "bg-cyan-50": !item.hasIssues,
              })}
            >
              <Text
                className={cn("text-base font-medium text-cyan-700", {
                  "text-red-800": hasCriticalIssue,
                  "text-yellow-800": hasWarning,
                })}
              >
                {item.district}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Device Status Summary */}
        <View className="flex-row flex-wrap items-center gap-2">
          <View className="flex-row items-center gap-1">
            <View className="h-2 w-2 rounded-full bg-green-500" />
            <Text className="text-sm font-medium text-gray-700">
              {onlineCount} Online
            </Text>
          </View>

          {lowBatteryCount > 0 ? (
            <View className="flex-row items-center gap-1">
              <View className="h-2 w-2 rounded-full bg-yellow-500" />
              <Text className="text-sm font-medium text-yellow-700">
                {lowBatteryCount} Low Battery
              </Text>
            </View>
          ) : null}

          {tamperedCount > 0 ? (
            <View className="flex-row items-center gap-1">
              <View className="h-2 w-2 rounded-full bg-red-500" />
              <Text className="text-sm font-medium text-red-700">
                {tamperedCount} Tampered
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
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

import { Facility } from "@/shared/types/facility";

interface FacilityCardProps {
  item: Facility;
  status?: string;
}

export const FacilityCard = ({ item, status }: FacilityCardProps) => {
  const router = useRouter();
  const isLockdown = status === "LOCKDOWN";
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const onPress = useCallback(() => {
    router.push(`/security-alerts/${item.id}`);
  }, [item.id, router]);

  useEffect(() => {
    if (isLockdown) {
      // Pulsing animation
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );

      // Subtle scale animation
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
  }, [isLockdown, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!isLockdown) return {};

    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        className={cn(
          "mb-3 rounded-xl border p-4 shadow-sm active:opacity-70",
          {
            "border-red-500 bg-red-50 shadow-md": isLockdown,
            "border-gray-200 bg-white shadow-sm": !isLockdown,
          },
        )}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View className="mb-2 flex-row items-center justify-between">
          <Text
            className={cn("text-xl font-semibold text-gray-800", {
              "text-xl font-bold text-red-800": isLockdown,
            })}
          >
            {item.name}
          </Text>
          {isLockdown ? (
            <View className="rounded-full bg-red-500 px-3 py-1">
              <Text className="text-sm font-bold text-white">LOCKDOWN</Text>
            </View>
          ) : (
            <View className="rounded-full bg-gray-200 px-3 py-1">
              <Text className="text-sm font-bold text-gray-800">All Clear</Text>
            </View>
          )}
        </View>

        <View className="flex-row flex-wrap items-center gap-3">
          <View
            className={cn("rounded-full px-3 py-1", {
              "bg-red-100": isLockdown,
              "bg-blue-50": !isLockdown,
            })}
          >
            <Text
              className={cn("text-base font-medium text-blue-700", {
                "text-red-800": isLockdown,
              })}
            >
              {item.zip}
            </Text>
          </View>

          {item.district ? (
            <View
              className={cn("rounded-full px-3 py-1", {
                "bg-cyan-50": !isLockdown,
                "bg-red-100": isLockdown,
              })}
            >
              <Text
                className={cn("text-base font-medium text-cyan-700", {
                  "text-red-800": isLockdown,
                })}
              >
                {item.district}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

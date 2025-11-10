import { formatDistanceToNow } from "date-fns";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { cn } from "tailwind-variants/lite";

import { SecurityAlert } from "@/shared/types/alert";
import { Facility } from "@/shared/types/facility";

interface FacilityCardProps {
  item: Facility;
  status?: SecurityAlert["alertType"];
  statusUpdatedAt: Date;
  error?: string;
}

export const FacilityCard = ({
  item,
  status,
  statusUpdatedAt,
  error,
}: FacilityCardProps) => {
  const router = useRouter();
  const isLockdown = status === "full_lockdown_mode";
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const timeAgo = formatDistanceToNow(new Date(statusUpdatedAt), {
    addSuffix: true, // adds "ago" to the end
  });

  const onPress = useCallback(() => {
    router.push({
      pathname: `/security-alerts/[school-id]`,
      params: { "school-id": item.schoolId, zipCode: item.zip },
    });
  }, [item.schoolId, item.zip, router]);

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

  useEffect(() => {
    if (error) {
      // Fade out card
      Alert.alert(
        "Oops!",
        `There seems to be an issue fetching security alerts for ${item.name}. ${error}`,
      );
    }
  }, [error, item.name]);

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
        <Text className="mb-1 w-full text-base text-gray-500">
          Updated {timeAgo}
        </Text>

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
            <View className="rounded-full bg-green-100 px-3 py-1">
              <Text className="text-sm font-bold text-green-700">
                All Clear
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row flex-wrap items-center gap-3">
          <View
            className={cn("rounded-full px-3 py-1", {
              "bg-red-100": isLockdown,
              "bg-gray-100": !isLockdown,
            })}
          >
            <Text
              className={cn("text-base font-medium text-gray-700", {
                "text-red-800": isLockdown,
              })}
            >
              {item.zip}
            </Text>
          </View>

          {item.district ? (
            <View
              className={cn("rounded-full px-3 py-1", {
                "bg-gray-100": !isLockdown,
                "bg-red-100": isLockdown,
              })}
            >
              <Text
                className={cn("text-base font-medium text-gray-700", {
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

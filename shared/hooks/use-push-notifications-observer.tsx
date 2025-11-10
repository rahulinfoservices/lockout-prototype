import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";

import { SecurityAlert } from "../types/alert";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
    lockScreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    enableVibration: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Request permissions
export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowCriticalAlerts: true,
    },
  });
  return status === "granted";
};

export const configureAndroidChannels = async () => {
  if (Platform.OS !== "android") return;

  // Security alerts
  await Notifications.setNotificationChannelAsync("security-full-lockdown", {
    name: "Security: Full Lockdown",
    importance: Notifications.AndroidImportance.MAX,
    sound: "full_lockdown.wav",
  });

  await Notifications.setNotificationChannelAsync("security-all-clear", {
    name: "Security: All Clear",
    importance: Notifications.AndroidImportance.MAX,
    sound: "all_clear.wav",
  });

  // Device health
  await Notifications.setNotificationChannelAsync("device-online", {
    name: "Device Health: Online",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "online.wav",
  });

  await Notifications.setNotificationChannelAsync("device-offline", {
    name: "Device Health: Offline",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "offline.wav",
  });

  await Notifications.setNotificationChannelAsync("device-low-battery", {
    name: "Device Health: Low Battery",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "low_battery.wav",
  });
};

export const usePushNotificationsObserver = () => {
  const redirect = useCallback((notification: Notifications.Notification) => {
    if (notification.request.content.data.alert) {
      const alert = notification.request.content.data.alert as SecurityAlert;
      router.push({
        pathname: `/security-alerts/[school-id]`,
        params: { "school-id": alert.schoolId, zipCode: alert.zipCode },
      });
    } else {
      const telemetry = notification.request.content.data
        .telemetry as SecurityAlert;
      router.push({
        pathname: `/device-health/[school-id]`,
        params: { "school-id": telemetry.schoolId, zipCode: telemetry.zipCode },
      });
    }
  }, []);

  useEffect(() => {
    configureAndroidChannels();
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        redirect(response.notification);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [redirect]);
};

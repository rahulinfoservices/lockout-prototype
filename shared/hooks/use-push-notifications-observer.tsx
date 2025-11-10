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

  const common = {
    importance: Notifications.AndroidImportance.MAX,
    enableLights: true,
    vibrationPattern: [0, 250, 250, 250],
    enableVibrate: true,
    bypassDnd: true,
  };

  // Security alerts
  await Notifications.setNotificationChannelAsync("security-full-lockdown", {
    name: "Security: Full Lockdown",
    sound: "full_lockdown.wav",
    lightColor: "#FF0000",
    description: "This is a full lockdown alert",
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    groupId: "security-alerts",
    ...common,
  });

  await Notifications.setNotificationChannelAsync("security-all-clear", {
    name: "Security: All Clear",
    sound: "all_clear.wav",
    lightColor: "#00FF00",
    description: "This is an all clear alert",
    groupId: "security-alerts",
    ...common,
  });

  // Device health
  await Notifications.setNotificationChannelAsync("device-online", {
    name: "Device Health: Online",
    sound: "online.wav",
    lightColor: "#00FF00",
    description: "Device is online",
    groupId: "device-health",
    ...common,
  });

  await Notifications.setNotificationChannelAsync("device-offline", {
    name: "Device Health: Offline",
    sound: "offline.wav",
    lightColor: "#FF0000",
    description: "Device is offline",
    groupId: "device-health",
    ...common,
  });

  await Notifications.setNotificationChannelAsync("device-low-battery", {
    name: "Device Health: Low Battery",
    sound: "low_battery.wav",
    lightColor: "#FF0000",
    description: "Device is low battery",
    groupId: "device-health",
    ...common,
  });
};

const initialSetup = async () => {
  await requestNotificationPermissions();
  await configureAndroidChannels();
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
    initialSetup();
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

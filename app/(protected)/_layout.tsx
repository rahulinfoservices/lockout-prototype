import { Stack } from "expo-router";

import { AppHeader } from "@/shared/components/domain/app-header.tsx/app-header";
import { useGetDeviceHealthAlert } from "@/shared/hooks/use-get-device-health-alert";
import { useGetSecurityAlert } from "@/shared/hooks/use-get-security-alert";

export default function ProtectedLayout() {
  useGetSecurityAlert();
  useGetDeviceHealthAlert();

  return (
    <>
      <AppHeader notificationCount={2} />

      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

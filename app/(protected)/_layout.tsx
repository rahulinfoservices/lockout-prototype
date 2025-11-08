import { Stack } from "expo-router";

import { AppHeader } from "@/shared/components/domain/facilities/_shared/components/app-header";

export default function ProtectedLayout() {
  return (
    <>
      <AppHeader notificationCount={2} />

      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

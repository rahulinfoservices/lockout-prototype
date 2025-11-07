import { useLocalSearchParams } from "expo-router";

import DeviceHealthDetails from "@/features/protected/tabs/security-alerts/security-alert-details/security-alert-details";

export default function DeviceHealthDetailsScreen() {
  const { "school-id": schoolId, zipCode: zipCode } = useLocalSearchParams<{
    "school-id": string;
    zipCode: string;
  }>();

  return <DeviceHealthDetails schoolId={schoolId} zipCode={zipCode} />;
}

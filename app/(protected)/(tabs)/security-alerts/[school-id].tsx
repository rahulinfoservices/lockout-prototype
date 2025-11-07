import { useLocalSearchParams } from "expo-router";

import SecurityAlertDetails from "@/features/protected/tabs/security-alerts/security-alert-details/security-alert-details";

export default function SecurityAlertDetailsScreen() {
  const { "school-id": schoolId, zipCode: zipCode } = useLocalSearchParams<{
    "school-id": string;
    zipCode: string;
  }>();

  return (
    <SecurityAlertDetails
      schoolId={schoolId}
      zipCode={zipCode}
      alertCategory="ALERTS"
    />
  );
}

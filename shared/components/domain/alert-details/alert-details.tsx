import { View } from "react-native";

import { useGetSecurityAlertDetails } from "@/shared/hooks/use-get-school-details";
import { AlertCategory } from "@/shared/types/alert";

import { AlertDetailsDeviceList } from "./_shared/components/alert-details-device-list";
import { AlertDetailsError } from "./_shared/components/alert-details-error";
import { AlertDetailsHeader } from "./_shared/components/alert-details-header";
import { AlertDetailsLoader } from "./_shared/components/alert-details-loader";
import { HealthDetailsDeviceList } from "./_shared/components/health-details-device-list";

export interface AlertDetailsProps {
  schoolId: string;
  zipCode: string;
  alertCategory: AlertCategory;
}

export default function AlertDetails(props: AlertDetailsProps) {
  const { schoolId, zipCode, alertCategory } = props;
  const { data, error, isLoading } = useGetSecurityAlertDetails(
    schoolId,
    zipCode,
  );

  if (isLoading) {
    return <AlertDetailsLoader />;
  }

  if (error) {
    return <AlertDetailsError error={error} />;
  }

  if (!data?.schoolDetails) {
    return <AlertDetailsError error="No school details found" />;
  }

  if (!data?.devices.length) {
    return <AlertDetailsError error="No devices found" />;
  }

  if (!data?.roomDetails) {
    return <AlertDetailsError error="No room details found" />;
  }

  if (!data?.zoneDetails) {
    return <AlertDetailsError error="No zone details found" />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <AlertDetailsHeader facilty={data.schoolDetails} />

      {alertCategory === "ALERTS" ? (
        <AlertDetailsDeviceList
          devices={data.devices}
          zone={data.zoneDetails}
          room={data.roomDetails}
        />
      ) : (
        <HealthDetailsDeviceList
          devices={data.devices}
          zone={data.zoneDetails}
          room={data.roomDetails}
        />
      )}
    </View>
  );
}

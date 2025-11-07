import { View } from "react-native";

import { SecurityDetailsDeviceList } from "./_shared/components/security-details-device-list";
import { SecurityDetailsError } from "./_shared/components/security-details-error";
import { SecurityDetailsHeader } from "./_shared/components/security-details-header";
import { SecurityDetailsLoader } from "./_shared/components/security-details-loader";
import { useGetSecurityAlertDetails } from "./_shared/hooks/use-get-school-details";

export interface SecurityAlertDetailsProps {
  schoolId: string;
  zipCode: string;
}

export default function SecurityAlertDetails(props: SecurityAlertDetailsProps) {
  const { schoolId, zipCode } = props;
  const { data, error, isLoading } = useGetSecurityAlertDetails(
    schoolId,
    zipCode,
  );

  if (isLoading) {
    return <SecurityDetailsLoader />;
  }

  if (error) {
    return <SecurityDetailsError error={error} />;
  }

  if (!data?.schoolDetails) {
    return <SecurityDetailsError error="No school details found" />;
  }

  if (!data?.devices.length) {
    return <SecurityDetailsError error="No devices found" />;
  }

  if (!data?.roomDetails) {
    return <SecurityDetailsError error="No room details found" />;
  }

  if (!data?.zoneDetails) {
    return <SecurityDetailsError error="No zone details found" />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <SecurityDetailsHeader facilty={data.schoolDetails} />

      <SecurityDetailsDeviceList
        devices={data.devices}
        zone={data.zoneDetails}
        room={data.roomDetails}
      />
    </View>
  );
}

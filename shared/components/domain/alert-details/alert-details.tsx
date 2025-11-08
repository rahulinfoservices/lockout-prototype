import { Download } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useGetSecurityAlertDetails } from "@/shared/hooks/use-get-school-details";
import { useGetAlert } from "@/shared/hooks/use-get-security-alert";
import { AlertCategory } from "@/shared/types/alert";

import { AppHeader } from "../facilities/_shared/components/app-header";
import { FacilityInfoCard } from "../facilities/_shared/components/facility-info-card";
import { AlertDetailsDeviceList } from "./_shared/components/alert-details-device-list";
import { AlertDetailsError } from "./_shared/components/alert-details-error";
import { AlertDetailsLoader } from "./_shared/components/alert-details-loader";
import { DetailsHeader } from "./_shared/components/details-header";
import { HealthDetailsDeviceList } from "./_shared/components/health-details-device-list";

export interface AlertDetailsProps {
  schoolId: string;
  zipCode: string;
  alertCategory: AlertCategory;
}

export default function AlertDetails(props: AlertDetailsProps) {
  const { schoolId, zipCode, alertCategory } = props;
  const { alert } = useGetAlert(alertCategory);
  const { data, error, isLoading } = useGetSecurityAlertDetails(
    schoolId,
    zipCode,
  );
  const [facilityAlertStatus, setFacilityAlertStatus] =
    useState<string>("ALL CLEAR");

  useEffect(() => {
    if (alertCategory === "ALERTS") {
      setFacilityAlertStatus(alert?.alertType ?? "UNKNOWN");
    } else {
      setFacilityAlertStatus(alert?.deviceHealth ?? "UNKNOWN");
    }
  }, [alert, alertCategory]);

  const renderHeader = useCallback(() => {
    return (
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-semibold text-gray-800">
          Devices ({data.devices.length})
        </Text>

        {alertCategory !== "ALERTS" && (
          <TouchableOpacity>
            <Download size={24} className="text-gray-600" />
          </TouchableOpacity>
        )}
      </View>
    );
  }, [alertCategory, data.devices.length]);

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
      <AppHeader notificationCount={2} />
      <DetailsHeader
        facilty={data.schoolDetails}
        status={facilityAlertStatus}
        alertCategory={alertCategory}
      />

      <FacilityInfoCard facility={data.schoolDetails} />

      {alertCategory === "ALERTS" ? (
        <AlertDetailsDeviceList
          devices={data.devices}
          zone={data.zoneDetails}
          room={data.roomDetails}
          renderHeader={renderHeader}
        />
      ) : (
        <HealthDetailsDeviceList
          devices={data.devices}
          zone={data.zoneDetails}
          room={data.roomDetails}
          renderHeader={renderHeader}
        />
      )}
    </View>
  );
}

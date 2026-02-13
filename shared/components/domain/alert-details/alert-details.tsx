import { Download } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { FacilityCard } from "@/shared/components/domain/facilities/_shared/components/facility-alert-card";
import { useGetSecurityAlertDetailsData } from "@/shared/hooks/use-get-school-details";
import { AlertCategory } from "@/shared/types/alert";

import { AlertDetailsDeviceList } from "./_shared/components/alert-details-device-list";
import { AlertDetailsLoader } from "./_shared/components/alert-details-loader";
import { CategoryGridSelector } from "./_shared/components/device-category-tabs";
import { HealthDetailsDeviceList } from "./_shared/components/health-details-device-list";


/* ---------------- CONSTANTS ---------------- */
const DEVICE_TABS = [
  { key: "tablet", label: "TABLET", color: "#2563EB" }, // blue
  { key: "pullbox", label: "PULL BOX", color: "#7C3AED" }, // purple
  { key: "smartLight", label: "SMART LIGHT", color: "#F59E0B" }, // amber
  { key: "smartBoots", label: "SMART BOOT", color: "#10B981" }, // green
] as const;
/* ---------------- COMPONENT ---------------- */
export default function AlertDetails({
  schoolId,
  zipCode,
  alertCategory,
}: {
  schoolId: string;
  zipCode: string;
  alertCategory: AlertCategory;
}) {
  const { data, isLoading } =
    useGetSecurityAlertDetailsData(schoolId, zipCode);
    console.warn("AlertDetails data:", data);

  const [selectedCategory, setSelectedCategory] =
    useState<string>("tablet");

console.warn("selectedCategory data:", selectedCategory);
  const selectedCategoryLabel = DEVICE_TABS.find(
  (tab) => tab.key === selectedCategory
)?.label ?? "Unknown";

  /* ---------------- FILTER ---------------- */
  const devices = useMemo(() => {
      console.warn(selectedCategoryLabel);
    return (
    
      data?.devices?.filter(
        (d) => d.deviceType === selectedCategoryLabel
      ) ?? []
    );
  }, [data?.devices, selectedCategory , selectedCategoryLabel]);

  /* ---------------- HEADER ---------------- */
  const renderHeader = useCallback(() => {
    return (
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-semibold text-gray-800">
          Devices ({devices.length})
        </Text>

        {alertCategory !== "ALERTS" && (
          <TouchableOpacity>
            <Download size={24} className="text-gray-600" />
          </TouchableOpacity>
        )}
      </View>
    );
  }, [alertCategory, devices.length]);

  if (isLoading) {
    return <AlertDetailsLoader />;
  }

  if (!data) {
    return null;
  }

  /* ---------------- UI ---------------- */
  return (
    <View className="flex-1 bg-gray-50">
<View className="m-4" >
        <FacilityCard
  className="m-4"
  item={data.schoolDetails}
/>
</View>
      <CategoryGridSelector
         items={DEVICE_TABS}
  value={selectedCategory}
  onChange={setSelectedCategory}
      />

      {alertCategory === "ALERTS" ? (
        <AlertDetailsDeviceList
          devices={devices}
          zone={data.zoneDetails}
          room={data.roomDetails}
          renderHeader={renderHeader}
        />
      ) : (
        <HealthDetailsDeviceList
          devices={devices}
          zone={data.zoneDetails}
          room={data.roomDetails}
          renderHeader={renderHeader}
        />
      )}
    </View>
  );
}

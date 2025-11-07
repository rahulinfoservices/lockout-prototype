import { useCallback, useMemo, useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";

import { FacilitiesError } from "@/shared/components/domain/facilities/components/facilities-error";
import { FacilitiesLoader } from "@/shared/components/domain/facilities/components/facilities-loader";
import { FacilityHeader } from "@/shared/components/domain/facilities/components/facility-header-new";
import { FacilitiesSearch } from "@/shared/components/domain/facilities/components/facilties-search";
import { FacilityStateDropdown } from "@/shared/components/domain/facilities/components/facilties-state-dropdown";
import { useGetFacilities } from "@/shared/hooks/use-get-facilities";
import { useGetAlert } from "@/shared/hooks/use-get-security-alert";
import { AlertCategory } from "@/shared/types/alert";
import { Facility } from "@/shared/types/facility";

import { FacilityCard } from "./components/facility-alert-card";
import { FacilityDeviceHealthCard } from "./components/facilty-device-health-card";

interface FacilitiesProps {
  alertCategory: AlertCategory;
}

export default function Facilities(props: FacilitiesProps) {
  const { alertCategory } = props;
  const { facilities, isLoading, error } = useGetFacilities();
  const { alert, error: alertError } = useGetAlert(alertCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const facilityStates = ["All States","MI"];
  const [selectedState, setSelectedState] = useState<string>("MI");

  // Filter facilities based on search query
  const filteredFacilities = useMemo(() => {
    if (!searchQuery.trim()) {
      return facilities;
    }

    const query = searchQuery.toLowerCase();
    return facilities.filter(
      facility =>
        facility.name.toLowerCase().includes(query) ||
        facility.zip.includes(query) ||
        facility.district.toLowerCase().includes(query),
    );
  }, [facilities, searchQuery]);

  const renderFacilityAlertCard: ListRenderItem<Facility> = useCallback(
    ({ item }) => (
      <FacilityCard
        item={item}
        status={
          item.schoolId === "ST MICHAEL-ES" ? alert?.alertType : undefined
        }
        error={item.schoolId === "ST MICHAEL-ES" ? alertError : undefined}
      />
    ),
    [alert, alertError],
  );

  const renderFacilityDeviceHealthCard: ListRenderItem<Facility> = useCallback(
    ({ item }) => (
      <FacilityDeviceHealthCard
        item={item}
        status={
          item.schoolId === "ST MICHAEL-ES" ? alert?.deviceHealth : undefined
        }
        error={item.schoolId === "ST MICHAEL-ES" ? alertError : undefined}
      />
    ),
    [alert, alertError],
  );

  if (isLoading) {
    return <FacilitiesLoader />;
  }

  if (error) {
    return <FacilitiesError error={error} />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FacilityHeader notificationCount={2} />

      <FacilityStateDropdown
        states={facilityStates}
        selectedState={selectedState}
        onSelect={(state) => setSelectedState(state)}
      />

      <FacilitiesSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

    

      <FlatList
        data={filteredFacilities}
        renderItem={
          alertCategory === "ALERTS"
            ? renderFacilityAlertCard
            : renderFacilityDeviceHealthCard
        }
        keyExtractor={item => item.schoolId}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-10">
            <Text className="text-base text-gray-400">No facilities found</Text>
          </View>
        }
      />
    </View>
  );
}

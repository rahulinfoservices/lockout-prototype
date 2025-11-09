import { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";

import { FacilitiesError } from "@/shared/components/domain/facilities/_shared/components/facilities-error";
import { FacilitiesLoader } from "@/shared/components/domain/facilities/_shared/components/facilities-loader";
import { FacilitiesSearch } from "@/shared/components/domain/facilities/_shared/components/facilties-search";
import { useGetFacilities } from "@/shared/hooks/use-get-facilities";
import { AlertCategory } from "@/shared/types/alert";

import { FacilitiesAlertList } from "./_shared/components/facilities-alert-list";
import { FacilitiesDeviceList } from "./_shared/components/facilities-device-list";
import { FacilityStateDropdown } from "./_shared/components/facilties-state-dropdown";

interface FacilitiesProps {
  alertCategory: AlertCategory;
}

export default function Facilities(props: FacilitiesProps) {
  const { alertCategory } = props;
  const { facilities, isLoading, error } = useGetFacilities();
  const [searchQuery, setSearchQuery] = useState("");

  const facilityStates = ["All States", "MI"];
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

  const renderEmptyList = useCallback(() => {
    return (
      <View className="items-center py-10">
        <Text className="text-base text-gray-400">No facilities found</Text>
      </View>
    );
  }, []);

  if (isLoading) {
    return <FacilitiesLoader />;
  }

  if (error) {
    return <FacilitiesError error={error} />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row items-center gap-4 border-b border-gray-200 bg-white px-4 py-2">
        <FacilityStateDropdown
          states={facilityStates}
          selectedState={selectedState}
          onSelect={state => setSelectedState(state)}
        />

        <FacilitiesSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>

      {alertCategory === "ALERTS" ? (
        <FacilitiesAlertList
          facilities={filteredFacilities}
          renderEmptyList={renderEmptyList}
        />
      ) : (
        <FacilitiesDeviceList
          facilities={filteredFacilities}
          renderEmptyList={renderEmptyList}
        />
      )}
    </View>
  );
}

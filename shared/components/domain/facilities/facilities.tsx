import { FilterIcon } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { FacilitiesError } from "@/shared/components/domain/facilities/_shared/components/facilities-error";
import { FacilitiesLoader } from "@/shared/components/domain/facilities/_shared/components/facilities-loader";
import { FacilitiesSearch } from "@/shared/components/domain/facilities/_shared/components/facilties-search";
import {
  useFacilities
} from "@/shared/hooks/use-get-facilities";
import { useGetStates } from "@/shared/hooks/use-get-state";
import { useGetZipcodes } from "@/shared/hooks/use-get-zipcodes";
import { AlertCategory } from "@/shared/types/alert";

import { FacilitiesAlertList } from "./_shared/components/facilities-alert-list";
import { FacilitiesDeviceList } from "./_shared/components/facilities-device-list";
import { FacilityStateDropdown } from "./_shared/components/facilties-state-dropdown";

interface FacilitiesProps {
  alertCategory: AlertCategory;
}

export default function Facilities(props: FacilitiesProps) {
  const { alertCategory } = props;

  const { states } = useGetStates();
  const [selectedState, setSelectedState] = useState<string>();
  const { zipCodes } = useGetZipcodes(selectedState);
  const [selectedZip, setSelectedZip] = useState<string>();
  const [status, setStatus] = useState<string>();

  //  const facilityStates = ["All States", "MI"];
  // const [selectedState, setSelectedState] = useState<string>("MI");

  // const facilityZip = ["All States", "MI"];
  // const [selectedZip, setSelectedZip] = useState<string>("00000");

  // const { facilitiesDev, isLoadingDev, error } = useGetFacilitiesDev();
  const { facilities, isLoading ,error } = useFacilities(selectedState, selectedZip);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Default: First State
  useEffect(() => {
    if (states.length && !selectedState) {
      setSelectedState(states[0]);
    }
  }, [states]);

  // Default: First ZIP
  useEffect(() => {
    if (zipCodes.length && !selectedZip) {
      setSelectedZip(zipCodes[0]);
    }
  }, [zipCodes]);

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
      {/* <View className="flex-row items-center gap-4 border-b border-gray-200 bg-white px-4 py-3">
        <FacilityStateDropdown
          states={states}
          selectedState={selectedState}
          onSelect={state => setSelectedState(state)}
        />

        <FacilityStateDropdown
          states={zipCodes}
          selectedState={selectedZip}
          onSelect={zip => setSelectedZip(zip)}
        />
        <FacilitiesSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View> */}

      <View className="flex-row items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        {/* Search */}
        <View className="flex-1">
          <FacilitiesSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </View>

        {/* Filter Button */}
        <Pressable
          onPress={() => setFiltersOpen(v => !v)}
          className="h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-gray-100"
        >
          <FilterIcon size={20} className="text-gray-700" />
        </Pressable>
      </View>
      {/* FILTERS (INLINE – PUSHES CONTENT DOWN) */}
      {filtersOpen && (
        <View className="border-b border-gray-200 bg-gray-50 px-4 py-4">
          {/* ROW: STATE + ZIP */}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-gray-600">
                State
              </Text>
              <FacilityStateDropdown
                states={states}
                selectedState={selectedState}
                onSelect={state => setSelectedState(state)}
              />
            </View>

            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-gray-600">
                Zip Code
              </Text>
              <FacilityStateDropdown
                states={zipCodes}
                selectedState={selectedZip}
                onSelect={zip => setSelectedZip(zip)}
              />
            </View>
          </View>

          {/* STATUS – FULL WIDTH */}
          {/* <View className="mt-4">
            <Text className="mb-2 text-sm font-medium text-gray-600">
              Status
            </Text>
            <FacilityStateDropdown
              states={["All Status", "Active", "Inactive"]}
              selectedState={status}
              onSelect={setStatus}
            />
          </View> */}
        </View>
      )}

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

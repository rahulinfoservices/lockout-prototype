import { useMemo, useState } from "react";
import { ListRenderItem } from "react-native";

import { FacilityDeviceCard } from "@/shared/components/domain/facilities/components/facility-device-card";
import Facilities from "@/shared/components/domain/facilities/facilities";
import { FacilityWithDevices } from "@/shared/types/facility";

import { useGetFacilitiesWithDevices } from "./_shared/hooks/use-get-facilities-with-devices";

export default function DeviceHealth() {
  const { facilities, isLoading, error } = useGetFacilitiesWithDevices();
  const [searchQuery, setSearchQuery] = useState("");

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

  const renderFacilityCard: ListRenderItem<FacilityWithDevices> = ({
    item,
  }) => <FacilityDeviceCard item={item} />;

  return (
    <Facilities<FacilityWithDevices>
      facilities={filteredFacilities}
      isLoading={isLoading}
      error={error}
      renderFacility={renderFacilityCard}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}

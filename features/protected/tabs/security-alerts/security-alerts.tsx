import { useMemo, useState } from "react";
import { ListRenderItem } from "react-native";

import Facilities from "@/shared/components/domain/facilities/facilities";
import { Facility } from "@/shared/types/facility";

import { FacilityCard } from "../../../../shared/components/domain/facilities/components/facility-card";
import { useGetFacilities } from "./_shared/hooks/use-get-facilities";
import { useGetSecurityAlert } from "./_shared/hooks/use-get-security-alert";

export default function SecurityAlerts() {
  const { facilities, isLoading, error } = useGetFacilities();
  const { alert, error: alertError } = useGetSecurityAlert();
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

  const renderFacilityCard: ListRenderItem<Facility> = ({ item }) => (
    <FacilityCard
      item={item}
      status={item.schoolId === "ST MICHAEL-ES" ? alert?.alertType : undefined}
      error={item.schoolId === "ST MICHAEL-ES" ? alertError : undefined}
    />
  );

  return (
    <Facilities<Facility>
      facilities={filteredFacilities}
      isLoading={isLoading}
      error={error}
      renderFacility={renderFacilityCard}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}

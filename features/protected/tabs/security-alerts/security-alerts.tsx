import { ListRenderItem } from "react-native";

import Facilities from "@/shared/components/domain/facilities";

import { FacilityCard } from "./_shared/components/facility-card";
import { Facility, useGetFacilities } from "./_shared/hooks/use-get-facilities";

export default function SecurityAlerts() {
  const { facilities, isLoading, error } = useGetFacilities();

  const renderFacilityCard: ListRenderItem<Facility> = ({ item }) => (
    <FacilityCard
      item={item}
      status={item.id === "parma-es" ? "LOCKDOWN" : undefined}
    />
  );

  return (
    <Facilities
      facilities={facilities}
      isLoading={isLoading}
      error={error}
      renderFacility={renderFacilityCard}
    />
  );
}

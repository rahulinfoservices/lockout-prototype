import { ListRenderItem } from "react-native";

import Facilities from "@/shared/components/domain/facilities/facilities";
import { Facility } from "@/shared/types/facility";

import { FacilityCard } from "../../../../shared/components/domain/facilities/components/facility-card";
import { useGetFacilities } from "./_shared/hooks/use-get-facilities";

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

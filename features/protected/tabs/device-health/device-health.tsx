import { ListRenderItem } from "react-native";

import Facilities from "@/shared/components/domain/facilities/facilities";
import { Facility } from "@/shared/types/facility";

import { useGetFacilitiesWithDevices } from "./_shared/hooks/use-get-facilities-with-devices";

export default function DeviceHealth() {
  const { facilities, isLoading, error } = useGetFacilitiesWithDevices();

  const renderFacilityCard: ListRenderItem<Facility> = ({ item }) => <></>;

  return (
    <Facilities
      facilities={facilities}
      isLoading={isLoading}
      error={error}
      renderFacility={renderFacilityCard}
    />
  );
}

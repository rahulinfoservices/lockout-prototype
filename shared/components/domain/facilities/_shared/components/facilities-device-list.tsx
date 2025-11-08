import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";

import { useGetAlert } from "@/shared/hooks/use-get-security-alert";
import { Facility } from "@/shared/types/facility";

import { getSortedFacilitiesByDeviceHealth } from "../utils/sort-school-list";
import { FacilityDeviceHealthCard } from "./facilty-device-health-card";

interface FacilitiesDeviceListProps {
  facilities: Facility[];
  renderEmptyList: () => React.JSX.Element;
}

export const FacilitiesDeviceList = (props: FacilitiesDeviceListProps) => {
  const { facilities, renderEmptyList } = props;
  const { alert, error: alertError } = useGetAlert("TELEMETRY");
  const facilityList = getSortedFacilitiesByDeviceHealth(facilities, alert);

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

  return (
    <FlatList
      data={facilityList}
      renderItem={renderFacilityDeviceHealthCard}
      keyExtractor={item => item.schoolId}
      contentContainerClassName="p-4"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyList}
    />
  );
};

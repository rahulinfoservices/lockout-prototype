import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";

import { useAlertStore } from "@/shared/stores/use-alert-store";
import { FacilityData } from "@/shared/types/facility";

import { getSortedFacilitiesByDeviceHealth } from "../utils/sort-school-list";
import { FacilityDeviceHealthCard } from "./facilty-device-health-card";

interface FacilitiesDeviceListProps {
  facilities: FacilityData[];
  renderEmptyList: () => React.JSX.Element;
}

export const FacilitiesDeviceList = (props: FacilitiesDeviceListProps) => {
  const { facilities, renderEmptyList } = props;
  const alert = useAlertStore(state => state.deviceHealthAlert);
  const alertError = useAlertStore(state => state.deviceHealthError);
  const facilityList = getSortedFacilitiesByDeviceHealth(facilities, alert);

  const renderFacilityDeviceHealthCard: ListRenderItem<FacilityData> =
    useCallback(
      ({ item }) => (
        <FacilityDeviceHealthCard
          item={item}
          status={
            item.schoolId === "ST MICHAEL-ES" ? alert?.deviceHealth : undefined
          }
          statusUpdatedAt={
            item.schoolId === "ST MICHAEL-ES"
              ? (alert?.ts ?? item.updatedAt)
              : item.updatedAt
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
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    />
  );
};

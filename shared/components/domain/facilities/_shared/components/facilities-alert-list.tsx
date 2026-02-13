import React, { useCallback, useMemo } from "react";
import { FlatList, ListRenderItem } from "react-native";

import { useAlertStore } from "@/shared/stores/use-alert-store";
import { FacilityData } from "@/shared/types/facility";

import { getSortedFacilitiesByAlertType } from "../utils/sort-school-list";
import { FacilityCard } from "./facility-alert-card";

interface FacilitiesAlertListProps {
  facilities: FacilityData[];
  renderEmptyList: () => React.JSX.Element;
}

export const FacilitiesAlertList = (props: FacilitiesAlertListProps) => {
  const { facilities, renderEmptyList } = props;
  const alert = useAlertStore(state => state.securityAlert);
  const alertError = useAlertStore(state => state.securityError);


    // Merge latest alert into facility list
  const facilityListWithAlerts = useMemo(
    () =>
      facilities.map(facility => {
       
        const schoolId = `${facility.stateCode}-${facility.zip}_${facility.schoolId
          .trim()
          .replace(/\s+/g, "-")}`;
           console.warn("Processing facility:", schoolId);
           console.warn("Current alert:", alert?.alertId);

        if (alert &&  (
          alert.alertId === schoolId 
        )) {
          return {
            ...facility,
            alert,
            alertType: alert.alertType,
            alertTs: alert.ts,
            alertError,
          };
        }
        return facility;
      }),
    [facilities, alert, alertError]
  );

   const facilityList = getSortedFacilitiesByAlertType(facilityListWithAlerts, alert);

  const renderFacilityAlertCard: ListRenderItem<FacilityData> = useCallback(
    ({ item }) => (
      console.warn("Rendering FacilityCard for:", item),
      <FacilityCard
        item={item}
        status={
          item.schoolId === "ST MICHAEL-ES" ? alert?.alertType : undefined
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
      renderItem={renderFacilityAlertCard}
      keyExtractor={item => item.schoolId}
      contentContainerClassName="p-4"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyList}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    />
  );
};

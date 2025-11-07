import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";

import { useGetAlert } from "@/shared/hooks/use-get-security-alert";
import { Facility } from "@/shared/types/facility";

import { FacilityCard } from "./facility-alert-card";

interface FacilitiesAlertListProps {
  facilities: Facility[];
  renderEmptyList: () => React.JSX.Element;
}

export const FacilitiesAlertList = (props: FacilitiesAlertListProps) => {
  const { facilities, renderEmptyList } = props;
  const { alert, error: alertError } = useGetAlert("ALERTS");

  const renderFacilityAlertCard: ListRenderItem<Facility> = useCallback(
    ({ item }) => (
      <FacilityCard
        item={item}
        status={
          item.schoolId === "ST MICHAEL-ES" ? alert?.alertType : undefined
        }
        error={item.schoolId === "ST MICHAEL-ES" ? alertError : undefined}
      />
    ),
    [alert, alertError],
  );

  return (
    <FlatList
      data={facilities}
      renderItem={renderFacilityAlertCard}
      keyExtractor={item => item.schoolId}
      contentContainerClassName="p-4"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyList}
    />
  );
};

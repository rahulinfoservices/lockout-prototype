import React from "react";
import { FlatList, View } from "react-native";

import { ReportFacilityCard, ReportFacilityItem } from "./report-facility-card";

interface ReportFacilityListProps {
  facilities: ReportFacilityItem[];
}

export const ReportFacilityList = ({ facilities }: ReportFacilityListProps) => {
  return (
    <View className="flex-1">
      <FlatList
        data={facilities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ReportFacilityCard facility={item} />}
        contentContainerStyle={{ paddingBottom: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

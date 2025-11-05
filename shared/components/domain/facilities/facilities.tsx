import { FlatList, ListRenderItem, Text, View } from "react-native";

import { FacilitiesError } from "@/shared/components/domain/facilities/components/facilities-error";
import { FacilitiesLoader } from "@/shared/components/domain/facilities/components/facilities-loader";
import { FacilityHeader } from "@/shared/components/domain/facilities/components/facility-header";
import { FacilitiesSearch } from "@/shared/components/domain/facilities/components/facilties-search";

interface FacilitiesProps<T extends { id: string }> {
  facilities: T[];
  isLoading: boolean;
  error: string;
  renderFacility: ListRenderItem<T>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Facilities<T extends { id: string }>(
  props: FacilitiesProps<T>,
) {
  const {
    facilities,
    isLoading,
    error,
    renderFacility,
    searchQuery,
    setSearchQuery,
  } = props;

  if (isLoading) {
    return <FacilitiesLoader />;
  }

  if (error) {
    return <FacilitiesError error={error} />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FacilityHeader facilityCount={facilities.length} />

      <FacilitiesSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <FlatList
        data={facilities as T[]}
        renderItem={renderFacility}
        keyExtractor={item => item.id}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-10">
            <Text className="text-base text-gray-400">No facilities found</Text>
          </View>
        }
      />
    </View>
  );
}

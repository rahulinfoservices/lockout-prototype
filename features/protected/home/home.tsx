import { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { FacilitiesError } from "./_shared/components/facilities-error";
import { FacilitiesLoader } from "./_shared/components/facilities-loader";
import { FacilityCard } from "./_shared/components/facility-card";
import { FacilityHeader } from "./_shared/components/facility-header";
import { FacilitiesSearch } from "./_shared/components/facilties-search";
import { Facility, useGetFacilities } from "./_shared/hooks/use-get-facilities";

export default function Home() {
  const { facilities, isLoading, error } = useGetFacilities();
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

  const renderFacilityCard = ({ item }: { item: Facility }) => (
    <FacilityCard item={item} />
  );

  if (isLoading) {
    return <FacilitiesLoader />;
  }

  if (error) {
    return <FacilitiesError error={error} />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FacilityHeader facilityCount={filteredFacilities.length} />

      <FacilitiesSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <FlatList
        data={filteredFacilities}
        renderItem={renderFacilityCard}
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

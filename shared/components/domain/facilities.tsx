import { useMemo, useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";

import { FacilitiesError } from "@/features/protected/tabs/security-alerts/_shared/components/facilities-error";
import { FacilitiesLoader } from "@/features/protected/tabs/security-alerts/_shared/components/facilities-loader";
import { FacilityHeader } from "@/features/protected/tabs/security-alerts/_shared/components/facility-header";
import { FacilitiesSearch } from "@/features/protected/tabs/security-alerts/_shared/components/facilties-search";
import { Facility } from "@/features/protected/tabs/security-alerts/_shared/hooks/use-get-facilities";

interface FacilitiesProps {
  facilities: Facility[];
  isLoading: boolean;
  error: string;
  renderFacility: ListRenderItem<Facility>;
}

export default function Facilities(props: FacilitiesProps) {
  const { facilities, isLoading, error, renderFacility } = props;
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

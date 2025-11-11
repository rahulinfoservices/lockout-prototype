import { View } from "react-native";

import Input from "@/shared/components/core/form/input";

interface FacilitiesSearchProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

export const FacilitiesSearch = (props: FacilitiesSearchProps) => {
  const { searchQuery, setSearchQuery } = props;

  return (
    <View className="flex-1">
      <Input
        className="py-3 text-base"
        placeholder="Search facilities..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

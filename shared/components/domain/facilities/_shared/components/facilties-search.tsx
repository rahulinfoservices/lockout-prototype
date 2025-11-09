import { TextInput, View } from "react-native";

interface FacilitiesSearchProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

export const FacilitiesSearch = (props: FacilitiesSearchProps) => {
  const { searchQuery, setSearchQuery } = props;

  return (
    <View className="flex-1">
      <TextInput
        className="rounded-lg border border-gray-200 bg-gray-100 px-4 text-xl"
        placeholder="Search facilities..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

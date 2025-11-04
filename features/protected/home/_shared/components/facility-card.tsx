import { Text, TouchableOpacity, View } from "react-native";

import { Facility } from "../hooks/use-get-facilities";

export const FacilityCard = ({ item }: { item: Facility }) => (
  <TouchableOpacity
    className="mb-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm active:opacity-70"
    activeOpacity={0.7}
  >
    <Text className="mb-2 text-xl font-semibold text-gray-800">
      {item.name}
    </Text>

    <View className="flex-row flex-wrap items-center gap-3">
      <View className="rounded-full bg-blue-50 px-3 py-1">
        <Text className="text-base font-medium text-blue-700">{item.zip}</Text>
      </View>

      {item.district ? (
        <View className="rounded-full bg-cyan-50 px-3 py-1">
          <Text className="text-base font-medium text-cyan-700">
            {item.district}
          </Text>
        </View>
      ) : null}
    </View>
  </TouchableOpacity>
);

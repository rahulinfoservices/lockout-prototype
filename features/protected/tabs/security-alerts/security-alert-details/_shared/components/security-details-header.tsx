import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { styled } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Facility } from "@/shared/types/facility";

interface SecurityDetailsHeaderProps {
  facilty: Facility;
}

const ChevronLeftIcon = styled(ChevronLeft);

export const SecurityDetailsHeader = (props: SecurityDetailsHeaderProps) => {
  const { facilty } = props;
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-teal-500 px-5 pb-5">
      <View
        style={{
          marginTop: insets.top,
        }}
      >
        <TouchableOpacity
          className="mb-4 flex-row items-center gap-2 self-start rounded-lg bg-white/20 px-3 py-2"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon className="text-white" size={24} />

          <Text className="text-lg font-medium text-white">
            Back to Facilities
          </Text>
        </TouchableOpacity>

        <Text className="mb-2 text-2xl font-bold text-white">
          {facilty.name || "Unknown Facility"}
        </Text>

        <Text className="text-lg text-white/90">
          {facilty.district || "Unknown District"} • {facilty.zip}
        </Text>
      </View>
    </View>
  );
};

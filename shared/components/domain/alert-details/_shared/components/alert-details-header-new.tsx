import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { styled } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Facility } from "@/shared/types/facility";

interface AlertDetailsHeaderProps {
  facilty: Facility;
  status?: "active" | "offline"; // optional status prop
}

const ChevronLeftIcon = styled(ArrowLeft);

export const AlertDetailsHeader = (props: AlertDetailsHeaderProps) => {
  const { facilty, status = "active" } = props;
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const isActive = status === "active";

  return (
    <View className="px-1 pb-1">
      <View
        style={{
          marginTop: 10,
        }}
      >
         <View className="flex-row items-center justify-between">
        {/* Left: Back Button */}
        <TouchableOpacity
          className="rounded-lg  p-3"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon className="text-gray-700" size={24} />
        </TouchableOpacity>

         {/* Center: Facility Info */}
        <View className="flex-1 ml-4">
          <Text className="text-xl font-bold text-gray-800">
            {facilty.name || "Unknown Facility"}
          </Text>
          <Text className="text-sm text-gray-600">
            {facilty.district || "Unknown District"} • {facilty.zip || ""}
          </Text>
        </View>

         {/* Right: Status Badge */}
        <View
          className={`px-5 py-1 p-4 rounded-full ${
            isActive ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <Text
            className={`text-sm font-semibold ${
              isActive ? "text-green-700" : "text-red-700"
            }`}
          >
            {isActive ? "Active" : "Offline"}
          </Text>
        </View>
        </View>



  
      </View>
    </View>
  );
};

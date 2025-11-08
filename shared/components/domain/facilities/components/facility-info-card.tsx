import { MapPin, Phone } from "lucide-react-native";
import { styled } from "nativewind";
import { Text, View } from "react-native";

import { Facility } from "@/shared/types/facility";

interface FacilityInfoCardProps {
  facility?: Facility;
}

const MapPinIcon = styled(MapPin);
const PhoneIcon = styled(Phone);

export const FacilityInfoCard = ({ facility }: FacilityInfoCardProps) => {
  // 🔍 Smart field selection with fallbacks
  const name =
    facility?.fullName?.trim() ||
    // facility?.name?.trim() ||
    "St. Michael Elementary School";

  let location = "";
  if (facility?.address?.trim()) {
    location = facility.address.trim();
  }
  //  else if (facility?.district || facility?.zip) {
  //   const district = facility?.district?.trim() || "";
  //   const state = facility?.zip?.trim() || "";
  //   location = [district, state].filter(Boolean).join(", ");
  // }
   else {
    location = "8944 50th Ave, Remus, MI 49340";
  }

  const phone = facility?.phone?.trim() || "(989) 967-3681";

  return (
    <View className="m-4 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      {/* Facility Name */}
      <Text className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">
        {name}
      </Text>

      {/* Location Row */}
      <View className="flex-row items-center mb-4">
        <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
          <MapPinIcon className="text-gray-600" size={20} />
        </View>
        <View className="ml-4 flex-shrink">
          <Text className="text-xs text-gray-500 uppercase tracking-wide">
            Location
          </Text>
          <Text className="text-base font-medium text-gray-800">
            {location}
          </Text>
        </View>
      </View>

      {/* Phone Row */}
      <View className="flex-row items-center">
        <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
          <PhoneIcon className="text-gray-600" size={20} />
        </View>
        <View className="ml-4 flex-shrink">
          <Text className="text-xs text-gray-500 uppercase tracking-wide">
            Phone
          </Text>
          <Text className="text-base font-medium text-gray-800">{phone}</Text>
        </View>
      </View>
    </View>
  );
};

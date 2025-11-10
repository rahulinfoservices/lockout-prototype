import { MapPin, Phone } from "lucide-react-native";
import { styled } from "nativewind";
import { useMemo } from "react";
import { Text, View } from "react-native";

import { Facility } from "@/shared/types/facility";

interface FacilityInfoCardProps {
  facility?: Facility;
}

const MapPinIcon = styled(MapPin);
const PhoneIcon = styled(Phone);

export const FacilityInfoCard = ({ facility }: FacilityInfoCardProps) => {
  const name =
    facility?.fullName || facility?.name || "St. Michael Elementary School";

  const location = useMemo(() => {
    if (facility?.address) {
      return facility.address.trim();
    }

    return "8944 50th Ave, Remus, MI 49340";
  }, [facility?.address]);

  const phone = facility?.phone?.trim() || "(989) 967-3681";

  return (
    <View className="m-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      {/* Facility Name */}
      <Text className="mb-5 text-2xl font-bold tracking-tight text-gray-900">
        {name}
      </Text>

      {/* Location Row */}
      <View className="mb-4 flex-row items-center">
        <View className="h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <MapPinIcon className="text-gray-600" size={20} />
        </View>
        <View className="ml-4 shrink">
          <Text className="text-xs tracking-wide text-gray-500 uppercase">
            Location
          </Text>
          <Text className="text-base font-medium text-gray-800">
            {location}
          </Text>
        </View>
      </View>

      {/* Phone Row */}
      <View className="flex-row items-center">
        <View className="h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <PhoneIcon className="text-gray-600" size={20} />
        </View>
        <View className="ml-4 shrink">
          <Text className="text-xs tracking-wide text-gray-500 uppercase">
            Phone
          </Text>
          <Text className="text-base font-medium text-gray-800">{phone}</Text>
        </View>
      </View>
    </View>
  );
};

import { LogOut } from "lucide-react-native";
import { styled } from "nativewind";
import { Text, View } from "react-native";

import { useAuth } from "@/shared/contexts/auth";

interface FacilityHeaderProps {
  facilityCount: number;
}

const LogOutIcon = styled(LogOut);

export const FacilityHeader = (props: FacilityHeaderProps) => {
  const { facilityCount } = props;
  const { signOut } = useAuth();

  return (
    <View className="flex-row items-center justify-between bg-teal-500 px-5 pt-14 pb-5">
      <View>
        <Text className="mb-1 text-3xl font-bold text-white">
          Michigan Facilities
        </Text>
        <Text className="text-base text-white/90">
          {facilityCount} {facilityCount === 1 ? "location" : "locations"}
        </Text>
      </View>

      <LogOutIcon className="text-white" size={30} onPress={signOut} />
    </View>
  );
};

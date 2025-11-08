import { LogOut } from "lucide-react-native";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuth } from "@/shared/contexts/auth";

interface FacilityHeaderProps {
  facilityCount: number;
}

const LogOutIcon = styled(LogOut);

export const FacilityHeader = (props: FacilityHeaderProps) => {
  const { facilityCount } = props;
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-teal-500 px-5 pb-5">
      <View
        style={{
          marginTop: insets.top,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
    </View>
  );
};

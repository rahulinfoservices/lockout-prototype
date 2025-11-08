import { Bell, LogOut } from "lucide-react-native";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "@/shared/components/domain/logo";
import { useAuth } from "@/shared/contexts/auth";

interface AppHeaderProps {
  notificationCount: number;
}

const LogOutIcon = styled(LogOut);
const BellIcon = styled(Bell);

export const AppHeader = (props: AppHeaderProps) => {
  const { notificationCount } = props;
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const hasNotification = notificationCount > 0;

  return (
    <View className="bg-white-100 border-b border-gray-200 px-5 pb-2 pt-2">
       
      <View
        style={{
          marginTop: insets.top,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
         <Logo width={40} height={40} />
      
          <Text className="mb-1 text-2xl font-bold text-gray-700">
            LockOut USA
          </Text>
    
        </View>

               <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
       
          <View style={{ position: "relative" }}>
            <BellIcon className="text-gray-700" size={24} />
            {hasNotification && (
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "red",
                }}
              />
            )}
          </View>
          <LogOutIcon className="text-gray-700" size={28} onPress={signOut} />
          </View>

        
      </View>
   
    </View>
  );
};

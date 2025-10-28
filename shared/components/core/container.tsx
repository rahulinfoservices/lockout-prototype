import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className={`flex-1 ${className}`}>{children}</View>
    </SafeAreaView>
  );
};

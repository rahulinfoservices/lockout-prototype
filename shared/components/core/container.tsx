import { View } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export interface ContainerProps extends React.PropsWithChildren {
  className?: string;
  safeAreaStyle?: SafeAreaViewProps["style"];
}

export const Container = ({
  children,
  className = "",
  safeAreaStyle,
}: ContainerProps) => {
  return (
    <SafeAreaView style={[{ flex: 1 }, safeAreaStyle]}>
      <View className={`flex-1 ${className}`}>{children}</View>
    </SafeAreaView>
  );
};

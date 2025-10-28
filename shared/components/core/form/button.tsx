import { Pressable, PressableProps, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function Button({ children, ...restProps }: PressableProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const renderChildren = () => {
    if (typeof children === "string") {
      return (
        <Text className="text-center text-xl font-semibold text-white">
          {children}
        </Text>
      );
    }

    return children;
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        {...restProps}
        className="w-full rounded-4xl bg-teal-500 py-4 shadow-lg active:opacity-80"
        onPressIn={() => {
          scale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
      >
        {renderChildren()}
      </Pressable>
    </Animated.View>
  );
}

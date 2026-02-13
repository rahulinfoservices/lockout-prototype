import { Text, TouchableOpacity, View } from "react-native";

interface GridItem<T extends string> {
  key: T;
  label: string;
  color: string;
}

interface CategoryGridSelectorProps<T extends string> {
  items: readonly GridItem<T>[];
  value: T;
  onChange: (key: T) => void;
}

export function CategoryGridSelector<T extends string>({
  items,
  value,
  onChange,
}: CategoryGridSelectorProps<T>) {
  return (
    <View className="px-4 pt-4">
      <View className="flex-row flex-wrap justify-between">
        {items.map((item) => {
          const active = item.key === value;

          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => onChange(item.key)}
              activeOpacity={0.9}
              className="mb-4 mt-4"
              style={{ width: "48%" }}
            >
              <View
                style={{
                  backgroundColor: active ? item.color : "#FFFFFF",
                  borderRadius: 16,
                  paddingVertical: 18,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  marginTop:8,
                  borderColor: active ? item.color : "#E5E7EB",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "600",
                    color: active ? "#FFFFFF" : "#374151",
                    letterSpacing: 0.3,
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

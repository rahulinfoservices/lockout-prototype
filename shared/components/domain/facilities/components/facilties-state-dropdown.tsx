import { ChevronDown } from "lucide-react-native";
import { styled } from "nativewind";
import React, { useState } from "react";
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChevronIcon = styled(ChevronDown);

interface FacilityStateDropdownProps {
  states: string[];
  selectedState: string;
  onSelect: (state: string) => void;
}

export const FacilityStateDropdown = ({
  states,
  selectedState,
  onSelect,
}: FacilityStateDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = new Animated.Value(0);

  const toggleDropdown = () => {
    Animated.timing(rotation, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleSelect = (state: string) => {
    onSelect(state);
    setIsOpen(false);
  };

  return (
    <View className="px-4 py-2 mt-3" >
      {/* Dropdown Button */}
      <TouchableOpacity
        className="flex-row justify-between items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text className="text-gray-800 text-base">{selectedState}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <ChevronIcon className="text-gray-600" size={20} />
        </Animated.View>
      </TouchableOpacity>

      {/* Overlay Dropdown List */}
      {isOpen && (
        <View style={styles.overlay}>
          <FlatList
            data={states}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-4 py-3"
                onPress={() => handleSelect(item)}
              >
                <Text
                  className={`text-gray-800 ${
                    item === selectedState ? "font-bold" : ""
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 50, // button height
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 10,
  },
});

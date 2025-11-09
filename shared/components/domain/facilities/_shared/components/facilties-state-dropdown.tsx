import { ChevronDown, ChevronUp } from "lucide-react-native";
import { styled } from "nativewind";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { cn } from "tailwind-variants/lite";

const ChevronDownIcon = styled(ChevronDown);
const ChevronUpIcon = styled(ChevronUp);

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

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleSelect = (state: string) => {
    onSelect(state);
    setIsOpen(false);
  };

  return (
    <View className="mt-1 py-2">
      {/* Dropdown Button */}
      <TouchableOpacity
        className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text className="text-base text-gray-800">{selectedState}</Text>

        {isOpen ? (
          <ChevronUpIcon className="text-gray-600" size={20} />
        ) : (
          <ChevronDownIcon className="text-gray-600" size={20} />
        )}
      </TouchableOpacity>

      {/* Overlay Dropdown List */}
      {isOpen && (
        <View className="absolute top-full right-0 left-0 z-10 bg-white shadow-lg">
          <FlatList
            data={states}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-4 py-3"
                onPress={() => handleSelect(item)}
              >
                <Text
                  className={cn("text-gray-800", {
                    "font-bold": item === selectedState,
                  })}
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

import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";


interface DateDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

export const DateDropdown = ({ options, onSelect }: DateDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(options[0] || "");
  const [isCustomPickerVisible, setCustomPickerVisible] = useState(false);

  const handleCustomConfirm = (date: Date) => {
    const formatted = date.toLocaleDateString();
    setSelectedDate(formatted);
    setCustomPickerVisible(false);
    setDropdownOpen(false);
    onSelect(formatted);
  };

  return (
    <View className="relative mb-4">
      <TouchableOpacity
        onPress={() => setDropdownOpen(!dropdownOpen)}
        className="flex-row items-center border border-gray-300 rounded-full px-4 py-3 bg-white"
      >
        <Calendar size={18} color="#6B7280" />
        <Text className="ml-2 text-gray-700">{selectedDate}</Text>
      </TouchableOpacity>

      {dropdownOpen && (
        <View className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow z-20 mt-1">
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                if (option === "Custom Range…") {
                  setCustomPickerVisible(true);
                } else {
                  setSelectedDate(option);
                  setDropdownOpen(false);
                  onSelect(option);
                }
              }}
              className="px-4 py-3 border-b border-gray-200 last:border-b-0"
            >
              <Text className="text-gray-700">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <DateTimePickerModal
        isVisible={isCustomPickerVisible}
        mode="date"
        onConfirm={handleCustomConfirm}
        onCancel={() => setCustomPickerVisible(false)}
      />
    </View>
  );
};

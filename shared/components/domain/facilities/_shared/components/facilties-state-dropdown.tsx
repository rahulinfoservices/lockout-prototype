import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Check, ChevronDown } from "lucide-react-native";
import { styled } from "nativewind";
import React, { useCallback, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChevronDownIcon = styled(ChevronDown);
const CheckIcon = styled(Check);

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
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleOnSelect = useCallback(
    (state: string) => {
      onSelect(state);
      handleDismissModalPress();
    },
    [handleDismissModalPress, onSelect],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        {...props}
      />
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <Pressable onPress={() => handleOnSelect(item)}>
        <View className="flex-row items-center justify-between px-4 py-3">
          <Text className="text-lg text-gray-800">{item}</Text>

          {item === selectedState && (
            <CheckIcon className="text-green-500" size={20} />
          )}
        </View>
      </Pressable>
    ),
    [handleOnSelect, selectedState],
  );

  const renderHeader = useCallback(
    () => (
      <View className="mb-4 border-b border-gray-300 px-4 pb-4">
        <Text className="text-2xl font-bold text-gray-800">Select State</Text>
      </View>
    ),
    [],
  );

  return (
    <View>
      {/* Dropdown Button */}
      <Pressable
        className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
        onPress={handlePresentModalPress}
      >
        <Text className="text-base text-gray-800">{selectedState}</Text>

        <ChevronDownIcon className="text-gray-600" size={20} />
      </Pressable>

      {/* Modal with Options List */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["50%"]}
        name="FacilityStateDropdown"
        animateOnMount
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <BottomSheetFlatList
            data={states}
            keyExtractor={(item: string) => item}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={{
              paddingBottom: bottom + 50,
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

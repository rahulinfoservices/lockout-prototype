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

export interface DropdownProps<T> {
  data: T[];
  selectedItem: T | null;
  onSelect: (item: T) => void;
  displayKey: keyof T;
  title: string;
}

export function Dropdown<T extends { [key: string]: any }>({
  data,
  selectedItem,
  onSelect,
  displayKey,
  title,
}: DropdownProps<T>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleOnSelect = useCallback(
    (item: T) => {
      onSelect(item);
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
    ({ item }: { item: T }) => (
      <Pressable onPress={() => handleOnSelect(item)}>
        <View className="flex-row items-center justify-between px-4 py-3">
          <Text className="text-lg text-gray-800">{item[displayKey]}</Text>
          {item === selectedItem && (
            <CheckIcon className="text-green-500" size={20} />
          )}
        </View>
      </Pressable>
    ),
    [handleOnSelect, selectedItem, displayKey],
  );

  const renderHeader = useCallback(
    () => (
      <View className="mb-4 border-b border-gray-300 px-4 pb-4">
        <Text className="text-2xl font-bold text-gray-800">{title}</Text>
      </View>
    ),
    [title],
  );

  return (
    <View>
      {/* Dropdown Button */}
      <Pressable
        className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
        onPress={handlePresentModalPress}
      >
        <Text
          className="flex-shrink text-base text-gray-800"
          numberOfLines={1} // truncate if too long
          ellipsizeMode="tail" // show "..." if text overflows
        >
          {selectedItem?.[displayKey] ?? "Select"}
        </Text>

        <ChevronDownIcon className="ml-2 text-gray-600" size={20} />
      </Pressable>

      {/* Modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["50%"]}
        name="GlobalDropdownModal"
        animateOnMount
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <BottomSheetFlatList
            data={data}
            keyExtractor={(item: T, index: number) =>
              `${item[displayKey]}-${index}`
            }
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={{ paddingBottom: bottom + 50 }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

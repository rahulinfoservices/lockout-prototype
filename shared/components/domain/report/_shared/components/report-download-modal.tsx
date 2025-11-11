import { Shield, X } from "lucide-react-native";
import React from "react";
import {
    FlatList,
    Modal,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { DeviceCard, DeviceItem } from "@/shared/components/domain/report/_shared/components/report-device-card";

interface DownloadModalProps {
    visible: boolean;
    onClose: () => void;
    devices: DeviceItem[];
    generatedDate: string;
    title: string;
}

export const DownloadModal = ({
    visible,
    onClose,
    devices,
    generatedDate,
    title,
}: DownloadModalProps) => {
    const statusBarHeight =
        Platform.OS === "android" ? StatusBar.currentHeight || 24 : 44;

    return (
        <Modal visible={visible} animationType="slide" transparent>
            {/* Background dim */}
            <View className="absolute inset-0 bg-black/30" />

            {/* Modal Content */}
            <View
                style={{
                    flex: 1,
                    paddingTop: statusBarHeight + 10,
                    paddingBottom: 16,
                    paddingHorizontal: 16,
                }}
            >
                <View className="flex-1 bg-white rounded-2xl overflow-hidden">
                    {/* Top Header */}
                    <View className="bg-teal-500/90 px-4 py-2 rounded-t-2xl">
                        {/* Top Right: Close + Download */}
                        <View className="flex-row justify-end space-x-4 mb-1">

                            <TouchableOpacity onPress={onClose}>
                                <X size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        {/* Text + Shield on the same row */}
                        <View className="flex-row items-center justify-between">
                            {/* Left: Text */}
                            <View>
                                <Text className="text-white font-extrabold text-4xl">LockOut USA</Text>
                                <Text className="text-white font-semibold text-sm mt-1">
                                    Security System
                                </Text>
                            </View>

                            {/* Right: Shield */}
                            <Shield size={40} color="white" />
                        </View>
                        {/* White 1px Separator */}
                        <View className="border-t border-white mt-4" />
                        <View className="flex-row items-center justify-between mt-4 mb-4">
                            {/* Left: Text */}
                            <View>
                                <Text className="text-white font-extrabold text-3xl">Critical Devices Report </Text>
                                <Text className="text-white font-semibold text-sm mt-1">
                                    Generated on {generatedDate}
                                </Text>
                            </View>


                        </View>


                    </View>



                    <View className="flex-1">
                        {/* Divider */}
                        <View className="h-px bg-gray-200" />

                        {/* Content */}
                        <View className="pt-4 px-4 flex-1">
                            <Text className="text-black text-2xl mb-4 font-bold">
                                Device Details ({devices.length})
                            </Text>

                            {/* Device Cards */}
                            <FlatList
                                data={devices}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <DeviceCard device={item} />}
                                contentContainerStyle={{ paddingBottom: 16, gap: 16 }} // spacing between items
                                showsVerticalScrollIndicator={false}
                                style={{ marginHorizontal: -4 }} // optional: slight negative margin for alignment
                            />

                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

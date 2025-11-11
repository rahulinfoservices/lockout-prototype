import { Download } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type ReportItem = {
  id: string;
  title: string;
  description?: string;
  type: "critical" | "facility";
};

interface ReportCardProps {
  report: ReportItem;
  onDownload: (report: ReportItem) => void;
}

export const ReportsCard = ({ report, onDownload }: ReportCardProps) => {
  return (
    <View className="flex-row items-center bg-white rounded-lg shadow overflow-hidden">
      <View className="flex-1 px-4 py-4">
        <Text className="text-lg font-semibold text-gray-800">{report.title}</Text>
        {report.description && (
          <Text className="text-gray-500 mt-1">{report.description}</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => onDownload(report)} className="px-4">
        <Download size={20} color="#2563EB" />
      </TouchableOpacity>
    </View>
  );
};

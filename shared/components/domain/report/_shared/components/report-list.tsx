import React, { useState } from "react";
import { Text, View } from "react-native";

import { ReportItem, ReportsCard } from "@/shared/components/domain/report/_shared/components/report-card";
import { DateDropdown } from "@/shared/components/domain/report/_shared/components/report-dropdown";

interface ReportsListProps {
    title: string;
    reports: ReportItem[];
    showDateFilter?: boolean;
    dateOptions?: string[];
    onDownload: (id: string) => void;
}

export const ReportsList = ({
    title,
    reports,
    showDateFilter = false,
    dateOptions = [],
    onDownload,
}: ReportsListProps) => {
    const [selectedDate, setSelectedDate] = useState(dateOptions[0] || "");

    return (
        <View className="mb-6">
            {/* Section Header */}
            <Text className="text-2xl font-bold mb-3 text-gray-800">{title}</Text>

            {/* Date Dropdown */}
            {showDateFilter && (
                <DateDropdown options={dateOptions} onSelect={(value) => setSelectedDate(value)} />
            )}

            {/* Report Cards */}
            <View>
                {reports.map((report, index) => (
                    <View
                        key={report.id}
                        className={index !== reports.length - 1 ? "mb-3" : ""}
                    >
                        <ReportsCard report={report} onDownload={onDownload} />
                    </View>
                ))}
            </View>
        </View>
    );
};

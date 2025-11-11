import React, { useState } from "react";
import { ScrollView } from "react-native";

import { ReportItem } from "./_shared/components/report-card";
import { DeviceItem } from "./_shared/components/report-device-card";
import { DownloadModal } from "./_shared/components/report-download-modal";
import { ReportsList } from "./_shared/components/report-list";

const criticalReports: ReportItem[] = [
  {
    id: "1",
    title: "Low-Battery Report",
    description: "Reports devices with battery below 20%",
    type: "critical",
  },
  {
    id: "2",
    title: "High Maintenance Device",
    description: "Shows items with frequent pull/replacement",
    type: "critical",
  },
];

const facilityReports: ReportItem[] = [
  {
    id: "3",
    title: "Last 5 Lockdowns",
    description: "Most recent 5 facility lockdown events",
    type: "facility",
  },
  {
    id: "4",
    title: "12-Month No Lockdowns",
    description: "Facilities with no lockdowns in last year",
    type: "facility",
  },
];
// Date dropdown options
const dateOptions = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 14 Days",
  "Last 30 Days",
  "Last 90 Days",
  "This Month",
  "Last Month",
  "Year to Date",
  "Custom Range…",
];

const deviceList: DeviceItem[] = [
  {
    id: "DEV-001",
    name: "Thermostat A1",
    type: "Temperature Sensor",
    facility: "Building 1",
    location: "Floor 2",
    address: "123 Main St",
    time: "2025-11-11 10:30 AM",
    status: "Low Battery",
  },
  {
    id: "DEV-002",
    name: "Door Lock B2",
    type: "Security Lock",
    facility: "Building 2",
    location: "Floor 1",
    address: "456 Elm St",
    time: "2025-11-10 08:45 AM",
    status: "Low Battery",
  },
  {
    id: "DEV-003",
    name: "Camera C3",
    type: "Surveillance Camera",
    facility: "Building 3",
    location: "Entrance",
    address: "789 Oak St",
    time: "2025-11-09 05:15 PM",
    status: "Low Battery",
  },
];

const facilityList: DeviceItem[] = [
  {
    id: "FAC-001",
    name: "Main Gate Lock",
    type: "Security Lock",
    facility: "School 1",
    location: "Main Entrance",
    address: "789 Oak St",
    time: "2025-11-09 09:15 AM",
    status: "Online",
  },
  {
    id: "FAC-002",
    name: "Camera C3",
    type: "Surveillance Camera",
    facility: "School 2",
    location: "Lobby",
    address: "321 Pine St",
    time: "2025-11-08 02:30 PM",
    status: "Online",
  },
];

export const Reports = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"critical" | "facility">(
    "critical",
  );

  const handleDownload = (
    report: ReportItem,
    type: "critical" | "facility",
  ) => {
    setModalType(type);
    setModalVisible(true);
  };

  return (
    <ScrollView className="bg-gray-50 px-4 pt-6">
      {/* Critical Reports Section */}
      <ReportsList
        title="Device Health Reports"
        reports={criticalReports}
        showDateFilter={true}
        dateOptions={dateOptions}
        onDownload={report => handleDownload(report, "critical")}
      />

      {/* Facility Reports Section */}
      <ReportsList
        title="Facility Reports"
        reports={facilityReports}
        showDateFilter={false}
        onDownload={report => handleDownload(report, "critical")}
      />

      {/* Download Modal */}
      <DownloadModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        devices={modalType === "critical" ? deviceList : facilityList}
        generatedDate={new Date().toLocaleDateString()}
        title="Download Report"
      />
    </ScrollView>
  );
};

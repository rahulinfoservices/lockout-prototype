import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { Dropdown } from "@/shared/components/domain/report/_shared/glob-dropdown";
import { ReportDeviceList } from "@/shared/components/domain/report/_shared/report-device-list";
import { ReportFacilityList } from "@/shared/components/domain/report/_shared/report-facility-list";
import { ReportsList } from "@/shared/components/domain/report/_shared/report-list";
import { ReportModal } from "@/shared/components/domain/report/_shared/report-modal/index";
import {
  criticalReports,
  dateOptions,
  deviceList,
  FACILITIES,
  Facility,
  facilityList,
  facilityReports,
  ReportItem,
  State,
  STATES
} from "@/shared/types/report";




export default function  Reports () {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"critical" | "facility">(
    "critical",
  );

  
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(
  STATES.find((s) => s.state_name === "MI") ?? null
);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
  FACILITIES.find((s) => s.facility_name === "St. Michael Elementary School") ?? null
);

  // // Default selections
  // useEffect(() => {
  //   if (!selectedState) setSelectedState(STATES[0]);
  //   if (!selectedFacility) setSelectedFacility(FACILITIES[0]);
  // }, []);

  // filteredFacilities based on selected state
  const filteredFacilities = useMemo(() => {
    if (!selectedState || selectedState.state_id === "ALL") return FACILITIES;
    return FACILITIES.filter(f => f.state_id === selectedState.state_id);
  }, [selectedState]);

  const statesWithAll: State[] = useMemo(() => {
    return [{ state_id: "ALL", state_name: "All" }, ...STATES];
  }, []);

  const facilitiesWithAll = useMemo(() => {
    return [
      { facility_id: "ALL", facility_name: "All", state_id: "ALL" },
      ...filteredFacilities,
    ];
  }, [filteredFacilities]);

  const handleDownload = (
    report: ReportItem,
    type: "critical" | "facility",
  ) => {
    setModalType(type);
    setModalVisible(true);
    setSelectedReport(report);
  };

  const filteredDevices = selectedReport?.title === "High Pull+Replace Frequency"
                  ? deviceList.filter(device => device.type === "Smart_Boots")
                  : deviceList
  let filteredReportFacility =
  selectedReport?.title === "Last 5 Lockdowns"
    ? facilityList.filter((facility) => facility.status === "Lockdown")
    : selectedReport?.title === "12-Month No Lockdowns"
      ? facilityList.filter((facility) => facility.status === "All Clear")
      : facilityList;

  if (selectedFacility && selectedFacility.facility_name !== "All") {
    filteredReportFacility = filteredReportFacility.filter(
    (facility) => facility.name  === selectedFacility.facility_name
  );
}


  return (
    <ScrollView className="bg-gray-50 px-4 pt-6">
      <View className="my-4 flex-row">
        <View className="mr-2 flex-1">
         
          {/* margin-right creates space */}
          <Dropdown<State>
            data={statesWithAll}
            selectedItem={selectedState}
            title="Select State"
            displayKey="state_name"
            onSelect={state => {
              if (state.state_id === "ALL") {
                setSelectedState(state);
                setSelectedFacility(null);
              } else {
                setSelectedState(state);
                setSelectedFacility(null);
              }
            }}
          />
        </View>

        <View className="ml-2 flex-1">
        
          {/* margin-left creates space */}
          <Dropdown<Facility>
            data={facilitiesWithAll}
            selectedItem={selectedFacility}
            title="Select Facility"
            displayKey="facility_name"
            onSelect={facility => {
              setSelectedFacility(facility);
            }}
          />
        </View>
      </View>

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
        title="Facility Lockdown Reports"
        reports={facilityReports}
        showDateFilter={false}
        onDownload={report => handleDownload(report, "facility")}
      />

      {/* Report Modal */}

      <ReportModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={
          selectedReport?.title ? `${selectedReport.title} Report` : "Report"
        }
        subtitle={`Generated on ${new Date().toLocaleDateString()}`}
        scrollable={false}
        systemName={
          selectedFacility
            ? selectedFacility.facility_id === "ALL"
              ? "Multiple Facilities"
              : selectedFacility.facility_name
            : "Multiple Facilities"
        }
        systemSubtitle="LockOut USA"
      >
        {modalType === "critical" ? (
          

          <View className="flex-1 px-4">
            {/* Dynamic title above the device list */}
            <Text className="mb-4 text-2xl font-bold text-black">
              Device Details ({filteredDevices.length})
            </Text>
            <ReportDeviceList
              devices={filteredDevices}
              
            />
          </View>
        ) : (
          <View className="flex-1 px-4">
            {/* Dynamic title above the facility list */}
            <Text className="mb-4 text-2xl font-bold text-black">
              Facility Details ({filteredReportFacility.length})
            </Text>
            <ReportFacilityList facilities={filteredReportFacility} />
          </View>
        )}
      </ReportModal>
    </ScrollView>
  );
};

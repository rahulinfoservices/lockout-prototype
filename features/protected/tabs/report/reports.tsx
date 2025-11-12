import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { Dropdown } from "./_shared/components/Dropdown";
import { ReportModal } from "./_shared/components/modal/index";
import { ReportItem } from "./_shared/components/report-card";
import { ReportDeviceItem } from "./_shared/components/report-device-card";
import { ReportDeviceList } from "./_shared/components/report-device-list";
import {
  FACILITIES,
  Facility,
  State,
  STATES,
} from "./_shared/components/report-dropdown-data";
import { ReportFacilityItem } from "./_shared/components/report-facility-card";
import { ReportFacilityList } from "./_shared/components/report-facility-list";
import { ReportsList } from "./_shared/components/report-list";

const criticalReports: ReportItem[] = [
  {
    id: "1",
    title: "Low-Battery",
    description: "Reports devices with battery below 20%",
    type: "critical",
  },
  {
    id: "2",
    title: "High Pull+Replace Frequency",
    description: "Shows items with frequent pull/replacement",
    type: "critical",
  },
];

const facilityReports: ReportItem[] = [
  {
    id: "3",
    title: "Last 5 Lockdowns",
    description: "Most recent 5  lockdown events",
    type: "facility",
  },
  {
    id: "4",
    title: "12-Month No Lockdowns",
    description: "No lockdowns in last 12 months",
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

const deviceList: ReportDeviceItem[] = [
  {
    id: "SB_001_100_Z1G",

    type: "Smart_Boots",
    facility: "St. Michael Elementary School",
    location: "Room 100",
    address: "8944 50th Ave, Remus, MI 49340",
    time: "2025-11-11 10:30 AM",
    status: "Low Battery",
  },
  {
    id: "SB_002_COR_Z1G",

    type: "Smart_Boots",
    facility: "St. Michael Elementary School",
    location: "CORRIDOR",
    address: "8944 50th Ave, Remus, MI 49340",
    time: "2025-11-10 08:45 AM",
    status: "Low Battery",
  },
  {
    id: "SL_004_CAF_Z3B",

    type: "Smart_Lights",
    facility: "St. Michael Elementary School",
    location: "CAFÉ",
    address: "8944 50th Ave, Remus, MI 49340",
    time: "2025-11-09 05:15 PM",
    status: "Low Battery",
  },
];

const facilityList: ReportFacilityItem[] = [
  {
    id: "ST MICHAEL-ES",
    name: "St. Michael Elementary School",
    location: "MI, 49340",
    address: "8944 50th Ave, Remus, MI 49340",
    phone: "(989) 967-3681",
    status: "Lockdown",
    time: "Nov 2, 2025 10:18 AM"
  },
  {
    id: "PARMA-ES",
    name: "Parma Elementary School",
    location: "MI, 49269",
    address: "385 Elizabeth St, Parma, MI 49269",
    phone: "(517) 841-8100",
    status: "Lockdown",
    time: "Oct 20, 2025 3:42 PM"
  },
  {
    id: "WESTERN-MAIN-CAMPUS",
    name: "Western Main Campus",
    location: "MI, 49269",
    address: "1400 S Dearing Rd, Parma, MI 49269",
    phone: "(517) 841-8100",
    status: "All Clear",
    time: "Sep 15, 2025 9:27 AM"
  },
  {
    id: "BEAN-ES",
    name: "Bean Elementary School",
    location: "MI, 49283",
    address: "3201 Noble Rd, Spring Arbor, MI 49283",
    phone: "(517) 841-8400",
    status: "All Clear",
    time: "Aug 11, 2025 1:05 PM"
  },
  {
    id: "WARNER-ES",
    name: "Warner Elementary School",
    location: "MI, 49283",
    address: "118 Star Rd, Spring Arbor, MI 49283",
    phone: "(517) 841-8570",
    status: "All Clear",
    time: "Jul 6, 2025 4:45 PM"
  },
  {
    id: "SPRINGPORT-HS-ES",
    name: "Springport HS/ES",
    location: "MI, 49284",
    address: "300 W Main St, Springport, MI 49284",
    phone: "(517) 857-3475",
    status: "All Clear",
    time: "Jun 10, 2025 11:32 AM"
  },
  {
    id: "SPRINGPORT-MS",
    name: "Springport Middle School",
    location: "MI, 49284",
    address: "300 W Main St, Springport, MI 49284",
    phone: "(517) 857-3475",
    status: "All Clear",
    time: "May 4, 2025 2:58 PM"
  },
  {
    id: "HESPERIA",
    name: "Hesperia School",
    location: "MI, 49421",
    address: "96 S Division St, Hesperia, MI 49421",
    phone: "(231) 854-6185",
    status: "All Clear",
    time: "Mar 29, 2025 8:41 AM"
  },
  {
    id: "HOLTON-ES",
    name: "Holton Elementary School",
    location: "MI, 49425",
    address: "6245 Syers Rd, Holton, MI 49425",
    phone: "(231) 821-1825",
    status: "Lockdown",
    time: "Feb 14, 2025 12:22 PM"
  },
  {
    id: "HOLTON-HS",
    name: "Holton High School",
    location: "MI, 49425",
    address: "6477 Syers Rd, Holton, MI 49425",
    phone: "(231) 821-1725",
    status: "Lockdown",
    time: "Dec 30, 2024 5:10 PM"
  },
  {
    id: "MONTAGUE-HS",
    name: "Montague High School",
    location: "MI, 49437",
    address: "4900 Stanton Blvd, Montague, MI 49437",
    phone: "(231) 894-2661",
    status: "Lockdown",
    time: "Nov 22, 2024 9:55 AM"
  }
];


export const Reports = () => {
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

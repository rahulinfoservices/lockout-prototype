export interface State {
  state_id: string;
  state_name: string;
}

export interface Facility {
  facility_id: string;
  facility_name: string;
  state_id: string;
}

// Static States
export const STATES: State[] = [
  { state_id: "1", state_name: "MI" }
];

// Static Facilities
export const FACILITIES: Facility[] = [
  { facility_id: "F1", facility_name: "St. Michael Elementary School", state_id: "1" },
  {
    facility_id: "F2",
    facility_name: "Montague High School",
    state_id: "1",
  },
  { facility_id: "F3", facility_name: "Holton High School", state_id: "1" },
  { facility_id: "F4", facility_name: "Springport Middle School", state_id: "1" },
 
];

export type ReportItem = {
  id: string;
  title: string;
  description?: string;
  type: "critical" | "facility";
};

export type ReportDeviceItem = {
  id: string;
  type: string;
  facility: string;
  location: string;
  address: string;
  time: string;
  status: "Online" | "Offline" | "Low Battery" | "Warning";
};


export type ReportFacilityItem = {
  id: string;
  name: string;
  phone: string;
  location: string;
  address: string;
  time: string;
  status: "All Clear" | "Lockdown" | "Maintenance";
};



export const criticalReports: ReportItem[] = [
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

export const facilityReports: ReportItem[] = [
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
export const dateOptions = [
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

export const deviceList: ReportDeviceItem[] = [
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

export const facilityList: ReportFacilityItem[] = [
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